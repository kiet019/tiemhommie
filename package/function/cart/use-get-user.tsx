import useSWR from "swr";
import { FetcherProps, fetcher } from "../../fetcher";
import { Product } from "../../model/product";
import { ResponseBody } from "../../model/api";
import { UseSearchProductNameBody } from "../../model/api/product/search-name";
import { UseGetCartUserUidBody } from "../../model/api/cart/get-user";
import { CartAndCartItemAndProduct } from "../../model/cart/cart-and-cartItem-and-product";

export const UseGetCartUserUid = ({ userUid }: UseGetCartUserUidBody) => {
  const url = `/api/cart?userUid=${userUid}`;
  const props: FetcherProps = {
    method: "GET",
    options: {
      next: {
        revalidate: 60,
      },
    },
  };
  const { data, isLoading, error } = useSWR<ResponseBody<CartAndCartItemAndProduct>>(
    url,
    (url) => fetcher(url, props)
  );
  return {
    data,
    isLoading,
    error,
  };
};
