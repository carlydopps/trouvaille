import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getAuthTraveler, saveTraveler } from "../managers/TravelerManager"
import "./Account.css"

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
        getAuthTraveler(travelerId)
            .then(data => {

                let traveler = {}
                let name = data.full_name.split(" ")
                const lastName = name.pop()
                const firstName = name.join(" ")

                traveler.firstName = firstName
                traveler.lastName = lastName
                traveler.username = data.username
                traveler.bio = data.bio
                traveler.profileImg = data.profile_image_url

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

        return <>
            <section>
                <h4>Personal Information</h4>
                <div>
                    <p>First Name: {traveler.firstName}</p>
                    <p>Last Name: {traveler.lastName}</p>
                    <p>Username: {traveler.username}</p>
                    <p>Bio: {traveler.bio}</p>
                </div>
                <button onClick={() => updateClickStatus(true)}>Edit Profile</button>
            </section>
        </>
    }

    const editDetails = () => {
        return <section className="body-contact">
        <form>
        <h4>Edit Profile Information</h4>
        <button onClick={(event) => showWidget(event)}>
                    Update photo
        </button>
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
        <button 
            onClick={(event) => handleSave(event)}>
            Save
        </button>
        <button 
            onClick={(event) => handleCancel(event)}>
            Cancel
        </button>
    </form>
    </section>
    }


    return <>
        <main>
            <img src={traveler.profileImg} className="profile-image"/>
            <section>
                <h1>Hi, {traveler.firstName}!</h1>
                {
                    clickStatus
                    ? editDetails()
                    : defaultDisplay()
                }
            </section>
        </main>
    </>    
}