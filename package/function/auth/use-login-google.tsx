import { FetcherProps, fetcher } from "../../fetcher";
import { ResponseBody } from "../../model/api";
import { User } from "../../model/user";
import { useLoginGoogleBody } from "../../model/api/auth/loginGoogle";
import { Auth, signInWithPopup } from "firebase/auth";

export const UseLoginGoogle = async ({auth, provider} : useLoginGoogleBody<Auth>) => {
    const response = await signInWithPopup(auth, provider)
    const url = `/api/auth/login`;
    const props: FetcherProps = {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: {
            auth: response.user.uid,
            provider
        },
        options: {
            next: {
                revalidate: 60,
            }
        },
    };
    const data : ResponseBody<User> = await fetcher(url, props)
    return data
};
