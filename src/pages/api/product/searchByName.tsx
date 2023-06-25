import { NextApiRequest, NextApiResponse } from "next";
import { Product } from "../../../../package/model/product";

export default async function Api(req: NextApiRequest, res: NextApiResponse) {
  try {
    const productName = req.query.productName;
    const response = await fetch(
      `http://localhost:8080/api/product/searchByName?productName=${productName}`
    );
    if (response.status === 200) {
      const data: Product[] = await response.json();
      res.status(200).json({
        data: data,
        status: "success",
        message: "success",
      });
    } else {
      res.status(200).json({
        data: [],
        status: "error",
        message: "Not found",
      });
    }
  } catch (error: any) {
    return res.status(400).json({
      data: null,
      message: error.message,
      status: "error",
    });
  }
}
