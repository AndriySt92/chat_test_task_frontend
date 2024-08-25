import { Navigate, Route, Routes } from "react-router-dom"
import { Layout } from "./components"
import { Chat, Login, Register } from "./pages"
import { PrivateRoutes, PublicRoutes } from "./routes"
import { ToastContainer } from "react-toastify"

const App = () => {
  return (
    <div>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <PrivateRoutes>
                <Chat />
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
      <ToastContainer autoClose={5000} position={"top-right"} theme="light" />
    </div>
  )
}

export default App
