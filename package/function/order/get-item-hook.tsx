import { FetcherProps, fetcher } from "../../fetcher";
import { UseGetOrderItemBody } from "../../model/order/get";
import useSWR from "swr";
import { ResponseBody } from "../../model/api";
import { OrderAndOrderItemOne } from "../../model/order";

export const UseGetOrderItemHook = ({ orderId }: UseGetOrderItemBody) => {
  const url = `http://localhost:3000/api/order/getOrderItem?orderId=${orderId}`;
  const props: FetcherProps = {
    method: "GET",
    options: {
      next: {
        revalidate: 60,
      },
    },
  };
  const { data, isLoading, error, mutate } = useSWR<ResponseBody<OrderAndOrderItemOne>>(
    url,
    (url: string) => fetcher(url, props),{
      revalidateOnFocus: false,
      dedupingInterval: 60000
    }
  );

  return {
    data,
    isLoading,
    error,
    mutate
  };
};
