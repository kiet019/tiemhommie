import React, { useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { useForm } from "react-hook-form";
import { UserContext } from "./AuthContext";
import { useAppDispatch } from "@/feature/Hooks";
import { setOpen } from "@/feature/Alert";
import StyledLink from "../theme/navLink/Link";
import { StyledButton } from "../theme/button/StyledButton";
import LineText from "../theme/text/LineText";
import StyledOutlinedInput from "../theme/input/StyledInput";
import StyledLoadingButton from "../theme/button/StyledLoadingButton";
import FlexBox from "../theme/flexbox/FlexBox";
import { setup } from "@/config/setup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useRouter } from "next/router";
export default function RegisterCard() {
  const { register, handleSubmit, formState: { errors }, } = useForm()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const onSubmit = async (fields: any) => {
    try {
      setIsLoading(true)
      await createUserWithEmailAndPassword(auth, fields.email, fields.password)
      router.push("/information")
    } catch (error : any) {
      dispatch(setOpen({
        message: error.message,
        open: true,
        severity: "error"
      }))
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StyledOutlinedInput
        id="login"
        label="Email"
        error={errors.email !== undefined}
        helperText={errors.email !== undefined ? "bắt buộc" : ""}
        {...register("email", {
          required: true
        })}
      />
      <StyledOutlinedInput
        label="Password"
        error={errors.password !== undefined}
        helperText={errors.password !== undefined ? "bắt buộc ít nhất 6 kí tự" : ""}
        id="2"
        {...register("password", {
          required: true,
          minLength: 6
        })}
      />
      <StyledLoadingButton
        loading={isLoading}
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          backgroundColor: setup.inside
        }}
      >
        Đăng kí
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
          }}
        >
          <GoogleIcon style={{ fontSize: "1.5rem", marginRight: "1rem" }} />
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
            href="/login"
          >
            Đăng nhập
          </StyledLink>
        </FlexBox>
      </div>
    </form>
  );
}
