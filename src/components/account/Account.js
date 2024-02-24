import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Footer } from "../footer/Footer"
import { getAuthTraveler, saveTraveler } from "../managers/TravelerManager"

export const Account = () => {

    const {travelerId} = useParams()
    const [clickStatus, updateClickStatus] = useState(false)
    const [traveler, updateTraveler] = useState({
        firstName: "",
        lastName: "",
        username: "",
        bio: "",
        profileImg: ""
    })

    const renderUser = () => {
        getAuthTraveler()
            .then(data => {
                let traveler = {}
                traveler.firstName = data.first_name
                traveler.lastName = data.last_name
                traveler.username = data.username
                traveler.bio = data.bio
                traveler.profileImg = data.profile_img
                traveler.coverImg = data.cover_img

                updateTraveler(traveler)})
    }

    useEffect(
        () => {
            renderUser()
        },
        [travelerId]
    )

    const handleSave = (event) => {
        event.preventDefault()

        saveTraveler(traveler)
            .then(() => updateClickStatus(false))
            .then(() => renderUser())
    }

    const handleCancel = (event) => {
        event.preventDefault()

        updateClickStatus(false)
        renderUser()
    }

    const showWidget = (event) => {
        
        event.preventDefault()

        let widget = window.cloudinary.createUploadWidget(
        {
            cloudName: "dupram4w7",
            uploadPreset: "huvsusnz"
        },
        (error, result) => {
            if (!error && result && result.event === "success") {
                const copy = {...traveler}
                copy.profileImg = result.info.url
                updateTraveler(copy)
            }})
            widget.open()
    }

    const defaultDisplay = () => {

        return <section className="body-contact">
                <div className="account-grid">
                        <p>First Name: </p>
                        <p>Last Name: </p>
                        <p>Username: </p>
                        <p>Bio: </p>
                        <p>{traveler.firstName}</p>
                        <p>{traveler.lastName}</p>
                        <p>{traveler.username}</p>
                        <p>{traveler.bio}</p>
                </div>
                <button onClick={() => updateClickStatus(true)} className="btn">Edit Profile</button>
        </section>
    }

    const editDetails = () => {
        return <section className="body-contact">
            <form className="accountForm">
                <button onClick={(event) => showWidget(event)} className="btn">Update photo</button>
                <fieldset>
                    <div>
                        <label htmlFor="firstName">First Name: </label>
                        <input 
                            type="text"
                            className="form-control"
                            placeholder={traveler.firstName}
                            value={traveler.firstName}
                            onChange={
                                (event) => {
                                    const copy = {...traveler}
                                    copy.firstName = event.target.value
                                    updateTraveler(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name: </label>
                        <input 
                            type="text"
                            className="form-control"
                            placeholder={traveler.lastName}
                            value={traveler.lastName}
                            onChange={
                                (event) => {
                                    const copy = {...traveler}
                                    copy.lastName = event.target.value
                                    updateTraveler(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="username">Username: </label>
                        <input 
                            type="text"
                            className="form-control"
                            placeholder={traveler.username}
                            value={traveler.username}
                            onChange={
                                (event) => {
                                    const copy = {...traveler}
                                    copy.username = event.target.value
                                    updateTraveler(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <label htmlFor="bio"> Bio: </label>
                    <input
                        required
                        type="text" 
                        className="form-control"
                        placeholder={traveler.bio}
                        value={traveler.bio}
                        onChange={
                            (event) => {
                                const copy = {...traveler}
                                copy.bio = event.target.value
                                updateTraveler(copy)
                            }
                        } />
                </fieldset>
                <button onClick={(event) => handleSave(event)} className="btn">Save</button>
                <button onClick={(event) => handleCancel(event)} className="btn">Cancel</button>
        </form>
    </section>
    }


    return <>
        <main>
            <div className="main-account">
                <div className="img-stack">
                    <img src={traveler.coverImg} className="img-stack-bottom" alt='Cover image'/>
                    <img src={traveler.profileImg} className="img-stack-top" alt='Profile image'/>
                </div>
                <section className="body-account">
                    <section className="account-profile-details">
                        <h1 className="h1-account">Hi, {traveler.firstName}!</h1>
                        {
                            clickStatus ? editDetails() : defaultDisplay()
                        }
                    </section>
                </section>
            </div>
        </main>
        <Footer/>
    </>
}