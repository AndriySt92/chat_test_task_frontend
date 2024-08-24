import { createListenerMiddleware } from "@reduxjs/toolkit"
import { authApi } from "../redux/authApi"

export const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
  matcher: action =>
    authApi.endpoints.login.matchFulfilled(action) ||
    authApi.endpoints.register.matchFulfilled(action),

  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners()

    if (action.payload.token) {
      localStorage.setItem("token", action.payload.token)
    }
  },
})
