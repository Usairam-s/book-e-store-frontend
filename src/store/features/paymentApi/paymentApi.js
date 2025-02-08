import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:5000/api/payment";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getAllPayments: builder.query({
      query: () => "/",
    }),
    // getBookById: builder.query({
    //   query: (id) => `/${id}`,
    // }),
    // createBook: builder.mutation({
    //   query: (newBook) => ({
    //     url: "/create-book",
    //     method: "POST",
    //     body: newBook,
    //   }),
    // }),
    // updateBook: builder.mutation({
    //   query: ({ id, updatedBook }) => ({
    //     url: `/edit/${id}`,
    //     method: "PATCH",
    //     body: updatedBook,
    //   }),
    // }),
    // deleteBook: builder.mutation({
    //   query: (id) => ({
    //     url: `/delete/${id}`,
    //     method: "DELETE",
    //   }),
    // }),
  }),
});

export const { useGetAllPaymentsQuery } = paymentApi;
