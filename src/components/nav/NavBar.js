import { useEffect, useState } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { getAuthTraveler } from "../managers/TravelerManager"
import { AccountNav } from "./AccountNav"

export const NavBar = () => {

    const [user, setUser] = useState({})
    const [background, setBackground] = useState("")
    const [text, setText] = useState("")
    const [homeImg, setHomeImg] = useState("")
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(
        () => {

            if (localStorage.getItem("auth_token") !== null) {
                getAuthTraveler().then(data => setUser(data))
            }
        },
        []
    )

    useEffect(
        () => {
            if (["/"].includes(window.location.pathname)) {
                setBackground('transparent');
                setText('white')
                setHomeImg('https://res.cloudinary.com/dupram4w7/image/upload/v1672460293/Trouvaille/Trouvaille_1_rxks06.png')
            } else {
                setBackground('transparent')
                setText('#AB8466')
                setHomeImg('https://res.cloudinary.com/dupram4w7/image/upload/v1672513789/Trouvaille/image_2_bqurbu.png')
            }
        },
        [location]
    )

    window.onscroll = function() {
        const navbar = document.getElementById('navbar')
        if (window.scrollY > 0) {
            if (window.location == 'http://localhost:3000/' || window.location == 'https://trouvaille-frontend.vercel.app/') {
                navbar.classList.add('scroll__landing')
            } else {
                navbar.classList.add('scroll')
            }
        } else {
            navbar.classList.remove('scroll')
            navbar.classList.remove('scroll__landing')
        } 
    }
    
    return <>
        <section className="navbar" id='navbar' style={{backgroundColor: background}}>
            <button onClick={() => navigate(`/`)} className="navbar-btn-home">
                <img src={homeImg} alt="Home" className="home-img"></img>
            </button>
            <button onClick={() => navigate(`/home`)} className="navbar-btn" style={{color: text}}>Home</button>
            <button onClick={() => navigate(`/trips`)} className="navbar-btn" style={{color: text}}>Trips</button>
            <button onClick={() => navigate(`/travelers`)} className="navbar-btn" style={{color: text}}>Travelers</button>
            <button onClick={() => navigate(`/destinations`)} 
            className="navbar-btn" style={{color: text}}>Destinations</button>
            <button onClick={() => navigate(`/experiences`)} className="navbar-btn" style={{color: text}}>Experiences</button>
            {
                localStorage.getItem("auth_token") !== null
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