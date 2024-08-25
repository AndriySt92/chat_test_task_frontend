import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type {
  IMessage,
  IChat,
  IChatDataForm,
  IMessageRequestData,
} from "../interfaces/chatInterfaces"
import { getToken } from "../utils/getToken"

const BASE_URL = import.meta.env.VITE_BASE_URL

export const chatApi = createApi({
  reducerPath: "chat",
  tagTypes: ["Chats"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}`,
    prepareHeaders: headers => {
      const token = getToken()
      if (token) {
        headers.set("authorization", `Bearer ${token}`)
      }
      return headers
    },
  }),

  endpoints: builder => ({
    addChat: builder.mutation<IChat, IChatDataForm>({
      query: chatData => ({
        url: "/chats",
        method: "POST",
        body: { firstName: chatData.firstName, lastName: chatData.lastName },
      }),
      invalidatesTags: [{ type: "Chats", id: "LIST" }],
    }),

    updateChat: builder.mutation<void, IChatDataForm & {chatId: string}>({
      query: ({ chatId, ...body }) => ({
        url: `chats/${chatId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error) => [{ type: "Chats", id: "LIST" }],
    }),

    getChats: builder.query<IChat[], { search?: string }>({
      query: ({ search } = {}) => {
        const params = new URLSearchParams()
        if (search) params.append('search', search)
        
        return {
          url: `/chats?${params.toString()}`,
          method: 'GET',
        }
      },
      providesTags: result =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Chats", id: _id }) as const),
              { type: "Chats", id: "LIST" },
            ]
          : [{ type: "Chats", id: "LIST" }],
    }),

    removeChat: builder.mutation<string, string>({
      query: id => ({
        url: `/chats/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Chats", id: "LIST" }],
    }),

    addMessage: builder.mutation<void, IMessageRequestData>({
      query: ({ authorId, messageText }) => ({
        url: `messages/${authorId}`,
        method: "POST",
        body: { messageText },
      }),
      invalidatesTags: (result, error) => [{ type: "Chats", id: "LIST" }],
    }),

    updateMessage: builder.mutation<void, IMessageRequestData>({
      query: ({ authorId, messageText }) => ({
        url: `messages/${authorId}`,
        method: "PATCH",
        body: { messageText },
      }),
      invalidatesTags: (result, error) => [{ type: "Chats", id: "LIST" }],
    }),
  }),
})

export const {
  useAddChatMutation,
  useGetChatsQuery,
  useRemoveChatMutation,
  useAddMessageMutation,
  useUpdateMessageMutation,
  useUpdateChatMutation
} = chatApi
