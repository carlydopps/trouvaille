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
import { getTrip, saveTrip } from "../managers/TripManager"
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
    const [stateDestination, updateStateDestination] = useState({
        "city": "",
        "state": "",
        "country": ""
    })
    const [stateExperience, updateStateExperience] = useState({
        "title": "",
        "address": "",
        "websiteUrl": "",
        "experienceTypeId": 0
    })
    const [trip, updateTrip] = useState(
        {
            "title": "",
            "summary": "",
            "styleId": 0,
            "seasonId": 0,
            "durationId": 0,
            "isDraft": false,
            "isUpcoming": false,
            "isPrivate": false,
            "experiences": [],
            "destinations": [],
            "modifiedDate": "",
            "myTrip": false,
            "favorite": false,
            "comments": []
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
                    comments: data.trip_comments
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

    const viewTrip = () => {

        return <section>
            {trip.favorite
                ? <button onClick={() => unfavorite(tripId)}>Unfavorite</button>
                : <button onClick={() => favorite(tripId)}>Favorite</button>
            }
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
            <div>
                {
                    trip.myTrip
                    ? <button onClick={() => setShowTripEdit(true)}>Edit Details</button>
                    : ""
                }
            </div>
        </section>

    }

    const editTrip = () =>{

        return <section>
            <h2>Edit Your Trip</h2>
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
            <button onClick={(event) => handleSave(event, "trip")}>Save</button>
            {
                trip.isDraft
                ? <button onClick={(event) => handleSubmit(event)}>Post</button>
                : ""
            }
            <button onClick={(event) => handleCancel(event, "trip")}>Cancel</button>
        </section>
    }

    const viewDestinations = () => {
        return <section>
            <h5>Destinations</h5>
            <ul>
                {
                    trip.destinations?.map(destination => {
                        {
                            if (showDestinationEdit.show === true && showDestinationEdit.id === destination.id) {
                                return destinationForm()
                            } else {
                                return <li key={`destination--${destination.id}`}>
                                    <p>{destination.city}, {destination.state} {destination.country}</p>
                                    {
                                        trip.myTrip
                                        ? <>
                                            <button onClick={() => {
                                                setShowDestinationEdit({show: true, id: destination.id})
                                                updateStateDestination(destination)
                                            }}>Edit</button>
                                            <button onClick={() => {deleteTripDestination(trip.id, destination.id)
                                                .then(() => renderTrip())
                                            }}>Delete</button>
                                        </>
                                        : ""
                                    }
                                </li>
                            }
                        }}
                    )
                }
            </ul>
        </section>
    }

    const destinationForm = () => {        
        return <form>
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
    }

    const viewExperiences = () => {
        return <section>
            <h5>Experiences</h5>
            <ul>
                {
                    trip.experiences?.map(experience => {
                        {
                            if (showExperienceEdit.show === true && showExperienceEdit.id === experience.id) {
                                return experienceForm()
                            } else {
                                return <li key={`experience--${experience.id}`}>
                                    <p>{experience.title}</p>
                                    <a href={`${experience.website_url}`}>{experience.website_url}</a>
                                    <p>{experience.address}</p>
                                    <p>{experience.experience_type.name}</p>
                                    {
                                        trip.myTrip
                                        ? <>
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
                                            }}>Delete</button>
                                        </>
                                        : ""
                                    }
                                </li>
                            }
                        }}
                    )
                }
            </ul>
        </section>
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

    return <>
        <section>
            {showTripEdit ? editTrip() : viewTrip()}
        </section>
        <section>
            {viewDestinations()}
        </section>
        <section>
            {viewExperiences()}
        </section>
        <section>
            <h4>Comments</h4>
            {trip.comments.map(comment => 
                <div>
                    <img src={comment.traveler.profile_img} alt='Profile image'className='profile-img'></img>
                    <Link to={`/travelers/${comment.traveler.id}`}>{comment.traveler.full_name}</Link>
                    <p>{comment.message}</p>
                </div>
            )}
        </section>
    </>
}