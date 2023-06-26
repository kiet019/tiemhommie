import { Auth } from "firebase/auth"

export interface UseLoginBody {
    email: string,
    password: string
    auth: Auth
}