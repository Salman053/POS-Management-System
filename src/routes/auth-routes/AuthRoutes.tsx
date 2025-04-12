import LoginPage from "@/pages/client-pages/auth-pages/LoginPage"
import RegisterPage from "@/pages/client-pages/auth-pages/RegisterPage"
import { Route, Routes } from "react-router-dom"

const AuthRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
    </Routes>
  )
}

export default AuthRoutes