import { useEffect, useState } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { getAuthTraveler } from "../managers/TravelerManager"
import { AccountNav } from "./AccountNav"
import './NavBar.css'

export const NavBar = () => {

    const [user, setUser] = useState({})
    const [background, setBackground] = useState("")
    const [text, setText] = useState("")
    const location = useLocation()
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

    useEffect(
        () => {
            if (window.location.pathname === "/") {
                setBackground('transparent');
                setText('white')
            } else {
                setBackground('#A3B8AB')
                setText('white')
            }
        },
        [location]
    )
    
    return <>
        <section className="navbar" style={{backgroundColor: background}}>
            <button onClick={() => navigate(`/home`)} className="navbar-btn-home">
                <img src='https://res.cloudinary.com/dupram4w7/image/upload/v1672460293/Trouvaille/Trouvaille_1_rxks06.png' alt="Home" className="home-img"></img>
            </button>
            <button onClick={() => navigate(`/trips`)} className="navbar-btn" style={{color: text}}>Trips</button>
            <button onClick={() => navigate(`/travelers`)} className="navbar-btn" style={{color: text}}>Travelers</button>
            <button onClick={() => navigate(`/destinations`)} 
            className="navbar-btn" style={{color: text}}>Destinations</button>
            <button onClick={() => navigate(`/experiences`)} className="navbar-btn" style={{color: text}}>Experiences</button>
            {
                (localStorage.getItem("auth_token") !== null) 
                ? <AccountNav user={user}/>
                : <>
                    <button onClick={() => navigate("/login")} className="navbar-btn" style={{color: text}}>Login</button>
                    <button onClick={() => navigate("/register")} className="navbar-btn" style={{color: text}}>Register</button>
                </>
            }
        </section>
        <Outlet/>
    </>
}