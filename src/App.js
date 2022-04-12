import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProductScreen from "./screens/ProductScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductDetailScreen from "./screens/ProductDetailScreen";
import LoginScreen from "./screens/LoginScreen";
import CartScreen from "./screens/CartScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import RegisterScreen from "./screens/RegisterScreen";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";
import VerifyScreen from "./screens/VerifyScreen";
import ForgetPassword from "./screens/ForgetPassword";
import UserAccountScreen from "./screens/UserAccountScreen";
import NewPasswordScreen from "./screens/NewPasswordScreen";
import OrderScreen from "./screens/OrderScreen";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentScreen from "./screens/PaymentScreen";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import * as Actions from "./store/actions";

const stripePromise = loadStripe(
  "pk_test_51KWfQMLvYa516UtYVWGagPTi2ScNHL6Yxa7V2PGvI3XdJhfe9e5LgiVTvUHOfi5ZYLdt9wpvYhfIKmlBMBcT7pYh005LoXWOnS"
);

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const dispatch = useDispatch();

  useEffect(() => {
    // if (cookies.user == undefined) {
    //   // api request
    //   setCookie("user", "visitor", { path: "/" });
    // }
    // console.log("app");
    // console.log(cookies.user);
    // const deleteCookie = () => {
    //   removeCookie("user");
    // };
    // window.addEventListener("beforeunload", deleteCookie);
    // return () => {
    //   window.removeEventListener("beforeunload", deleteCookie);
    // };
    dispatch(Actions.visitUser());
  }, []);

  return (
    <Elements stripe={stripePromise}>
      <BrowserRouter>
        <NotificationContainer />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomeScreen />} />
            {/* <Route path="product" element={<ProductScreen />} /> */}
            <Route path="shop" element={<ProductScreen />} />
            {/* <Route path="category/:category" element={<CategoryScreen />} /> */}
            <Route path="product/:id" element={<ProductDetailScreen />} />
            <Route path="login" element={<LoginScreen />} />
            <Route path="register" element={<RegisterScreen />} />
            <Route path="verify" element={<VerifyScreen />} />
            <Route path="forgetPassword" element={<ForgetPassword />} />
            <Route path="newPassword" element={<NewPasswordScreen />} />
            <Route path="account" element={<UserAccountScreen />} />
            <Route path="cart" element={<CartScreen />} />
            <Route path="cart/:id" element={<CartScreen />} />
            <Route path="checkout" element={<CheckoutScreen />} />
            <Route path="order" element={<OrderScreen />} />
            <Route path="payment" element={<PaymentScreen />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Elements>
  );
}

export default App;
