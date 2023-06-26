import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { setup } from "@/config/setup";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Box, IconButton, Tooltip, Zoom } from "@mui/material";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/feature/Hooks";
import { setOpen } from "@/feature/Alert";
import UrlImage from "../theme/image/Image1";
import dynamic from "next/dynamic";
import LoadingIconButton from "../theme/button/LoadingIconButton";
// import { addToCartApi } from "@/pages/api/CartItemApi";
// import { UserContext } from "../login/AuthContext";
// import {CartContext} from "./cart/CartContext";
export default function ProductCard({ product }: any) {
  const formatNumber = (number: number) => {
    return number.toLocaleString("en-US");
  };
  const [loading, setLoading] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();
  //   const { user } = React.useContext(UserContext);
  //   const { cart } = React.useContext(CartContext)
  const handleAddtoCart = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    // if (user === null ) {
    //   dispatch(
    //     setOpen({
    //       open: true,
    //       message: "You must login to buy",
    //       severity: "error",
    //     })
    //   );
    // } else {
    //   const response = await addToCartApi(cart.cart.cartId, product.productId);
    //   if (response) {
    //     dispatch(
    //       setOpen({
    //         open: true,
    //         message: "Adding success",
    //         severity: "success",
    //       })
    //     );
    //   } else {
    //     dispatch(
    //       setOpen({
    //         open: true,
    //         message: "Adding fail",
    //         severity: "error",
    //       })
    //     );
    //   }
    // }
  };
  return (
    <Card
      sx={{
        maxWidth: 345,
        borderRadius: "1rem",
        // boxShadow: "none",
      }}
    >
      <UrlImage
        height="16rem"
        url={`/product/${product.productName}`}
        img={`/assets/images/${product.image}`}
      />
      <div
        style={{
          padding: "1rem 1rem 0.5rem 1rem",
        }}
      >
        <Typography
          variant="body1"
          noWrap
          sx={{
            overflow: "hidden",
            fontWeight: "600",
            fontSize: "1.1rem",
          }}
        >
          {product.productName}
        </Typography>
        <Typography
          sx={{
            color: product.quantity > 0 ? setup.success : setup.error,
          }}
        >
          {product.quantity > 0 ? "Còn hàng" : "Hết hàng"}
        </Typography>
        <CardActions
          sx={{
            padding: 0,
            justifyContent: "space-between"
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: "#e10404",
              fontWeight: 600,
            }}
          >
            {formatNumber(product.price)} VND
          </Typography>
            <LoadingIconButton
              loading={loading}
              size="large"
              onClick={handleAddtoCart}
            >
              <AddShoppingCartIcon />
            </LoadingIconButton>
        </CardActions>
      </div>
    </Card>
  );
}
