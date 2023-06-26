import { NextApiRequest, NextApiResponse } from 'next'
import { UseLoginBody } from '../../../../package/model/api/auth/login';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FetcherProps, fetcher } from '../../../../package/fetcher';
import { User } from '../../../../package/model/user';

export default async function Api(req: NextApiRequest, res: NextApiResponse) {
    req.method == "POST" ? null : res.status(400).json({
        data: null,
        status: "error",
        message: "error",
    })
    try {
        const params = req.body as UseLoginBody<string>
        const response = await fetch(`http://localhost:8080/api/user/getUserByUserUid?userUid=${params.auth}`)
        if (response.ok) {
            const data : User = await response.json()
            res.status(200).json({
                data: data,
                status: "success",
                message: "Success, login success",
            });
        } else {
            res.status(200).json({
                data: null,
                status: "error",
                message: "Error, Login fails",
            });
        }
    } catch (error: any) {
        console.log(error)
        res.status(400).json({
            data: null,
            message: error.message,
            status: "error",
        });
    }
}
