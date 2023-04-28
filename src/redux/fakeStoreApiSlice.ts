import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const baseUrl = "https://fakestoreapi.com";

export const fakeStoreApi = createApi({
  reducerPath: "fakeStoreApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  // tagTypes: ["FakeProducts"],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => `/products`,
      // query: (page) => `/products?limit=3&page=${page}`,
      // providesTags: ["FakeProducts"],
    }),
    // addProduct: builder.mutation<Product, Omit<Product, "id">>({
    //   query: (product) => ({
    //     url: "/products",
    //     method: "POST",
    //     body: product,
    //   }),
    //   // invalidatesTags: ["Fake"],
    // }),
    // updateProduct: builder.mutation<Product, Product>({
    //   query: (product) => ({
    //     url: `/products/${product.id}`,
    //     method: "PUT",
    //     body: product,
    //   }),
    //   // invalidatesTags: ["Fake"],
    // }),
    // deleteProduct: builder.mutation<void, number>({
    //   query: (id) => ({
    //     url: `/products/${id}`,
    //     method: "DELETE",
    //   }),
    //   // invalidatesTags: ["Fake"],
    // }),
  }),
});

export const {
  useGetProductsQuery,
  // useAddProductMutation,
  // useUpdateProductMutation,
  // useDeleteProductMutation,
} = fakeStoreApi;
