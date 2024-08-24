import { Navigate, Route, Routes } from "react-router-dom"
import { Layout } from "./components"
import { Home, Login, Register } from "./pages"
import { PrivateRoutes, PublicRoutes } from "./routes"

const App = () => {
  return (
    <div>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <PrivateRoutes>
                <Home />
              </PrivateRoutes>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoutes>
                <Login />
              </PublicRoutes>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoutes>
                <Register />
              </PublicRoutes>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
