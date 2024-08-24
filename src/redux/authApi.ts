import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { ILoginData, IRegisterData, IUser } from "../interfaces/userInterfaces"

const BASE_URL = import.meta.env.VITE_BASE_URL

export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/auth`,
  }),
  endpoints: builder => ({
    register: builder.mutation<IUser & { token: string }, IRegisterData>({
      query: body => ({
        url: "/register",
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation<IUser & { token: string }, ILoginData>({
      query: body => ({
        url: "/login",
        method: "POST",
        body,
      }),
    }),
    current: builder.query<IUser & { token: string }, string>({
      query: token => ({
        url: "/current",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
})

export const { useRegisterMutation, useLoginMutation, useCurrentQuery } =
  authApi
