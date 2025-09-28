import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "products",
    }),
    getProductById: builder.query({
      query: (id) => `products/${id}`,
    }),
    addProduct: builder.mutation({
      query: (product) => ({
        url: "products",
        method: "POST",
        body: product,
      }),
    }),
    signup: builder.mutation({
      query: (user) => ({
        url: "auth/signup",
        method: "POST",
        body: user,
      }),
    }),
// cart endpoints
    getCart: builder.query({
      query: () => `cartItems`,
    }),
    addToCart: builder.mutation({
      query: (cartItem) => ({
        url: "cartItems",
        method: "POST",
        body: cartItem,
      }),
    }),
    removeFromCart: builder.mutation({
      query: (cart_item_id) => ({
        url: "cartItems",
        method: "DELETE",
        body: { cart_item_id },
      }),
    }),

    updateShippingAddress: builder.mutation({
      query: (address) => ({
        url: "shippingAddress",
        method: "POST",
        body: address,
      }),
    }),
    updateUserAddress: builder.mutation({
      query: (address) => ({
        url: "userAddress",
        method: "POST",
        body: address,
      }),
    }),
    getUserAddress: builder.query({
      query: () => "userAddress",
    }),

    updateExistingUserAddress: builder.mutation({
      query: (address) => ({
        url: "userAddress",
        method: "PUT",
        body: address,
      }),
    }),
  }),
});

export const { 
    useGetProductsQuery, 
    useGetProductByIdQuery, 
    useAddProductMutation, 
    useSignupMutation,
    useGetCartQuery,
    useAddToCartMutation,
    useRemoveFromCartMutation,
    useUpdateShippingAddressMutation,
    useUpdateUserAddressMutation,
    useGetUserAddressQuery,
    useUpdateExistingUserAddressMutation
} = api;
