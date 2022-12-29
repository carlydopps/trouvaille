import { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { getAuthTraveler } from "../managers/TravelerManager"
import { AccountNav } from "./AccountNav"


export const NavBar = () => {

    const [user, setUser] = useState({})
    const navigate = useNavigate()

    useEffect(
        () => {

            if (localStorage.getItem("auth_token") !== null) {
                getAuthTraveler()
                .then((data) => {
                    setUser(data)
                })
            }
        },
        []
    )
    
    return <>
        <section className="nav">
            <button onClick={() => navigate(`/home`)} className="nav__home">Home</button>
            <button onClick={() => navigate(`/trips`)} className="nav__button">Trips</button>
            <button onClick={() => navigate(`/travelers`)} className="nav__button">Travelers</button>
            <button onClick={() => navigate(`/destinations`)} 
            className="nav__button">Destinations</button>
            <button onClick={() => navigate(`/experiences`)} className="nav__button">Experiences</button>
            {
                (localStorage.getItem("auth_token") !== null) 
                ? <AccountNav user={user}/>
                : <>
                    <button onClick={() => navigate("/login")} className="nav__button">Login</button>
                    <button onClick={() => navigate("/register")} className="nav__button">Register</button>
                </>
            }
        </section>
        <Outlet/>
    </>
}