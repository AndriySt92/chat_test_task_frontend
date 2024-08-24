import { useCurrentQuery } from "../redux/authApi"
import { Loader } from "../components"
import { getToken } from "../utils/getToken"

export const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const token = getToken()
  if (token) {
    const { isLoading } = useCurrentQuery(token)

    if (isLoading) {
      return <Loader />
    }
  }

  return children
}