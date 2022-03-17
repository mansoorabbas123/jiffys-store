import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useSearchParams,
  useParams,
  useLocation,
  Link,
  useNavigate,
} from "react-router-dom";
import * as Actions from "../store/actions";
import { TailSpin } from "react-loader-spinner";
import CartQty from "../components/CartQty";

const CartScreen = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  // const qty = searchParams.get("qty");
  // const { id } = useParams();
  // const location = useLocation();
  const dispatch = useDispatch();
  const cartReducer = useSelector((state) => state.cart);
  const { cartItems } = cartReducer;
  // const [qty, setQty] = useState(1);

  // useEffect(() => {
  //   if (id) {
  //     dispatch(Actions.addToCartAction(product, qty));
  //   }
  // }, []);

  return (
    <div>
      <h1 className="ml-10 py-10 text-3xl">Cart</h1>
      {/* <div className="bg-white"> */}
      {cartItems.length == 0 ? (
        <p className="text-slate-600 text-center text-3xl m-5">Cart is empty</p>
      ) : (
        <div className="flex flex-col items-center lg:flex-row py-10 lg:items-start bg-white px-16 ">
          {/* side one  */}
          <div className="p-2 lg:border lg:mx-8">
            <table className="hidden lg:block">
              <thead>
                <tr className="text-slate-600 ">
                  <th className="text-center">Product</th>
                  <th className="pl-10">Price</th>
                  <th className="pl-24">Quantity</th>
                  <th className="pl-16">Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.length == 0 ? (
                  <p className="text-slate-600 m-5">Cart is empty</p>
                ) : (
                  cartItems.map((product) => (
                    <tr key={product.id}>
                      <Link to={`/product/${product.id}`}>
                        <td className="p-8">
                          <img src={product.image} className="w-20" alt="" />
                        </td>
                        <td>{product.title.slice(0, 20)}...</td>
                      </Link>
                      <td className="pl-10">{product.price}</td>
                      <td className="pl-24 text-center">
                        <CartQty product={product} />
                      </td>
                      <td className="font-bold pl-16">
                        $ {product.price * product.qty}
                      </td>
                      <td className="pl-10">
                        <a
                          onClick={() =>
                            dispatch(
                              Actions.deleteFromCartAction(Number(product.id))
                            )
                          }
                          className="border-2 w-8 px-2 cursor-pointer rounded text-slate-400 hover:text-red-600 hover:border-red-600"
                        >
                          X
                        </a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            {/* cart hidden on larg sceen  */}
            <div className="block lg:hidden text-center w-100 ">
              {cartItems.length == 0 ? (
                <p className="text-slate-600 m-5">Cart is empty</p>
              ) : (
                cartItems.map((product) => (
                  <div className="border w-96">
                    <img
                      src={product.image}
                      className="w-20 mx-auto my-5"
                      alt=""
                    />
                    <p className="">{product.title.slice(0, 25)}...</p>
                    <p className="my-1 font-bold">$ {product.price}</p>

                    <CartQty product={product} />

                    <p className="my-8 font-bold">
                      $ {product.price * product.qty}
                    </p>
                    <div></div>
                  </div>
                ))
              )}
            </div>
            <div className="flex justify-end m-5">
              <a
                className="btn my-5"
                className="w-30 btn ml-auto"
                onClick={() => dispatch(Actions.clearCartAction())}
              >
                Clear Cart
              </a>
            </div>
          </div>
          {/* side two  */}
          <div className="border mx-auto bg-slate-50 w-full lg:w-80">
            <h2 className="text-xl p-4">Cart Total</h2>
            <div className="flex justify-between p-4">
              <p className="text-slate-600">TOTAL ITEMS</p>
              <p className="font-bold">
                {cartItems.reduce((acc, item) => acc + item.qty, 0)}
              </p>
            </div>
            <div className="flex justify-between p-4">
              <p className="text-slate-600">TOTAL</p>
              <p className="font-bold">
                $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </p>
            </div>
            <div
              className="bg-slate-400 border mx-auto"
              style={{ width: "80%" }}
            ></div>

            <a
              className="btn my-5"
              style={{ width: "80%", marginLeft: "10%" }}
              onClick={() => navigate("/checkout")}
            >
              CHECKOUT
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartScreen;
