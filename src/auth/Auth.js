import React, { Component } from "react";
import { connect } from "react-redux";
import * as userActions from "./store/actions";
import { bindActionCreators } from "redux";
import jwtService from "services/jwtService";

class Auth extends Component {
  state = {
    waitAuthCheck: true,
  };

  componentDidMount() {
    return Promise.all([
      // Comment the lines which you do not use
      this.jwtCheck(),
    ]).then(() => {
      this.setState({ waitAuthCheck: false });
    });
  }

  jwtCheck = () =>
    new Promise((resolve) => {
      jwtService.on("onAutoLogin", () => {
        // console.log("JWt service -------- ");
        jwtService
          .signInWithToken()
          .then((user) => {
            this.props.setUserData(user);
            this.props.SetLogin();

            resolve();

            // console.log("Auto Logged in with JWT");
          })
          .catch((error) => {
            // console.log("Token Expired");
            this.props.logout();
            resolve();
          });
      });

      jwtService.on("onAutoLogout", (message) => {
        if (message) {
          console.log("Auto Logout");
        }

        this.props.logout();

        resolve();
      });

      jwtService.on("onNoAccessToken", () => {
        resolve();
      });

      jwtService.init();

      return Promise.resolve();
    });

  render() {
    return (
      <>
        {this.state.waitAuthCheck ? (
          ""
        ) : (
          <React.Fragment children={this.props.children} />
        )}
      </>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      logout: userActions.logoutUser,
      setUserData: userActions.setUserData,
      SetLogin: userActions.SetLogin,
    },
    dispatch
  );
}

export default connect(null, mapDispatchToProps)(Auth);
