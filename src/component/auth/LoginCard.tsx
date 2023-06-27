import React, { useContext, useState } from "react";
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
import { useAppDispatch } from "@/feature/Hooks";
import { setOpen } from "@/feature/Alert";
import { setup } from "@/config/setup";
import { useRouter } from "next/router";

export default function LoginCard() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { setUser } = useContext(UserContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { loginGoogle } = useContext(UserContext);
  const onSubmit = async (fields: any) => {
    try {
      setIsLoading(true);
      const data = await UseLogin({
        email: fields.email,
        password: fields.password,
        auth: auth,
      });
      dispatch(setOpen({
        message: data.message,
        open: true,
        severity: "success"
      }))
      setUser(data.data)
      router.push("/")
    } catch (error : any) {
      dispatch(setOpen({
        message: error.message,
        open: true,
        severity: "error"
      }))
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StyledOutlinedInput
        label="Email"
        id="input-login"
        error={errors.email !== undefined}
        helperText={errors.email !== undefined ? "bắt buộc" : ""}
        // icon={<EmailIcon />}
        {...register("email", {
          required: true,
        })}
      />
      <br />
      <StyledOutlinedInput
        label="Password"
        id="input-login"
        error={errors.password !== undefined}
        helperText={errors.password !== undefined ? "bắt buộc" : ""}
        {...register("password", {
          required: true,
        })}
        type="password"
      />
      <StyledLoadingButton
        loading={isLoading}
        sx={{
          backgroundColor: setup.inside
        }}
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
          style={{ backgroundColor: "rgb(220 137 3)" }}
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
