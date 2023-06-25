import { FetcherProps, fetcher } from "../../fetcher";
import { Product } from "../../model/product";

export const UseGetProductName = async (productName : string) => {
  const url = `http://localhost:8080/api/product/searchByName?productName=${productName}`;
  const props : FetcherProps = {
    method: "GET",
    options: {
        next: {
            revalidate: 60
        }
    }
  }
  try {
    const data : Product[] = await fetcher(url, props)
    return {
        data: data,
        message: "success",
        status: "success"
    }
  } catch( error : any ) {
    return {
        data: null,
        message: error.message,
        status: "error"
    }
  }
};
