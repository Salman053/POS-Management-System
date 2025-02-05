import LoginPage from "@/pages/client-pages/auth-pages/LoginPage"
import { Route, Routes } from "react-router-dom"

const AuthRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<LoginPage/>}/>
    </Routes>
  )
}

export default AuthRoutes