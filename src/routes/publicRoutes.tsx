import type React from 'react'
import { useAppSelector } from '../hooks/reduxHooks'
import { Navigate } from 'react-router-dom'

interface Props {
  children: React.ReactNode
}

const PublicRoutes: React.FC<Props> = ({ children }) => {
  const isAuthenticated = useAppSelector(state => state.user.isAuthenticated)
  return isAuthenticated ? <Navigate to={'/'} /> : children
}

export default PublicRoutes