import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { configureStore } from "@reduxjs/toolkit"
import { authApi } from "./authApi"
import { chatApi } from "./chatApi"
import userReducer from "./authSlice"
import { listenerMiddleware } from "../middleware/authenticate"

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    user: userReducer,
  },
  middleware: getDefaultMiddlware =>
    getDefaultMiddlware().concat(authApi.middleware, chatApi.middleware).prepend(listenerMiddleware.middleware),
})

export type AppStore = typeof store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
