import { Auth, UserCredential, signInWithEmailAndPassword } from "firebase/auth";
import { FetcherProps, fetcher } from "../../fetcher";
import { UseLoginBody } from "../../model/api/auth/login";
import { ResponseBody } from "../../model/api";
import { User } from "../../model/user";

export const UseLogin = async ({ email, password, auth }: UseLoginBody<Auth>) => {
    const userFirebase : UserCredential = await signInWithEmailAndPassword(auth, email, password)
    console.log(userFirebase)
    const url = `/api/auth/login`;
    const props: FetcherProps = {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: {
            email,
            password,
            auth: userFirebase.user.uid
        },
        options: {
            next: {
                revalidate: 60,
            }
        },
    };
    const data : ResponseBody<User> = await fetcher(url, props)
    console.log(data)
    return data

};
