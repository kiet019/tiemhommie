import React, { useContext, useState } from "react";
import { setup } from "@/config/setup";
import LoadingButton from "@mui/lab/LoadingButton";
import { setOpen } from "@/feature/Alert";
import { useAppDispatch } from "@/feature/Hooks";
import StyledLoadingButton from "@/component/theme/button/StyledLoadingButton";
import { StyledTypography } from "@/component/theme/text/Typography";
const formatNumber = (number: number) => {
  return number.toLocaleString("en-US");
};
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
    //       })1
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
      <StyledTypography
        style={
          {
            fontSize: "2rem",
          }
        }
      >
        {product.productName}
      </StyledTypography>
      <div
        style={{
          margin: "1rem 0rem",
        }}
      >
        <StyledTypography variant="h6" sx={{
          color: "#e10404",
        }}>{formatNumber(product.price)} VND </StyledTypography>
        <StyledTypography
          variant="h6"
          sx={{
            color: product.quantity > 0 ? setup.success : setup.error,
          }}
        >
          Số lượng: {product.quantity}
        </StyledTypography>
      </div>
      <StyledTypography variant="body1" >Tình trạng: {product.status}</StyledTypography>
      <StyledTypography variant="body1" >Thông tin: </StyledTypography>
      <StyledTypography variant="body1" >{product.description}</StyledTypography>
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
