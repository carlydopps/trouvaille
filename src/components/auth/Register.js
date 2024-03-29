import React, { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { registerUser } from "../managers/AuthManager"

export const Register = () => {
    const firstName = useRef()
    const lastName = useRef()
    const username = useRef()
    const email = useRef()
    const bio = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const passwordDialog = useRef()
    const navigate = useNavigate()

    const handleRegister = (e) => {
        e.preventDefault()

        if (password.current.value === verifyPassword.current.value) {
            const newUser = {
                "firstName": firstName.current.value,
                "lastName": lastName.current.value,
                "username": username.current.value,
                "email": email.current.value,
                "password": password.current.value,
                "bio": bio.current.value,
                "profileImg": "https://res.cloudinary.com/dupram4w7/image/upload/v1663620931/Screen_Shot_2022-09-19_at_2_ey3w9e.png",
                "coverImg": "https://res.cloudinary.com/dupram4w7/image/upload/v1672466537/Trouvaille/pexels-krivec-ales-547119_xsvwvy.jpg"
            }

            registerUser(newUser)
                .then(res => {
                    if ("token" in res) {
                        localStorage.setItem("auth_token", res.token)
                        navigate("/home")
                    }
                })
        } else {
            passwordDialog.current.showModal()
        }
    }

    return <main className="page-auth page-register">
        <section className='navbar__auth'>
            <button onClick={() => navigate(`/home`)} className="navbar-btn-home">
                <img src='https://res.cloudinary.com/dupram4w7/image/upload/v1672460293/Trouvaille/Trouvaille_1_rxks06.png' alt="Home" className="home-img"></img>
            </button>
        </section>
        <section className="container-auth">
            <section className="auth-img-container">
                <img src="https://res.cloudinary.com/dupram4w7/image/upload/v1708588159/pexels-edgar-rodrigo-17011415_bicix9.jpg" className="auth-img" alt='Cover image'/>
            </section>
            <section className="auth-form">
                <dialog className="dialog dialog--password" ref={passwordDialog}>
                    <div>Passwords do not match</div>
                    <button className="button--close" onClick={e => passwordDialog.current.close()}>Close</button>
                </dialog>
                <section>
                    <form className="form--login" onSubmit={handleRegister}>
                        <h1 className="auth-title">Create your account</h1>
                        <h5>discover hidden gems around the world</h5>
                        <fieldset>
                            <label htmlFor="firstName"></label>
                            <input ref={firstName} type="text" name="firstName" className="form-control" placeholder="First name" required autoFocus />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="lastName"></label>
                            <input ref={lastName} type="text" name="lastName" className="form-control" placeholder="Last name" required />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="inputUsername"></label>
                            <input ref={username} type="text" name="username" className="form-control" placeholder="Username" required />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="inputEmail"></label>
                            <input ref={email} type="text" name="email" className="form-control" placeholder="Email address" required />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="inputPassword"></label>
                            <input ref={password} type="password" name="password" className="form-control" placeholder="Password" required />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="verifyPassword"></label>
                            <input ref={verifyPassword} type="password" name="verifyPassword" className="form-control" placeholder="Verify password" required />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="verifyPassword"></label>
                            <textarea ref={bio} name="bio" className="form-control" placeholder="Tell other travelers a little bit about yourself!" />
                        </fieldset>
                        <fieldset style={{
                            textAlign: "center"
                        }}>
                            <button className="btn-register btn-1 btn-sep icon-send" type="submit">Register</button>
                        </fieldset>
                    </form>
                </section>
                <section className="link--register">
                    Already registered? <Link to="/login">Login</Link>
                </section>
            </section>
        </section>
    </main>
}
