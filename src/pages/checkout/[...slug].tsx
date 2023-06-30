import React, { useContext, useState } from "react";
import { Grid, Paper, Typography, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import {
  GetStaticPaths,
  GetStaticProps,
} from "next";
import Layout1 from "@/component/theme/layout/Layout1";
import { UserContext } from "@/component/auth/AuthContext";
import { UseGetCartUserUid } from "../../../package/function/cart/use-get-user";
import { ProductAndCartItem } from "../../../package/model/product/product-and-cartItem";
import { Payment } from "../../../package/model/payment";
import { UseGetPaymentList } from "../../../package/function/payment/use-get-all";
import { UseGetAddressUserUid } from "../../../package/function/address/use-get-user";
import { UseLogin } from "../../../package/function/auth/use-login";
import { User } from "../../../package/model/user";
import { UseCreateOrder } from "../../../package/function/order/create";
import { useAppDispatch } from "@/feature/Hooks";
import { setOpen } from "@/feature/Alert";
import { useRouter } from "next/router";
import CheckoutAddress from "@/component/checkout/Address";
import CheckoutCartTable from "@/component/checkout/CartTable";
import CheckoutPayment from "@/component/checkout/Payment";
import CheckoutInfor from "@/component/checkout/Infor";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug;
  let orderList: ProductAndCartItem[] | undefined = [];
  let total: number = 0;
  let paymentList: Payment[] | null = []
  let addressList: Address[] | null = []
  let user: User | null = null
  try {
    if (slug !== undefined) {
      const orderIds = slug[0].split(",");
      const response = await UseGetCartUserUid({ userUid: slug[2] });
      orderList = response.data?.productAndCartItemList.filter(
        (cartItem: ProductAndCartItem) =>
          orderIds.includes(cartItem.cartItemId.toString())
      );
      total = Number.parseInt(slug[1]);
      const response2 = await UseGetAddressUserUid({ userUid: slug[2] })
      addressList = response2.data
      const response3 = await UseLogin({ userUid: slug[2] })
      user = response3.data
    }
    const response1 = await UseGetPaymentList()
    paymentList = response1.data
  } catch (error: any) {
    console.log(error)
  }
  return {
    props: {
      orderList,
      total,
      paymentList,
      addressList,
      user
    },
  };
};

interface Props {
  orderList: ProductAndCartItem[] | undefined;
  total: number;
  paymentList: Payment[] | null
  addressList: Address[] | null
  user: User | null
}
const Order = ({ orderList, total, paymentList, addressList, user }: Props) => {
  const [selectAddress, setSelectAddress] = useState<Address | null>(null);
  const [selectPayment, setSelectPayment] = useState<Payment | null>(null);
  const dispatch = useAppDispatch()
  const { handleSubmit } = useForm();
  const { setOpenLoading, openLoading } = useContext(UserContext);
  const router = useRouter()
  const onSubmit = async (data: any) => {
    try {
      setOpenLoading(true)
      const response = await UseCreateOrder({
        cartItemsList: orderList,
        deliveryAddressId: selectAddress?.addressId,
        paymentId: selectPayment?.paymentId,
        totalPayment: total,
        userId: user?.userId
      })
      dispatch(
        setOpen({
          open: true,
          message: response.message,
          severity: response.status,
        })
      );
      router.push("/")
    } catch (error: any) {
      dispatch(
        setOpen({
          open: true,
          message: error.message,
          severity: "error"
        })
      );
    } finally {
      setOpenLoading(false)
    }
  };
  return (
    <Layout1>
      <form onSubmit={handleSubmit(onSubmit)}>

        <Grid container spacing={2}>
          <Grid item xs={8}>
            <CheckoutCartTable orderList={orderList} />
            <CheckoutAddress
              selectAddress={selectAddress}
              setSelectAddress={setSelectAddress}
              addressList={addressList}
              userBackend={user}
            />
          </Grid>
          <Grid item xs={4}>
            <Paper
              sx={{
                padding: "1rem",
              }}
            >
              <CheckoutPayment
                selectPayment={selectPayment}
                setSelectPayment={setSelectPayment}
                paymentList={paymentList}
              />
              <CheckoutInfor total={total} selectAddress={selectAddress} selectPayment={selectPayment}/>
            </Paper>
          </Grid>
        </Grid>
      </form>
    </Layout1>
  );
};

export default Order;
