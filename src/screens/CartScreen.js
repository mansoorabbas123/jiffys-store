import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@chakra-ui/react";
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
import { IoMdCart } from "react-icons/io";

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
      <div className=" ">
        <h1 className=" ml-10 text-[40px] leading-[1.3] font-[700] mb-[10px] text-[#b02e46] pt-[5.5rem]">
          Cart
        </h1>
        <Breadcrumb sx={{ marginLeft: "3rem" }}>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink>Cart</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
      {/* <div className="bg-white"> */}
      {!cartItems.length > 0 ? (
        <div className="text-[#333333] text-center m-5 bg-white mt-[5.3rem] h-[21rem]">
          <IoMdCart
            style={{ margin: "auto", fontSize: "10rem", paddingTop: "2rem" }}
          />
          <p className="py-6 text-[20px] text-[#333333]">
            {" "}
            No item found in cart
          </p>
          <button
            className="px-7 font-[300] font-sans text-md text-white bg-[#333333] hover:bg-white hover:text-[#333333] hover:underline hover:border hover:border-slate-500 py-2 box"
            onClick={() => navigate("/shop")}
          >
            SHOP NOW
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center lg:flex-row py-10 lg:items-start bg-white px-16 mt-[5.3rem]">
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
