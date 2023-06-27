import { NextApiRequest, NextApiResponse } from "next";
import { Product } from "../../../../package/model/product";
import { UseGetCartUserUidBody } from "../../../../package/model/api/cart/get-user";
import { CartAndCartItemAndProduct } from "../../../../package/model/cart/cart-and-cartItem-and-product";
import { AddCartItemBody } from "../../../../package/model/api/cart/add";

export default async function Api(req: NextApiRequest, res: NextApiResponse) {
  req.method == "POST"
    ? null
    : res.status(400).json({
        data: null,
        status: "error",
        message: "error",
      });
  try {
    const params = req.body as unknown as AddCartItemBody;
    const response = await fetch(
      `http://localhost:8080/api/cartItem/createCartItems`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          cartId: params.cartId,
          cartItemId: 0,
          productId: params.productId,
          quantity: 1,
        }),
      }
    );
    if (response.status === 200) {
      const response = await fetch(`/api/cart?userUid=${params.userUid}`);
      if (response.status === 200) {
        const data: CartAndCartItemAndProduct = await response.json();
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
    } else {
        res.status(200).json({
            data: null,
            status: "error",
            message: "Fail",
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
