import { FetcherProps, fetcher } from "../../fetcher";
import { UseLoginBody } from "../../model/api/auth/login";

export const UseLogin = async ({ email, password, auth }: UseLoginBody) => {
    const url = `/api/auth/login`;
    const props: FetcherProps = {
        method: "POST",
        body: JSON.stringify({
            email,
            password,
            auth
        }),
        options: {
            next: {
                revalidate: 60,
            }
        },
    };
    const data = await fetcher(url, props)
    return data

};
