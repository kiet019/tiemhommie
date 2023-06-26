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
        const params = JSON.parse(req.body) as UseLoginBody
        const userFirebase = await signInWithEmailAndPassword(params.auth, params.email, params.password)
        console.log(userFirebase)
        const response = await fetch(`http://localhost:8080/api/user/getUserByUserUid?userUid=${userFirebase.user.uid}`)
        if (response.status === 200) {
            const data : User = await response.json()
            res.status(200).json({
                data: data,
                status: "success",
                message: "success",
            });
        } else {
            res.status(200).json({
                data: null,
                status: "error",
                message: "Not found",
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
