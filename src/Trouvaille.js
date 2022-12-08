import { Route, Routes } from "react-router-dom"
import { Login } from "./components/auth/Login"
import { Register } from "./components/auth/Register"
import { HomePage } from "./components/home/HomePage"
import { LandingPage } from "./components/home/LandingPage"
import { NavBar } from "./components/nav/NavBar"
import { Authorized } from "./components/views/Authorized"

export const Trouvaille = () => {
    return <>
        <Routes>
            <Route element={<NavBar />}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route element={<Authorized  />}></Route>
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    </>
}

