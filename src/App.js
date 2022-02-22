import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProductScreen from "./screens/ProductScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductDetailScreen from "./screens/ProductDetailScreen";
import LoginScreen from "./screens/LoginScreen";
import CartScreen from "./screens/CartScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomeScreen />} />
          {/* <Route path="product" element={<ProductScreen />} /> */}
          <Route path="category/:category" element={<ProductScreen />} />
          {/* <Route path="category/:category" element={<CategoryScreen />} /> */}
          <Route path="product/:id" element={<ProductDetailScreen />} />
          <Route path="login" element={<LoginScreen />} />
          <Route path="cart" element={<CartScreen />} />
          <Route path="cart/:id" element={<CartScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
