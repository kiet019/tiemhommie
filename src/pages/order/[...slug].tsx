import React, { useContext, useState } from "react";
import { Grid, Paper, Typography, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import {
  GetServerSidePropsContext,
  GetStaticPaths,
  GetStaticProps,
} from "next";
import { formatNumber } from "../../../package/function";
import Layout1 from "@/component/theme/layout/Layout1";
import { UserContext } from "@/component/auth/AuthContext";
import PreOrderTable from "@/component/address/PreOrderTable";
import PreOrderAddress from "@/component/address/PreOrderAddress";
import OrderPayment from "@/component/address/OrderPayment";
import { UseGetCartUserUid } from "../../../package/function/cart/use-get-user";
import { ProductAndCartItem } from "../../../package/model/product/product-and-cartItem";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug;
  let orderList: ProductAndCartItem[] | null = [];
  let total: number = 0;
  // let paymentList : Payment = []
  if (slug !== undefined) {
    const orderIds = slug[0].split(",");
    const response = await UseGetCartUserUid({ userUid: slug[2] });
    orderList = response.data?.productAndCartItemList.filter(
      (cartItem: ProductAndCartItem) =>
        orderIds.includes(cartItem.cartItemId.toString())
    );
    total = Number.parseInt(slug[1]);
  }
  return {
    props: {
      orderList,
      total
    },
  };
};

interface Props {
  orderList: ProductAndCartItem[];
  total: number;
}
const Order = ({ orderList, total }: Props) => {
  const [selectAddress, setSelectAddress] = useState<any>(null);
  const [selectPayment, setSelectPayment] = useState<any>(null);
  const { register, handleSubmit } = useForm();
  const { setOpenLoading, openLoading } = useContext(UserContext);
  const onSubmit = async (data: any) => {
    // console.log(selectAddress)
    // console.log(selectPayment)
    // console.log(typeof orderIds)
    // console.log(userBackend.userId)
    // createOrder(
    //   userBackend.userId,
    //   orderIds.split(","),
    //   selectAddress.addressId,
    //   selectPayment.paymentId,
    //   +total + 30000
    // );
  };
  return (
    <Layout1>
      <form onSubmit={handleSubmit(onSubmit)}>

        <Grid container spacing={2}>
          <Grid item xs={8}>
            <PreOrderTable orderList={orderList} />
            <PreOrderAddress
              selectAddress={selectAddress}
              setSelectAddress={setSelectAddress}
            />
          </Grid>
          <Grid item xs={4}>
            <Paper
              sx={{
                padding: "1rem",
              }}
            >
              <OrderPayment
                selectPayment={selectPayment}
                setSelectPayment={setSelectPayment}
              />
              <div
                style={{
                  paddingTop: "1rem",
                  marginTop: "2.6rem",
                  borderTop: "1px solid gray",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    marginBottom: "1rem",
                    fontWeight: "700",
                  }}
                >
                  Thông tin đơn hàng
                </Typography>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "600",
                      color: "gray",
                    }}
                  >
                    Tạm tính{" "}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "600",
                      color: "gray",
                    }}
                  >
                    {formatNumber(0)} VND
                  </Typography>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "600",
                      color: "gray",
                    }}
                  >
                    Phí vận chuyển
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "600",
                      color: "gray",
                    }}
                  >
                    {formatNumber(30000)} VND
                  </Typography>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "1rem 0rem 1rem",
                    paddingTop: "1rem",
                    borderTop: "1px solid gray",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "600",
                      color: "gray",
                    }}
                  >
                    Tổng cộng
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "600",
                      color: "gray",
                    }}
                  >
                    {formatNumber(30000 + +total)} VND
                  </Typography>
                </div>
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  disabled={
                    selectAddress !== null && selectPayment !== null
                      ? false
                      : true
                  }
                >
                  <Typography
                    sx={{
                      fontWeight: "600",
                      color: "white",
                    }}
                  >
                    đặt hàng
                  </Typography>
                </Button>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </form>
    </Layout1>
  );
};

export default Order;
