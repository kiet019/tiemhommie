import { AuthProvider } from "firebase/auth";

export interface useLoginGoogleBody<T> {
    auth: T,
    provider: AuthProvider
}