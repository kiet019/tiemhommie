import { Auth } from "firebase/auth"

export interface UseLoginBody<T> {
    email: string,
    password: string
    auth: T
}