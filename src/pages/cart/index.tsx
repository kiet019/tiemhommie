import {
  Paper,
  Typography,
  Card,
  Button,
  Toolbar,
  Box,
  Dialog,
  CardMedia,
} from "@mui/material";
import { useEffect, useState } from "react";
import { setOpen } from "@/feature/Alert";
import { useAppDispatch } from "@/feature/Hooks";
import { useRouter } from "next/router";
import { formatNumber } from "../../../package/function";
import Layout1 from "@/component/theme/layout/Layout1";
import ConfirmPopup from "@/component/theme/confirm/ConfirmPopup";
import CartTable from "@/component/cart/CartTable";
import { UseGetCartUserUidHook } from "../../../package/function/cart/use-get-user-hook";
import { UserContext } from "@/component/auth/AuthContext";
import { auth } from "@/config/firebase";
import UseUpdateQuantity from "../../../package/function/cart/use-update-quantity";
import { UseDeleteCartItem } from "../../../package/function/cart/use-delete-cartItem";

export default function Cart() {
  const [isLoadingChanging, setIsLoadingChanging] = useState<boolean>(false);
  const { data, isLoading, error, mutate } = UseGetCartUserUidHook(
    { userUid: auth.currentUser?.uid },
    isLoadingChanging
  );
  const [orderList, setOrderList] = useState<String[]>([]);
  const dispatch = useAppDispatch();
  const [total, setTotal] = useState<any>(0);
  const router = useRouter();
  const handleDelete = async (cartItemId: number) => {
    try {
      setIsLoadingChanging(true);
      const response = await UseDeleteCartItem({
        cartItemId,
      });
      dispatch(
        setOpen({
          open: true,
          message: response.message,
          severity: response.status,
        })
      );
    } catch (error: any) {
      dispatch(
        setOpen({
          open: true,
          message: error.message,
          severity: "error",
        })
      );
    } finally {
      await mutate();
      setIsLoadingChanging(false);
    }
  };
  const updateCartItemsQuantity = async (
    cartItemId: number,
    updateQuantity: number,
    productQuantity: number
  ) => {
    if (updateQuantity < 1 || updateQuantity > productQuantity) {
      dispatch(
        setOpen({
          open: true,
          message: "Invalid number",
          severity: "error",
        })
      );
    } else {
      try {
        setIsLoadingChanging(true);
        const response = await UseUpdateQuantity({
          cartItemId,
          quantity: updateQuantity,
          auth: auth.currentUser?.uid,
        });
        dispatch(
          setOpen({
            open: true,
            message: "Changing success",
            severity: "success",
          })
        );
      } catch (error: any) {
        dispatch(
          setOpen({
            open: true,
            message: error.message,
            severity: "error",
          })
        );
      } finally {
        await mutate();
        setIsLoadingChanging(false);
      }
    }
  };
  
  useEffect(() => {
    if (data?.data !== null && data !== undefined) {
      const totalCartItem = data.data.productAndCartItemList.filter(
        (cartItem: any) => orderList.includes(cartItem.cartItemId)
      );
      let total = 0;
      for (let index = 0; index < totalCartItem.length; index++) {
        const element = totalCartItem[index];
        total = total + element.quantity * element.product.price;
      }
      setTotal(total);
    }
  }, [orderList, data]);

  return (
    <Layout1>
      <Paper>
        {!isLoading ? (
          <CartTable
            cart={data?.data}
            handleDelete={handleDelete}
            setOrderList={setOrderList}
            orderList={orderList}
            updateCartItemsQuantity={updateCartItemsQuantity}
          />
        ) : (
          <CardMedia component="img" src="/assets/images/no-cart.jpg" />
        )}
      </Paper>
      <Card
        sx={{
          marginTop: "2rem",
          height: "fit-content",
          padding: "1rem 0.5rem 1rem",
        }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="body1">
            Tổng tiền thanh toán:
            <span style={{ marginLeft: "1rem", marginRight: "5rem" }}>
              {formatNumber(total)} VND
            </span>
          </Typography>
          <Button
            sx={{
              height: "4rem",
            }}
            color="success"
            variant="contained"
            disabled={orderList.length == 0}
            type="submit"
            onClick={() => {
              router.push(`order?orderIds=${orderList}&total=${total}`);
            }}
          >
            Thanh toán
          </Button>
        </Toolbar>
      </Card>
      <ConfirmPopup />
      <Dialog open={isLoadingChanging}></Dialog>
    </Layout1>
  );
}
