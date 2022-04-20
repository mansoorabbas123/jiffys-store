import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Favicon from "react-favicon";
import favicon from "./assets/favicon.png";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { ChakraProvider } from "@chakra-ui/react";
import theme from "./chakra_theme";
import { CookiesProvider } from "react-cookie";

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Favicon url={favicon} />
      <CookiesProvider>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </CookiesProvider>
    </div>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
