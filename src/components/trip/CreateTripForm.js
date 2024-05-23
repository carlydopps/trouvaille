import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { pages } from "../../utils/pages"
import { staticImages } from "../../utils/staticImages"
import { DeleteIcon } from "../../utils/svgs"
import { createDestination } from "../managers/DestinationManager"
import { getDurations } from "../managers/DurationManager"
import { createExperience } from "../managers/ExperienceManager"
import { getExperienceTypes } from "../managers/ExperienceTypeManager"
import { createImage } from "../managers/ImageManager"
import { getSeasons } from "../managers/SeasonManager"
import { getStyles } from "../managers/StyleManager"
import { addTripDestination } from "../managers/TripDestinationManager"
import { addTripExperience } from "../managers/TripExperienceManager"
import { createTrip } from "../managers/TripManager"

const pageName = pages.TRIP_FORM

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
        coverImg: ""
    })

    const navigate = useNavigate()

    useEffect(
        () => {
            window.scrollTo(0, 0)
            getStyles().then(data => setStyles(data))
            getSeasons().then(data => setSeasons(data))
            getDurations().then(data => setDurations(data))
            getExperienceTypes().then(data => setExperienceTypes(data))
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

                images.map(image => {
                    let newImg = {
                        imgUrl: image.imgUrl,
                        tripId: newTrip.id,
                        order: image.order
                    }
                    createImage(newImg)
                })
            })
            .then(() => navigate(`/my-trips`))
    }

    const handleSave = (event, resource) => {
        event.preventDefault()

        if (resource === "trip") {

            let tripDraft = structuredClone(trip)
            tripDraft.isDraft = true
            if (tripDraft.coverImg === "") {
                tripDraft.coverImg = staticImages(pageName, 'defaultCover')
            }
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
            if (experience.image === "") {
                experience.image = staticImages(pageName, 'defaultExperience')
            }

            tripExperiences.push(experience)
            const defaultExperience = {
                title: "",
                address: "",
                websiteUrl: "",
                experienceTypeId: 0,
                image: ""
            }
            updateExperience(defaultExperience)
            setShowExpForm(false)
        }
    } 

    const handleSubmit = (event) => {
        event.preventDefault()

        let tripPost = structuredClone(trip)
        tripPost.isDraft = false
        if (tripPost.coverImg === "") {
            tripPost.coverImg = staticImages(pageName, 'defaultCover')
        }
        sendTrip(tripPost)
    }

    const handleCancel = (event, resource) => {
        event.preventDefault()

        if (resource === "destination") {
            setShowDestForm(false)
        } else if (resource === "experience") {
            setShowExpForm(false)
        }
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
                copy.coverImg = result.info.url
                updateTrip(copy)
            }})
            widget.open()
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
                const copy = [...images]
                let order = 1
                if (copy.length !== 0){
                    order = (copy.slice(-1)[0].order) + 1
                }
                copy.push({imgUrl: result.info.url, order: order})
                updateImages(copy)
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
            <button onClick={(event) => handleSave(event, "destination")} className="btn">Save</button>
            <button onClick={(event) => handleCancel(event, "destination")} className="btn">Cancel</button>
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
            {
                experience.image !== ""
                ? <img src={experience.image} alt="" className="image-tripForm img-upload"/>
                : ""
            }
            <div className="btns-experience-form">
                <button onClick={(event) => showExperienceWidget(event)} className="btn btn-upload-thumbnail">Add photo</button>
                <div >
                    <button onClick={(event) => handleSave(event, "experience")} className="btn">Save</button>
                    <button onClick={(event) => handleCancel(event, "experience")} className="btn">Cancel</button>
                </div>
            </div>
        </form>
    }

    return <div className="trip-create-container">
    <main className="page-trip-create">
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
                                }}/> Private
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
                                }}/> Upcoming Trip
                    </fieldset>
                </section>
                <section className="upload-thumbnail">
                    {
                        trip.coverImg !== ""
                        ? <img src={trip.coverImg} alt="" className="img-upload"/>
                        : ""
                    }
                    <button onClick={(event) => showTripWidget(event)} className="btn btn-green">Add thumbnail</button>
                </section>
            </form>
        </section>
        <section className="trip-create-destinations">
            <div className="trip-create-heading">
                <h4>Destinations</h4>
                <button onClick={(event) => setShowDestForm(!showDestForm)} className="btn-add">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                    </svg>
                </button>
            </div>
            <section>
                {
                    showDestForm ? addDestinationForm() : ""
                }
            </section>
            <section className="card-list cards-destinations">
                {
                    tripDestinations.map(tripDest => {
                        return <div className="destination">
                            <div className="card-destination">
                                <div className="card-destination-details">
                                    <h4>{tripDest.city}</h4>
                                    <p>{tripDest.state}, {tripDest.country}</p>
                                </div>
                            </div>
                            <div className="icon-btns-edge destination-icons">
                                <button onClick={() => {
                                        let index = tripDestinations.indexOf(tripDest)
                                        const copy = [...tripDestinations]
                                        copy.splice(index, 1)
                                        setTripDestinations(copy)
                                    }} className="icon-btn-edge destination-icon">
                                    <DeleteIcon/>
                                </button>
                            </div>
                        </div>
                    })
                }
            </section>
        </section>
        <section className="trip-create-experiences">
            <div className="trip-create-heading">
                <h4>Experiences</h4>
                <button onClick={(event) => setShowExpForm(!showExpForm)} className="btn-add">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                    </svg>
                </button>
            </div>
            <section>
                {
                    showExpForm ? addExperienceForm() : ""
                }
            </section>
            <section className="card-list cards-experiences">
                {
                    tripExperiences.map(tripExp => {
                        return <div>
                            <div className="icon-btns-edge-single">
                                <button onClick={() => {
                                        let index = tripExperiences.indexOf(tripExp)
                                        const copy = [...tripExperiences]
                                        copy.splice(index, 1)
                                        setTripExperiences(copy)
                                    }} className="icon-btn-edge">
                                        <DeleteIcon/>
                                </button>
                            </div>
                            <div className="card card-experience">
                                <img src={tripExp.image} alt="Experience Image" className="card-img"/>
                                <div className="card-experience-preview">
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
        <section className="trip-images">
            <div className="trip-images-heading">
                <h4>Images</h4>
                <button onClick={(event) => showWidget(event)} className="btn-add"> 
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                    </svg>
                </button>
            </div>
            <div className="trip-create-images-grid">
                {
                    images !== []
                    ? images.map(image => <img src={image.imgUrl} className="" alt="Trip image" key={`img--${image.imgUrl}`} />)
                    : ""
                }
            </div>
        </section>
        <div className="trip-create-btns">
            <button onClick={(event) => handleSave(event, "trip")} className="btn">Save</button>
            <button onClick={(event) => handleSubmit(event)} className="btn">Post</button>
        </div>
    </main>
</div>
}