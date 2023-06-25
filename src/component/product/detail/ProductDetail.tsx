import React, { useContext, useState } from "react";
import { setup } from "@/config/setup";
import LoadingButton from "@mui/lab/LoadingButton";
import { setOpen } from "@/feature/Alert";
import { Typography } from "@mui/material";
import { useAppDispatch } from "@/feature/Hooks";
import StyledLoadingButton from "@/component/theme/button/StyledLoadingButton";
export default function ProductDetail({ product }: any) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const handleAddtoCart = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
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
    <>
      <Typography
        variant="h4"
        sx={
          {
            // fontWeight: "500"
          }
        }
      >
        {product.productName}
      </Typography>
      <div
        style={{
          margin: "1rem 0rem",
        }}
      >
        <Typography variant="h6">Giá sản phẩm: {product.price} VND </Typography>
        <Typography
          variant="h6"
          sx={{
            color: product.quantity > 0 ? setup.success : setup.error,
          }}
        >
          Số lượng: {product.quantity}
        </Typography>
      </div>
      <Typography variant="body1">Tình trạng: {product.status}</Typography>
      <Typography variant="body1">Thông tin: </Typography>
      <Typography variant="body1">{product.description}</Typography>
      <div
        style={{
          marginTop: "2rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        <StyledLoadingButton
          loading={isLoading}
          variant="contained"
          disabled={product.quantity > 0 ? false : true}
          onClick={() => handleAddtoCart()}
          sx={{
            "&:hover": {
              backgroundColor:
                product.quantity > 0
                  ? `${setup.success} !important`
                  : setup.error,
            },
            fontSize: "0.9rem",
            backgroundColor: product.quantity > 0 ? setup.success : setup.error,
            color: "white",
          }}
        >
          {product.quantity > 0 ? "Add to Cart " : "Out of Stock"}
        </StyledLoadingButton>
      </div>
    </>
  );
}
