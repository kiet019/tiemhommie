import React, { useContext, useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import GoogleIcon from "@mui/icons-material/Google";
import { UserContext } from "./AuthContext";
import { useForm } from "react-hook-form";
import StyledLink from "../theme/navLink/Link";
import { StyledButton } from "../theme/button/StyledButton";
import StyledOutlinedInput from "../theme/input/StyledInput";
import StyledLoadingButton from "../theme/button/StyledLoadingButton";
import LineText from "../theme/text/LineText";
import FlexBox from "../theme/flexbox/FlexBox";
import { UseLogin } from "../../../package/function/auth/use-login";
import { auth } from "@/config/firebase";

export default function LoginCard() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { loginGoogle } = useContext(UserContext);
  const onSubmit = async (fields: any) => {
   setIsLoading(true)
    await UseLogin({
      email: fields.email,
      password: fields.password,
      auth: auth
    });
    setIsLoading(false)
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StyledOutlinedInput
        label="Email"
        id="input-login"
        error={errors.email !== undefined}
        helperText={errors.email !== undefined ? "bắt buộc" : ""}
        icon={<EmailIcon />}
        {...register("email", {
          required: true,
        })} />
      <br />
      <StyledOutlinedInput
        label="Password"
        id="input-login"
        error={errors.password !== undefined}
        helperText={errors.password !== undefined ? "bắt buộc" : ""}
        icon={<LockPersonIcon />}
        {...register("password", {
          required: true,
        })}
        type="password"
      />
      <StyledLoadingButton
        loading={isLoading}
        type="submit"
        fullWidth
        variant="contained"
      >
        Đăng nhập
      </StyledLoadingButton>
      <LineText text="Hoặc" />
      <div
        style={{
          marginTop: "1rem",
        }}
      >
        <StyledButton
          variant="contained"
          style={{ backgroundColor: "#F5A524" }}
          fullWidth
          onClick={() => {
            loginGoogle();
          }}
        >
          <GoogleIcon sx={{ fontSize: "1.5rem", marginRight: "1rem" }} />
          Đăng nhập bằng google
        </StyledButton>
        <FlexBox>
          <StyledLink
            style={{
              color: "black",
            }}
            href="/"
          >
            Quay về
          </StyledLink>
          <StyledLink
            style={{
              color: "black",
            }}
            href="/register"
          >
            Đăng kí
          </StyledLink>
        </FlexBox>
      </div>
    </form>
  );
}
