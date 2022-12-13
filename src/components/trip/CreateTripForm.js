import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { createDestination } from "../managers/DestinationManager"
import { getDurations } from "../managers/DurationManager"
import { createExperience } from "../managers/ExperienceManager"
import { getExperienceTypes } from "../managers/ExperienceTypeManager"
import { getSeasons } from "../managers/SeasonManager"
import { getStyles } from "../managers/StyleManager"
import { addTripDestination, addTripExperience, createTrip } from "../managers/TripManager"

export const CreateTripForm = () => {

    const [styles, setStyles] = useState([])
    const [seasons, setSeasons] = useState([])
    const [durations, setDurations] = useState([])
    const [experienceTypes, setExperienceTypes] = useState([])
    const [tripDestinations, setTripDestinations] = useState([])
    const [tripExperiences, setTripExperiences] = useState([])
    const [displayDestForm, setDisplayDestForm] = useState(false)
    const [displayExpForm, setDisplayExpForm] = useState(false)
    const [destination, updateDestination] = useState({
        "city": "",
        "state": "",
        "country": ""
    })
    const [experience, updateExperience] = useState({
        "title": "",
        "address": "",
        "websiteUrl": "",
        "experienceTypeId": 0
    })
    const [trip, updateTrip] = useState({
        "title": "",
        "summary": "",
        "styleId": 0,
        "seasonId": 0,
        "durationId": 0,
        "isDraft": false,
        "isUpcoming": false,
        "isPrivate": false
    })

    const navigate = useNavigate()

    useEffect(
        () => {
            getStyles()
                .then(data => setStyles(data))
            getSeasons()
                .then(data => setSeasons(data))
            getDurations()
                .then(data => setDurations(data))
            getExperienceTypes()
                .then(data => setExperienceTypes(data))
        },
        []
    )

    const sendTrip = (trip) => {
        createTrip(trip)
            .then((newTrip) => {

                tripDestinations.map(tripDest => {
                    createDestination(tripDest)
                        .then((tripDest) => {
                            let newTripDest = {
                                tripId: newTrip.id,
                                destinationId: tripDest.id
                            }
                            addTripDestination(newTripDest)
                        })
                })

                tripExperiences.map(tripExp => {
                    createExperience(tripExp)
                        .then((tripExp) => {
                            let newTripExp = {
                                tripId: newTrip.id,
                                experienceId: tripExp.id
                            }
                            addTripExperience(newTripExp)
                        })
                })
            })
            .then(() => navigate(`/my-trips`))
    }

    const handleSave = (event, resource) => {
        event.preventDefault()

        if (resource === "trip") {

            let tripDraft = structuredClone(trip)
            tripDraft.isDraft = true
            sendTrip(tripDraft)

        } else if (resource === "destination") {
            
                tripDestinations.push(destination)
                const defaultDestination = {
                    "city": "",
                    "state": "",
                    "country": ""
                }
                updateDestination(defaultDestination)
                setDisplayDestForm(false)

        } else if (resource === "experience") {
                tripExperiences.push(experience)
                const defaultExperience = {
                    "title": "",
                    "address": "",
                    "websiteUrl": "",
                    "experienceTypeId": 0
                }
                updateExperience(defaultExperience)}
                setDisplayExpForm(false)
    } 

    const handleSubmit = (event) => {
        event.preventDefault()

        let tripPost = structuredClone(trip)
        tripPost.isDraft = false
        sendTrip(tripPost)
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
                const copy = {...trip}
                copy.image = result.info.url
                updateTrip(copy)
            }})
            widget.open()
    }

    return <main>
        <h2>Start a New Trip</h2>
        <section>
            <h3>Destinations: </h3>
            {
                tripDestinations.map(tripDest => <p>{tripDest.city}, {tripDest.state} {tripDest.country}</p>)
            }
            <button onClick={(event) => setDisplayDestForm(!displayDestForm)}>Add Destination</button>
            {
                displayDestForm
                ? <form>
                <fieldset>
                    <label htmlFor="city"></label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="City"
                        value={destination.city}
                        onChange={
                            (event) => {
                                const copy = {...destination}
                                copy.city = event.target.value
                                updateDestination(copy)
                            }
                        }
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="state"></label>
                    <input
                        required
                        type="text"
                        className="form-control"
                        placeholder="state"
                        value={destination.state}
                        onChange={
                            (event) => {
                                const copy = {...destination}
                                copy.state = event.target.value
                                updateDestination(copy)
                            }
                        }
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="country"></label>
                    <input
                        required
                        type="text"
                        className="form-control"
                        placeholder="country"
                        value={destination.country}
                        onChange={
                            (event) => {
                                const copy = {...destination}
                                copy.country = event.target.value
                                updateDestination(copy)
                            }
                        }
                    />
                </fieldset>
                <button onClick={(event) => handleSave(event, "destination")}>Save</button>
            </form>
                : ""
            }
        </section>
        <form>
            <fieldset>
                <label htmlFor="title"></label>
                <input
                    required autoFocus
                    type="text"
                    className="form-control"
                    placeholder="Title of the trip"
                    value={trip.title}
                    onChange={
                        (event) => {
                            const copy = {...trip}
                            copy.title = event.target.value
                            updateTrip(copy)
                        }
                    }
                />
            </fieldset>
            <fieldset>
                <label htmlFor="summary"></label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Summary of the trip"
                    value={trip.summary}
                    onChange={
                        (event) => {
                            const copy = {...trip}
                            copy.summary = event.target.value
                            updateTrip(copy)
                        }
                    }
                />
            </fieldset>
            <fieldset>
                <label htmlFor="style"></label>
                <select
                    onChange={
                        (event) => {
                            const copy = {...trip}
                            copy.styleId = parseInt(event.target.value)
                            updateTrip(copy)
                        }
                    }
                    className="form-control">
                        <option value={0}
                            className="form-control">
                            Select style</option>
                        {
                            styles.map(style => <option
                            key={style.id}
                            value={style.id}>
                            {style.name}</option>)
                        }
                </select>
            </fieldset>
            <fieldset>
                <label htmlFor="season"></label>
                <select
                    onChange={
                        (event) => {
                            const copy = {...trip}
                            copy.seasonId = parseInt(event.target.value)
                            updateTrip(copy)
                        }
                    }
                    className="form-control">
                        <option value={0}
                            className="form-control">
                            Select season</option>
                        {
                            seasons.map(season => <option
                            key={season.id}
                            value={season.id}>
                            {season.name}</option>)
                        }
                </select>
            </fieldset>
            <fieldset>
                <label htmlFor="duration"></label>
                <select
                    onChange={
                        (event) => {
                            const copy = {...trip}
                            copy.durationId = parseInt(event.target.value)
                            updateTrip(copy)
                        }
                    }
                    className="form-control">
                        <option value={0}
                            className="form-control">
                            Select duration</option>
                        {
                            durations.map(duration => <option
                            key={duration.id}
                            value={duration.id}>
                            {duration.extent}</option>)
                        }
                </select>
            </fieldset>
            <section>
                {
                    trip.image !== ""
                    ? <img src={trip.image} alt="" className="image-tripForm"/>
                    : ""
                }
                
                <button onClick={(event) => showWidget(event)}
                    className="cloudinary-button">
                    Add photo
                </button>
            </section>
            <section>
                <fieldset>
                    <label htmlFor="isPrivate"></label>
                    <input
                        type="checkbox"
                        className="form-control"
                        name="isPrivate"
                        value={trip.isPrivate}
                        onChange={
                            (event) => {
                                const copy = {...trip}
                                copy.isPrivate = event.target.checked
                                updateTrip(copy)
                            }}/>Private
                </fieldset>
                <fieldset>
                    <label htmlFor="isUpcoming"></label>
                    <input
                        type="checkbox"
                        className="form-control"
                        name="isUpcoming"
                        value={trip.isUpcoming}
                        onChange={
                            (event) => {
                                const copy = {...trip}
                                copy.isUpcoming = event.target.checked
                                updateTrip(copy)
                            }}/>Upcoming Trip
                </fieldset>
            </section>
        </form>
        <section>
            <h3>Experiences: </h3>
            {
                tripExperiences.map(tripExp => {
                    return <div>
                        <p>{tripExp.title}</p>
                        <p>{tripExp.address}</p>
                        <a href={`${tripExp.websiteUrl}`}>{tripExp.websiteUrl}</a>
                    </div>
                })
            }
            <button onClick={(event) => setDisplayExpForm(!displayExpForm)}>Add Experience</button>
            {
                displayExpForm
                ? <form>
                <fieldset>
                    <label htmlFor="title"></label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="title"
                        value={experience.title}
                        onChange={
                            (event) => {
                                const copy = {...experience}
                                copy.title = event.target.value
                                updateExperience(copy)
                            }
                        }
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="address"></label>
                    <input
                        required
                        type="text"
                        className="form-control"
                        placeholder="address"
                        value={experience.address}
                        onChange={
                            (event) => {
                                const copy = {...experience}
                                copy.address = event.target.value
                                updateExperience(copy)
                            }
                        }
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="website"></label>
                    <input
                        required
                        type="text"
                        className="form-control"
                        placeholder="website"
                        value={experience.websiteUrl}
                        onChange={
                            (event) => {
                                const copy = {...experience}
                                copy.websiteUrl = event.target.value
                                updateExperience(copy)
                            }
                        }
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="experienceType"></label>
                    <select
                        onChange={
                            (event) => {
                                const copy = {...experience}
                                copy.experienceTypeId = parseInt(event.target.value)
                                updateExperience(copy)
                            }
                        }
                        className="form-control">
                            <option value={0}
                                className="form-control">
                                Select experience type</option>
                            {
                                experienceTypes.map(expType => <option
                                key={expType.id}
                                value={expType.id}>
                                {expType.name}</option>)
                            }
                    </select>
                </fieldset>
                <button onClick={(event) => handleSave(event, "experience")}>Save</button>
            </form>
                : ""
            }
        </section>
        <button
            onClick={(event) => handleSave(event, "trip")}
            >Save</button>
        <button
            onClick={(event) => handleSubmit(event)}
            >Post</button>
    </main>
    
}