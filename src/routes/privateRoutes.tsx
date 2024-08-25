import type React from 'react'
import { useAppSelector } from '../hooks/reduxHooks'
import { Navigate } from 'react-router-dom'

interface Props {
  children: React.ReactNode
}

const PrivateRoutes: React.FC<Props> = ({ children }) => {
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated)
  return isAuthenticated ? children : <Navigate to={'/login'} />
}

export default PrivateRoutes