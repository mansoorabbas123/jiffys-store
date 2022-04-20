import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
} from "@chakra-ui/react";
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
      {!cartItems.length > 0 ? (
        <p className="text-slate-600 text-center text-3xl m-5">Cart is empty</p>
      ) : (
        <div className="flex flex-col items-center lg:flex-row py-10 lg:items-start bg-white px-16 ">
          {/* side one  */}
          <div className="p-2 ">
            <div className="hidden lg:block border">
              <TableContainer className="hidden lg:block">
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th colSpan={2} textAlign={"center"}>
                        Product
                      </Th>
                      <Th>Price</Th>
                      <Th textAlign={"center"}>Quantity</Th>
                      <Th textAlign={"center"}>Total</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {cartItems.length == 0 ? (
                      <p className="text-slate-600 m-5">Cart is empty</p>
                    ) : (
                      cartItems.map((product) => (
                        <Tr key={product.id}>
                          <Td width={"40"}>
                            <Link to={`/product/${product.id}`}>
                              <img
                                src={product.productImages[0].url}
                                className="w-full"
                                alt=""
                              />
                            </Link>
                          </Td>
                          <Td>
                            {" "}
                            <Link to={`/product/${product.id}`}>
                              {product.title.slice(0, 20)}...{" "}
                            </Link>
                          </Td>

                          <Td className="pl-10">{product.price}</Td>
                          <Td className="pl-24 text-center">
                            <CartQty product={product} />
                          </Td>
                          <Td className="font-bold pl-16">
                            $ {product.price * product.qty}
                          </Td>
                          <Td className="pl-10">
                            <button
                              onClick={() =>
                                dispatch(
                                  Actions.deleteFromCartAction(
                                    Number(product.id)
                                  )
                                )
                              }
                              className="border-2 w-8 px-2 cursor-pointer rounded text-slate-400 hover:text-red-600 hover:border-red-600 pt-1"
                            >
                              X
                            </button>
                          </Td>
                        </Tr>
                      ))
                    )}
                  </Tbody>
                </Table>
              </TableContainer>
            </div>
            {/* cart hidden on larg sceen  */}
            <div className="block lg:hidden text-center">
              {cartItems.length == 0 ? (
                <p className="text-slate-600 m-5">Cart is empty</p>
              ) : (
                cartItems.map((product) => (
                  <div className="border w-full">
                    <img
                      src={product.productImages[0].url}
                      className="w-[100px] mx-auto my-5"
                      alt=""
                    />
                    <p className="px-10">{product.title.slice(0, 25)}...</p>
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
              <button
                className="btn my-5 px-5 py-2 pt-3 text-sm text-white rounded-md btn ml-auto"
                // className=""
                onClick={() => dispatch(Actions.clearCartAction())}
              >
                CLEAR CART
              </button>
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

            <button
              className="btn text-sm my-5 px-5 py-2 text-white rounded-md pt-3 btn ml-auto"
              style={{ width: "80%", marginLeft: "10%" }}
              onClick={() => navigate("/checkout")}
            >
              CHECKOUT
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartScreen;
