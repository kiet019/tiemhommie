import useSWR from "swr";
import { FetcherProps, fetcher } from "../../fetcher";
import { Product } from "../../model/product";
import { ResponseBody } from "../../model/api";

export const UseSearchProductName = (productName: string) => {
  const url = `/api/product/searchByName?productName=${productName}`;
  const params: FetcherProps = {
    method: "GET",
    options: {
      next: {
        revalidate: 60,
      },
    },
  };
  const { data, isLoading, error } = useSWR<ResponseBody<Product[]>>(
    url,
    (url) => fetcher(url, params)
  );
  return {
    data,
    isLoading,
    error,
  };
};
