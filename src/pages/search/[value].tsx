import React from "react";
import Layout1 from "@/component/theme/layout/Layout1";
import { Grid, Paper, Typography } from "@mui/material";
import ProductFilter from "@/component/product/ProductFilter";
import { useRouter } from "next/router";
import ProductListSkeleton from "@/component/product/ProductListSkeleton";
import { UseSearchProductName } from "../../../package/function/product/use-search-name";
import ProductList2 from "@/component/product/ProductList2";
import { Product } from "../../../package/model/product";
import { GetStaticPaths, GetStaticProps } from "next";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<any> = async ({ params }) => {
  return {
    props: {
      value: params?.value,
      revalidate: 60
    },
  };
};
interface Props {
  value: string;
}
export default function Search({ value }: Props) {
  const { data, isLoading, error } = UseSearchProductName({
    productName: value
  });
  const productList = data?.data as Product[];
  return (
    <Layout1>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <ProductFilter />
        </Grid>
        <Grid item xs={9}>

            <Typography variant="h4">
              {`Kết quả tìm kiếm cho "${value}"`}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "600",
                color: "gray",
              }}
            >
              {productList?.length} sản phẩm tìm thấy
            </Typography>
          {isLoading ? (
            <ProductListSkeleton col={3} row={4} />
          ) : (
            <ProductList2 col={3} row={3} productList={productList} />
          )}
        </Grid>
      </Grid>
    </Layout1>
  );
}
