import { Paper, Typography, Card, Button, Toolbar, Box, CardMedia } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { CheckInView } from "@/checkInScreen";
import { useContext, useEffect, useState } from "react";
import { setOpen } from "@/feature/Alert";
import { useAppDispatch } from "@/feature/Hooks";
import { useRouter } from "next/router";
import { formatNumber } from "../../../package/function";
import Layout1 from "@/component/theme/layout/Layout1";
import { CartAndCartItemAndProduct } from "../../../package/model/cart/cart-and-cartItem-and-product";
import ConfirmPopup from "@/component/theme/confirm/ConfirmPopup";
import CartTable from "@/component/cart/CartTable";
import { UseGetCartUserUid } from "../../../package/function/cart/use-get-user";
import { UserContext } from "@/component/auth/AuthContext";



export default function Cart() {
    const { user } = useContext(UserContext)
    const { data, isLoading, error } = UseGetCartUserUid({ userUid: user?.userUid })
    const [orderList, setOrderList] = useState<String[]>([]);
    const dispatch = useAppDispatch();
    const [total, setTotal] = useState<any>(0);
    const [cartItemDelete, setCartItemDelete] = useState<any>(0);
    const router = useRouter();

    const handleDelete = () => {

    }
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


    if (isLoading) {
        return (
            <Layout1>
                <CardMedia
                    component="img"
                    src="/assets/images/no-cart.jpg" />
            </Layout1>
        )
    }
    return (
        <Layout1>
            <Paper>
                <CartTable
                    cart={data?.data}
                    handleDelete={handleDelete}
                    setOrderList={setOrderList}
                    orderList={orderList}
                    setCartItemDelete={setCartItemDelete}
                />
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
            <ConfirmPopup
            />
        </Layout1>
    );
}
