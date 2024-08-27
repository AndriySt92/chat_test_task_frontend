import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import type { IUser } from "../interfaces/userInterfaces"
import { authApi } from "./authApi"

interface InitialState {
  user: IUser | null
  isAuthenticated: boolean
}

const initialState: InitialState = {
  user: null,
  isAuthenticated: false,
}

const setUserState = (
  state: InitialState,
  action: PayloadAction<IUser & { token: string }>,
) => {
  state.isAuthenticated = true
  state.user = {
    _id: action.payload._id,
    firstName: action.payload.firstName,
    lastName: action.payload.lastName,
    email: action.payload.email,
    avatar: action.payload.avatar,
  }
}

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addMatcher(authApi.endpoints.login.matchFulfilled, setUserState)
      .addMatcher(authApi.endpoints.register.matchFulfilled, setUserState)
      .addMatcher(authApi.endpoints.current.matchFulfilled, setUserState)
  },
})

export const { logout } = slice.actions

export default slice.reducer
