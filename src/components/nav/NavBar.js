import { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { getAuthTraveler } from "../managers/TravelerManager"


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
            <button onClick={() => navigate(`/travelers`)} className="nav__button">Travelers</button>
            <button onClick={() => navigate(`/destinations`)} className="nav__button">Destinations</button>
            {
                (localStorage.getItem("auth_token") !== null) ?
                <>
                    <button onClick={() => navigate(`/account/${user.id}`)} className="nav__button">Account</button>
                    <button onClick={() => navigate(`/my-trips`)} className="nav__button">My Trips</button>
                    <button className="nav__button" 
                        onClick={() => {
                            localStorage.removeItem("auth_token")
                            navigate('/login')
                        }}
                        >Logout</button>
                </>
                : <>
                    <button onClick={() => navigate("/login")} className="nav__button">Login</button>
                    <button onClick={() => navigate("/register")} className="nav__button">Register</button>
                </>
            }
        </section>
        <Outlet/>
    </>
}