import React from 'react'
import StyledLoadingButton from '../theme/button/StyledLoadingButton'
import GoogleIcon from "@mui/icons-material/Google";
const SocialButton = ({handleLoginGoogle, isLoading} : any) => {
  return (
    <StyledLoadingButton
    loading={isLoading}
    variant="contained"
    style={{ backgroundColor: "rgb(220 137 3)" }}
    fullWidth
    onClick={handleLoginGoogle}
  >
    <GoogleIcon style={{ fontSize: "1.5rem", marginRight: "1rem" }} />
    Đăng nhập bằng google
  </StyledLoadingButton>
  )
}

export default SocialButton