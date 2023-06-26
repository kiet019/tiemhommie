import { NextApiRequest, NextApiResponse } from "next";
import { Product } from "../../../../package/model/product";
import { UseSearchProductNameBody } from "../../../../package/model/api/product/search-name";

export default async function Api(req: NextApiRequest, res: NextApiResponse) {
  req.method == "GET" ? null : res.status(400).json({
    data: null,
    status: "error",
    message: "error",
  })
  try {
    const params = req.query as unknown as UseSearchProductNameBody;
    const response = await fetch(
      `http://localhost:8080/api/product/searchByName?productName=${params.productName}`
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
    res.status(400).json({
      data: null,
      message: error.message,
      status: "error",
    });
  }
}
