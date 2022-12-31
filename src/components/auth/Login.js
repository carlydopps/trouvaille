import React, { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../managers/AuthManager"
import './Auth.css'

export const Login = () => {
    const username = useRef()
    const password = useRef()
    const invalidDialog = useRef()
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        const user = {
            username: username.current.value,
            password: password.current.value
        }
        loginUser(user)
            .then(res => {
                if ("valid" in res && res.valid && "token" in res) {
                    localStorage.setItem("auth_token", res.token)
                    navigate("/home")
                }
                else {
                    invalidDialog.current.showModal()
                }
            })
    }

    return <main className="page-auth page-login">
        <section>
            <button onClick={() => navigate(`/home`)} className="navbar-btn-home">
                <img src='https://res.cloudinary.com/dupram4w7/image/upload/v1672460293/Trouvaille/Trouvaille_1_rxks06.png' alt="Home" className="home-img"></img>
            </button>
        </section>
        <section className="main-auth">
            <section className="container-login">
                <section className="img-container-register">
                    <img src="https://res.cloudinary.com/dupram4w7/image/upload/v1672445008/Trouvaille/How-To-Take-A-Road-Trip-On-A-Budget-Vanlife-views_2_efkgbi.png" className="img-register"/>
                </section>
                <section className="container-auth">
                    <dialog className="dialog dialog--auth" ref={invalidDialog}>
                        <div>Username or password was not valid.</div>
                        <button className="button--close" onClick={e => invalidDialog.current.close()}>Close</button>
                    </dialog>
                    <section>
                        <form className="form--login" onSubmit={handleLogin}>
                            <h1 className="auth-title">Welcome Back</h1>
                            <h3>Sign in to find your next adventure</h3>
                            <fieldset>
                                <label htmlFor="inputUsername"></label>
                                <input ref={username} type="username" id="username" className="form-control" placeholder="Username" required autoFocus />
                            </fieldset>
                            <fieldset>
                                <label htmlFor="inputPassword"></label>
                                <input ref={password} type="password" id="password" className="form-control" placeholder="Password" required />
                            </fieldset>
                            <fieldset style={{
                                textAlign: "center"
                            }}>
                                <button className="btn-login btn-1 btn-sep icon-send" type="submit">Sign In</button>
                            </fieldset>
                        </form>
                    </section>
                    <section className="link--register">
                        Not yet a member? <Link to="/register">Register</Link>
                    </section>
                </section>
            </section>
        </section>
    </main>
}
