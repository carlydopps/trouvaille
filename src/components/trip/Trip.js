import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { saveDestination } from "../managers/DestinationManager"
import { getDurations } from "../managers/DurationManager"
import { saveExperience } from "../managers/ExperienceManager"
import { getExperienceTypes } from "../managers/ExperienceTypeManager"
import { createFavorite, deleteFavorite } from "../managers/FavoriteManager"
import { getSeasons } from "../managers/SeasonManager"
import { getStyles } from "../managers/StyleManager"
import { deleteTripDestination } from "../managers/TripDestinationManager"
import { deleteTripExperience } from "../managers/TripExperienceManager"
import { deleteTrip, getTrip, saveTrip } from "../managers/TripManager"
import './Trip.css'


export const Trip = () => {

    const {tripId} = useParams()
    const [styles, setStyles] = useState([])
    const [seasons, setSeasons] = useState([])
    const [durations, setDurations] = useState([])
    const [experienceTypes, setExperienceTypes] = useState([])
    const [showTripEdit, setShowTripEdit] = useState(false)
    const [showDestinationEdit, setShowDestinationEdit] = useState({show: false, id: 0})
    const [showExperienceEdit, setShowExperienceEdit] = useState({show: false, id: 0})
    const [image, updateImage] = useState({})
    const [stateDestination, updateStateDestination] = useState({
        city: "",
        state: "",
        country: ""
    })
    const [stateExperience, updateStateExperience] = useState({
        title: "",
        address: "",
        websiteUrl: "",
        experienceTypeId: 0
    })
    const [trip, updateTrip] = useState(
        {
            title: "",
            summary: "",
            coverImg: "",
            styleId: 0,
            seasonId: 0,
            durationId: 0,
            isDraft: false,
            isUpcoming: false,
            isPrivate: false,
            experiences: [],
            destinations: [],
            modifiedDate: "",
            myTrip: false,
            favorite: false,
            tripComments: [],
            tripImages: []
        }
    )

    const navigate = useNavigate()

    const renderTrip = () => {
        getTrip(tripId)
            .then((data) => {
                const convertedTrip = {
                    id: data.id,
                    title: data.title,
                    summary: data.summary,
                    coverImg: data.cover_img,
                    styleId: data.style.id,
                    seasonId: data.season.id,
                    durationId: data.duration.id,
                    isDraft: data.is_draft,
                    isUpcoming: data.is_upcoming,
                    isPrivate: data.is_private,
                    style: data.style,
                    season: data.season,
                    duration: data.duration,
                    experiences: data.experiences,
                    destinations: data.destinations,
                    modifiedDate: data.modified_date,
                    myTrip: data.my_trip,
                    favorite: data.favorite,
                    tripComments: data.trip_comments,
                    tripImages: data.trip_images
                }
                updateTrip(convertedTrip)
            })
    }

    useEffect(
        () => {
            renderTrip()
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
        saveTrip(trip)
            .then(() => {
                setShowTripEdit(false)
            })
    }

    const handleSave = (event, resource) => {
        event.preventDefault()

        if (resource === "trip") {

            const editedTrip = structuredClone(trip)
            editedTrip.isDraft = trip.isDraft
            sendTrip(editedTrip)

        } else if (resource === "destination") {
            
            saveDestination(stateDestination)
                .then(() => {
                    setShowDestinationEdit(false)
                    renderTrip()
            })
        } else if (resource === "experience") {

            saveExperience(stateExperience)
                .then(() => {
                    setShowExperienceEdit(false)
                    renderTrip()
            })
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        const tripPost = structuredClone(trip)
        tripPost.isDraft = false
        sendTrip(tripPost)
    }

    const handleCancel = (event, resource) => {
        event.preventDefault()

        if (resource === "trip") {
            setShowTripEdit(false)
        } else if (resource === "destination") {
            setShowDestinationEdit(false)
        } else if (resource === "experience") {
            setShowExperienceEdit(false)
        }

        renderTrip()
    }

    const favorite = (tripId) => {
        const newFavoriteTrip = {tripId: tripId}
        createFavorite(newFavoriteTrip).then(() => renderTrip())
    }

    const unfavorite = (tripId) => {
        deleteFavorite(tripId).then(() => renderTrip())
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
                copy.profileImg = result.info.url
                updateTrip(copy)
            }})
            widget.open()
    }

    const viewTrip = () => {

        return <>
            <div className="trip-btns">
                {trip.favorite
                    ? <button onClick={() => unfavorite(tripId)} className="icon-btn trip-favorite-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                        </svg>
                    </button>
                    : <button onClick={() => favorite(tripId)} className="icon-btn trip-favorite-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                        </svg>
                    </button>
                }
                {
                    trip.myTrip
                    ? <button onClick={() => setShowTripEdit(true)} className="icon-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                        </svg>
                    </button>
                    : ""
                }
            </div>
            <section className="trip-details-details">
                <div>
                    <p>{trip.title}</p>
                    <p>{trip.summary}</p>
                    <p>Theme: {trip.style?.name}</p>
                    <p>Season: {trip.season?.name}</p>
                    <p>Duration: {trip.duration?.extent}</p>
                    <p>This trip {trip.isUpcoming ? "is upcoming": "has been completed"}</p>
                    <p>Status: {trip.isDraft ? "Draft" : "Posted"}</p>
                    <p>Privacy: {trip.isPrivate ? "Private" : "Public"}</p>
                </div>
            </section>
        </>

    }

    const editTrip = () =>{

        return <section className="trip-details-details">
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
                            required
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
                            }}
                            className="form-control">
                                <option value={trip.style?.id}
                                    className="form-control"></option>
                                {
                                    styles.map(style => <option
                                    key={style.id}
                                    value={style.id}
                                    selected={style.id === trip.styleId}>
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
                                <option value={trip.season?.id}
                                    className="form-control"></option>
                                {
                                    seasons.map(season => <option
                                    key={season.id}
                                    value={season.id}
                                    selected={season.id === trip.seasonId}>
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
                                <option value={trip.duration?.id}
                                    className="form-control"></option>
                                {
                                    durations.map(duration => <option
                                    key={duration.id}
                                    value={duration.id}
                                    selected={duration.id === trip.durationId}>
                                    {duration.extent}</option>)
                                }
                        </select>
                    </fieldset>
                    <section>
                        <fieldset>
                            <label htmlFor="isPrivate"></label>
                            <input
                                type="checkbox"
                                className="form-control"
                                name="isPrivate"
                                value={trip.isPrivate}
                                checked={trip.isPrivate}
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
                                checked={trip.isUpcoming}
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
            <button onClick={(event) => handleSave(event, "trip")} className="btn">Save</button>
            {
                trip.isDraft
                ? <button onClick={(event) => handleSubmit(event)} className="btn">Post</button>
                : ""
            }
            <button onClick={(event) => handleCancel(event, "trip")} className="btn">Cancel</button>
        </section>
    }

    const viewDestinations = () => {
        return <>
            <div className="trip-create-heading">
                <h5>Destinations</h5>
                {/* <button onClick={(event) => setShowDestForm(!showDestForm)} className="btn-add">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                    </svg>
                </button> */}
            </div>
            {/* <section>
                {showDestForm ? addDestinationForm() : ""}
            </section> */}
            <section className="card-list cards-destinations">
                {
                    trip.destinations?.map(destination => {
                        {
                            if (showDestinationEdit.show === true && showDestinationEdit.id === destination.id) {
                                return destinationForm()
                            } else {
                                return <div>
                                    {
                                        trip.myTrip
                                        ? <div className="icon-btns">
                                            <button onClick={() => {
                                                setShowDestinationEdit({show: true, id: destination.id})
                                                updateStateDestination(destination)
                                            }}>Edit</button>
                                            <button onClick={() => {deleteTripDestination(trip.id, destination.id)
                                                .then(() => renderTrip())
                                            }} className="icon-btn">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                                                </svg>
                                            </button>
                                        </div>
                                        : ""
                                    }
                                    <div className="card card-destination">
                                        <img className="card-img"/>
                                        <div className="card-preview">
                                            <h4>{destination.city}</h4>
                                            <p>{destination.city}, {destination.state} {destination.country}</p>
                                        </div>
                                    </div>
                                </div>
                            }
                        }}
                    )
                }
            </section>
        </>
    }

    const destinationForm = () => {        
        return <>
            <form>
                <fieldset>
                    <label htmlFor="city"></label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="City"
                        value={stateDestination.city}
                        onChange={
                            (event) => {
                                const copy = {...stateDestination}
                                copy.city = event.target.value
                                updateStateDestination(copy)
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
                        value={stateDestination.state}
                        onChange={
                            (event) => {
                                const copy = {...stateDestination}
                                copy.state = event.target.value
                                updateStateDestination(copy)
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
                        value={stateDestination.country}
                        onChange={
                            (event) => {
                                const copy = {...stateDestination}
                                copy.country = event.target.value
                                updateStateDestination(copy)
                            }
                        }
                    />
                </fieldset>
                <button onClick={(event) => handleSave(event, "destination")}>Save</button>
                <button onClick={(event) => handleCancel(event, "destination")}>Cancel</button>
            </form>
        </>
    }

    const viewExperiences = () => {
        return <>
            <div className="trip-create-heading">
                <h4>Experiences</h4>
                {/* <button onClick={(event) => setShowExpForm(!showExpForm)} className="btn-add">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                    </svg>
                </button> */}
            </div>
            {/* <section>
                {showExpForm ? addExperienceForm() : ""}
            </section> */}
            <section className="card-list cards-experiences">
                {
                    trip.experiences?.map(experience => {
                        {
                            if (showExperienceEdit.show === true && showExperienceEdit.id === experience.id) {
                                return experienceForm()
                            } else {
                                return <div>
                                    {
                                        trip.myTrip
                                        ? <div className="icon-btns">
                                            <button onClick={() => {
                                                setShowExperienceEdit({show: true, id: experience.id})

                                                let convertedExp = {
                                                    id: experience.id,
                                                    title: experience.title,
                                                    address: experience.address,
                                                    websiteUrl: experience.website_url,
                                                    experienceTypeId: experience.experience_type.id
                                                }
                                                updateStateExperience(convertedExp)
                                            }}>Edit</button>
                                            <button onClick={() => {deleteTripExperience(trip.id, experience.id)
                                                .then(() => renderTrip())
                                            }} className="icon-btn">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                                                </svg>
                                            </button>
                                        </div>
                                        : ""
                                    }

                                    <div className="card card-experience">
                                        <img src={experience.image} alt="Experience Image" className="card-img"/>
                                        <div className="card-preview">
                                            <h4>{experience.title}</h4>
                                            <a href={`${experience.websiteUrl}`}>{experience.websiteUrl}</a>
                                            <p>{experience.address}</p>
                                            <p>{experience.experience_type.name}</p>
                                        </div>
                                    </div>
                                </div>
                            }
                        }}
                    )
                }
            </section>
        </>
    }

    const experienceForm = () => {

        return <form>
            <fieldset>
                <label htmlFor="title"></label>
                <input
                    required autoFocus
                    type="text"
                    className="form-control"
                    placeholder="title"
                    value={stateExperience.title}
                    onChange={
                        (event) => {
                            const copy = {...stateExperience}
                            copy.title = event.target.value
                            updateStateExperience(copy)
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
                    value={stateExperience.address}
                    onChange={
                        (event) => {
                            const copy = {...stateExperience}
                            copy.address = event.target.value
                            updateStateExperience(copy)
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
                    value={stateExperience.websiteUrl}
                    onChange={
                        (event) => {
                            const copy = {...stateExperience}
                            copy.websiteUrl = event.target.value
                            updateStateExperience(copy)
                        }
                    }
                />
            </fieldset>
            <fieldset>
                <label htmlFor="experienceType"></label>
                <select
                    onChange={
                        (event) => {
                            const copy = {...stateExperience}
                            copy.experienceTypeId = parseInt(event.target.value)
                            updateStateExperience(copy)
                        }
                    }
                    className="form-control">
                        <option value={0}
                            className="form-control"></option>
                        {
                            experienceTypes.map(expType => <option
                            key={expType.id}
                            value={expType.id}
                            selected={expType.id === stateExperience.experienceTypeId}>
                            {expType.name}</option>)
                        }
                </select>
            </fieldset>
            <button onClick={(event) => handleSave(event, "experience")}>Save</button>
            <button onClick={(event) => handleCancel(event, "experience")}>Cancel</button>
        </form>
    }

    return <main className="trip-page">
        <section className="trip-heading-btns">
            <button onClick={() => navigate('/my-trips')}>Return to your trips</button>
            {
                trip.isDraft
                ? <button onClick={(event) => handleSubmit(event)}>Post</button>
                : ""
            }
            <button onClick={(event) => {
                event.preventDefault()
                deleteTrip(tripId)
                .then(() => navigate('/my-trips'))
            }}>Delete</button>
        </section>
        <section section className="trip-details">
            <section className="trip-images">
                    <div className="trip-images-grid">
                        {trip.tripImages.map(image => <img src={image.img_url} alt="Trip image" key={`img--${image.id}`} />)}
                    </div>
                    <div className="trip-images-btns">
                        {trip.myTrip ? <button onClick={(event) => showWidget(event)} className="btn add-photo-btn">Add photo</button> : ""}
                    </div>
            </section>
            {showTripEdit ? editTrip() : viewTrip()}
        </section>
        <section className="trip-destinations">
            {viewDestinations()}
        </section>
        <section className="trip-experiences">
            {viewExperiences()}
        </section>
        <section className="trip-comments">
            <h4>Comments</h4>
            {trip.tripComments.map(comment => 
                <div>
                    <img src={comment.traveler.profile_img} alt='Profile image'className='profile-img'></img>
                    <Link to={`/travelers/${comment.traveler.id}`}>{comment.traveler.first_name}</Link>
                    <p>{comment.message}</p>
                </div>
            )}
        </section>
    </main>
}