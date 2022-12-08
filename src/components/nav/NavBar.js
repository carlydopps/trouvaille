import { Outlet, useNavigate } from "react-router-dom"


export const NavBar = () => {

    const navigate = useNavigate()
    
    return <>
        <Outlet/>
        <section className="nav">
            <button onClick={() => navigate(`/home`)} className="nav__home">Home</button>
            {
                (localStorage.getItem("tr_token") !== null) ?
                <>
                    <button className="nav__button" 
                        onClick={() => {
                            localStorage.removeItem("tr_token")
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
    </>
}