import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { createDestination } from "../managers/DestinationManager"
import { getDurations } from "../managers/DurationManager"
import { createExperience } from "../managers/ExperienceManager"
import { getExperienceTypes } from "../managers/ExperienceTypeManager"
import { getSeasons } from "../managers/SeasonManager"
import { getStyles } from "../managers/StyleManager"
import { addTripDestination } from "../managers/TripDestinationManager"
import { addTripExperience } from "../managers/TripExperienceManager"
import { createTrip } from "../managers/TripManager"
import './CreateTripForm.css'

export const CreateTripForm = () => {

    const [styles, setStyles] = useState([])
    const [seasons, setSeasons] = useState([])
    const [durations, setDurations] = useState([])
    const [experienceTypes, setExperienceTypes] = useState([])
    const [tripDestinations, setTripDestinations] = useState([])
    const [tripExperiences, setTripExperiences] = useState([])
    const [images, updateImages] = useState([])
    const [showDestForm, setShowDestForm] = useState(false)
    const [showExpForm, setShowExpForm] = useState(false)
    const [destination, updateDestination] = useState({
        city: "",
        state: "",
        country: ""
    })
    const [experience, updateExperience] = useState({
        title: "",
        address: "",
        websiteUrl: "",
        experienceTypeId: 0,
        image: ""
    })
    const [trip, updateTrip] = useState({
        title: "",
        summary: "",
        styleId: 0,
        seasonId: 0,
        durationId: 0,
        isDraft: false,
        isUpcoming: false,
        isPrivate: false,
        profileImg: ""
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
                        .then((newDest) => {
                            let newTripDest = {
                                tripId: newTrip.id,
                                destinationId: newDest.id
                            }
                            addTripDestination(newTripDest)
                        })
                })

                tripExperiences.map(tripExp => {
                    createExperience(tripExp)
                        .then((newExp) => {
                            let newTripExp = {
                                tripId: newTrip.id,
                                experienceId: newExp.id
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
                    city: "",
                    state: "",
                    country: ""
                }
                updateDestination(defaultDestination)
                setShowDestForm(false)

        } else if (resource === "experience") {
                tripExperiences.push(experience)
                const defaultExperience = {
                    title: "",
                    address: "",
                    websiteUrl: "",
                    experienceTypeId: 0,
                    image: ""
                }
                updateExperience(defaultExperience)}
                setShowExpForm(false)
    } 

    const handleSubmit = (event) => {
        event.preventDefault()

        let tripPost = structuredClone(trip)
        tripPost.isDraft = false
        sendTrip(tripPost)
    }

    const showTripWidget = (event) => {
        
        event.preventDefault()

        let widget = window.cloudinary.createUploadWidget(
        {
            cloudName: "dupram4w7",
            uploadPreset: "huvsusnz"
        },
        (error, result) => {
            if (!error && result && result.event === "success") {
                const copy = {...trip}
                copy.profileImg = result.info.url
                updateTrip(copy)
            }})
            widget.open()
    }

    const showExperienceWidget = (event) => {
        
        event.preventDefault()

        let widget = window.cloudinary.createUploadWidget(
        {
            cloudName: "dupram4w7",
            uploadPreset: "huvsusnz"
        },
        (error, result) => {
            if (!error && result && result.event === "success") {
                const copy = {...experience}
                copy.image = result.info.url
                updateExperience(copy)
            }})
            widget.open()
    }

    const addDestinationForm = () => {
        return <form>
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
    }

    const addExperienceForm = () => {
        return <form>
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
            <button onClick={(event) => showExperienceWidget(event)} className="cloudinary-button">Add photo</button>
            <button onClick={(event) => handleSave(event, "experience")}>Save</button>
        </form>
    }

    return <main className="page-trip-create">
        <h2>Start a New Trip</h2>
        <section className="trip-create-details">
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
                    <button onClick={(event) => showTripWidget(event)} className="cloudinary-button">Add photo</button>
                </section>
                <section>
                    <fieldset>
                        <label htmlFor="isPrivate"></label>
                        <input
                            type="checkbox"
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
        </section>
        <section className="trip-create-destinations">
            <div className="trip-create-heading">
                <h3>Destinations: </h3>
                <button onClick={(event) => setShowDestForm(!showDestForm)} className="btn-add">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                    </svg>
                </button>
            </div>
            <section>
                {showDestForm ? addDestinationForm() : ""}
            </section>
            <section className="card-list cards-destinations">
                {
                    tripDestinations.map(tripDest => {
                        return <div>
                            <div className="icon-btns">
                                <button onClick={() => {
                                        let index = tripDestinations.indexOf(tripDest)
                                        const copy = [...tripDestinations]
                                        copy.splice(index, 1)
                                        setTripDestinations(copy)
                                    }} className="icon-btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                                    </svg>
                                </button>
                            </div>
                            <div className="card card-destination">
                                <img className="card-img"/>
                                <div className="card-preview">
                                    <h4>{tripDest.city}</h4>
                                    <p>{tripDest.city}, {tripDest.state} {tripDest.country}</p>
                                </div>
                            </div>
                        </div>
                    })
                }
            </section>
        </section>
        <section className="trip-create-experiences">
            <div className="trip-create-heading">
                <h4>Experiences: </h4>
                <button onClick={(event) => setShowExpForm(!showExpForm)} className="btn-add">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                    </svg>
                </button>
            </div>
            <section>
                {showExpForm ? addExperienceForm() : ""}
            </section>
            <section className="card-list cards-experiences">
                {
                    tripExperiences.map(tripExp => {
                        return <div>
                            <div className="icon-btns">
                                <button onClick={() => {
                                        let index = tripExperiences.indexOf(tripExp)
                                        const copy = [...tripExperiences]
                                        copy.splice(index, 1)
                                        setTripExperiences(copy)
                                    }} className="icon-btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                                    </svg>
                                </button>
                            </div>
                            <div className="card card-experience">
                                <img src={tripExp.image} alt="Experience Image" className="card-img"/>
                                <div className="card-preview">
                                    <h4>{tripExp.title}</h4>
                                    <a href={`${tripExp.websiteUrl}`}>{tripExp.websiteUrl}</a>
                                    <p>{tripExp.address}</p>
                                </div>
                            </div>
                        </div>
                    })
                }
            </section>
        </section>
        <div className="trip-create-btns">
            <button
                onClick={(event) => handleSave(event, "trip")} className="btn"
                >Save</button>
            <button
                onClick={(event) => handleSubmit(event)} className="btn"
                >Post</button>
        </div>
    </main>
    
}