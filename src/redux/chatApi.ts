import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type {
  IMessage,
  IChat,
  IChatDataForm,
} from "../interfaces/chatInterfaces"
import { getToken } from "../utils/getToken"

const BASE_URL = import.meta.env.VITE_BASE_URL

export const chatApi = createApi({
  reducerPath: "chat",
  tagTypes: ["Chats", "Messages"],
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

    updateChat: builder.mutation<void, IChatDataForm & { chatId: string }>({
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
        if (search) params.append("search", search)

        return {
          url: `/chats?${params.toString()}`,
          method: "GET",
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

    addMessage: builder.mutation<void, { chatId: string; messageText: string }>(
      {
        query: ({ chatId, messageText }) => ({
          url: `messages/add/${chatId}`,
          method: "POST",
          body: { messageText },
        }),
        invalidatesTags: (result, error) => [{ type: "Chats", id: "LIST" }],
      },
    ),

    getChatMessages: builder.query<IMessage[], string>({
      query: chatId => ({
        url: `chats/${chatId}/messages`,
        method: "GET",
      }),
      providesTags: result =>
        result
          ? [
              ...result.map(
                ({ _id }) => ({ type: "Messages", id: _id }) as const,
              ),
              { type: "Messages", id: "LIST" },
            ]
          : [{ type: "Messages", id: "LIST" }],
    }),

    updateMessage: builder.mutation<
      void,
      { messageId: string; messageText: string }
    >({
      query: ({ messageId, messageText }) => ({
        url: `messages/${messageId}`,
        method: "PATCH",
        body: { messageText },
      }),
      invalidatesTags: (result, error, { messageId: id }) => [
        { type: "Messages", id },
        { type: "Chats", id: "LIST" },
      ],
    }),
  }),
})

export const {
  useAddChatMutation,
  useGetChatsQuery,
  useRemoveChatMutation,
  useAddMessageMutation,
  useUpdateMessageMutation,
  useUpdateChatMutation,
  useGetChatMessagesQuery,
} = chatApi
