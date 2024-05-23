import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { pages } from "../../utils/pages"
import { staticImages } from "../../utils/staticImages"
import { BackArrow, DeleteIcon, EditIcon, FavoriteIcon, PlusIcon, PostedIcon, TrashIcon, UnfavoriteIcon } from "../../utils/svgs"
import { postComment } from "../managers/CommentManager"
import { createDestination } from "../managers/DestinationManager"
import { getDurations } from "../managers/DurationManager"
import { createExperience, saveExperience } from "../managers/ExperienceManager"
import { getExperienceTypes } from "../managers/ExperienceTypeManager"
import { createFavorite, deleteFavorite } from "../managers/FavoriteManager"
import { getSeasons } from "../managers/SeasonManager"
import { getStyles } from "../managers/StyleManager"
import { getAuthTraveler } from "../managers/TravelerManager"
import { addTripDestination, deleteTripDestination } from "../managers/TripDestinationManager"
import { addTripExperience, deleteTripExperience } from "../managers/TripExperienceManager"
import { deleteTrip, getTrip, saveTrip } from "../managers/TripManager"

const pageName = pages.TRIP

export const Trip = () => {

    const {tripId} = useParams()
    const [styles, setStyles] = useState([])
    const [seasons, setSeasons] = useState([])
    const [durations, setDurations] = useState([])
    const [experienceTypes, setExperienceTypes] = useState([])
    const [authTraveler, setAuthTraveler] = useState({})
    const [comment, updateComment] = useState({})
    const [showTripEdit, setShowTripEdit] = useState(false)
    const [showDestForm, setShowDestForm] = useState(false)
    const [showExperienceEdit, setShowExperienceEdit] = useState({show: false, id: 0, action: ""})
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
        experienceTypeId: 0,
        image: ""
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
            window.scrollTo(0, 0)
            renderTrip()
            getStyles().then(data => setStyles(data))
            getSeasons().then(data => setSeasons(data))
            getDurations().then(data => setDurations(data))
            getExperienceTypes().then(data => setExperienceTypes(data))
            getAuthTraveler().then(data => setAuthTraveler(data))
        },
        []
    )

    const sendTrip = (trip) => {
        saveTrip(trip)
            .then(() => {
                setShowTripEdit(false)
                renderTrip()
            })
    }

    const handleSave = (event, resource) => {
        event.preventDefault()

        if (resource === "trip") {

            const editedTrip = structuredClone(trip)
            editedTrip.isDraft = trip.isDraft
            sendTrip(editedTrip)

        } else if (resource === "destination") {
            
            createDestination(stateDestination)
                .then((newDest) => {
                    let newTripDest = {
                        tripId: tripId,
                        destinationId: newDest.id
                    }
                    addTripDestination(newTripDest)
                    .then(() => {
                        const defaultDestination = {
                            city: "",
                            state: "",
                            country: ""
                        }
                        updateStateDestination(defaultDestination)
                        setShowDestForm(false)
                        renderTrip()
                    })
            })
        } else if (resource.includes("experience")) {

            if (stateExperience.image === "") {
                stateExperience.image = staticImages(pageName, 'defaultExperience')
            }

            if (resource.includes("create")) {
                createExperience(stateExperience)
                    .then((newExp) => {
                        let newTripExp = {
                            tripId: tripId,
                            experienceId: newExp.id
                        }
                        addTripExperience(newTripExp)
                    })
                    .then(() => {
                        let defaultExp = {
                            title: "",
                            address: "",
                            websiteUrl: "",
                            experienceTypeId: 0,
                        }
                        updateStateExperience(defaultExp)
                        setShowExperienceEdit(false)
                        renderTrip()
                    })
            } else if (resource.includes("edit")) {
                saveExperience(stateExperience)
                    .then(() => {
                        setShowExperienceEdit(false)
                        renderTrip()
                    })
            }
        } else if (resource === "comment") {
            let newComment = {
                tripId: tripId,
                travelerId: authTraveler.id,
                message: comment.message
            }
            postComment(newComment).then(() => {
                updateComment({ 
                    message: ""
                })
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
            setShowDestForm(false)
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

    const showExperienceWidget = (event) => {
        
        event.preventDefault()

        let widget = window.cloudinary.createUploadWidget(
        {
            cloudName: "dupram4w7",
            uploadPreset: "huvsusnz"
        },
        (error, result) => {
            if (!error && result && result.event === "success") {
                const copy = {...stateExperience}
                copy.image = result.info.url
                updateStateExperience(copy)
            }})
            widget.open()
    }

    const viewTrip = () => {

        return <>
            <div className="trip-btns">
                {
                    trip.favorite
                    ? <button onClick={() => unfavorite(tripId)} className="icon-btn trip-icon icon-orange"><UnfavoriteIcon/></button>
                    : <button onClick={() => favorite(tripId)} className="icon-btn trip-icon icon-orange"><FavoriteIcon/></button>
                }
                {
                    trip.myTrip
                    ? <>
                        <button onClick={() => setShowTripEdit(true)} className="icon-btn trip-icon icon-orangeBrown"><EditIcon/></button>
                        <button onClick={(event) => {
                            event.preventDefault()
                            deleteTrip(tripId)
                            .then(() => navigate('/my-trips'))
                        }} className="icon-btn trip-icon icon-brown">
                            <TrashIcon/>
                        </button>
                        <button onClick={(event) => handleSubmit(event)} className="icon-btn trip-icon icon-green">{trip.isDraft ? "Post" : <PostedIcon/>}</button>
                    </>
                    : ""
                }
            </div>
            <section className="trip-details-info">
                <div>
                    <h4>{trip.title}</h4>
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

        return <section className="form-trip">
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
                    {
                        trip.isDraft === true
                        ? <fieldset>
                            <label htmlFor="isUpcoming"></label>
                            <input
                                type="checkbox"
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
                        : ""
                    }
                </section>
            </form>
            <button onClick={(event) => handleSave(event, "trip")} className="btn">Save</button>
            <button onClick={(event) => handleCancel(event, "trip")} className="btn">Cancel</button>
        </section>
    }

    const viewDestinations = () => {
        return <>
            <div className="trip-create-heading">
                <h4>Destinations</h4>
                {
                    trip.myTrip
                    ? <button onClick={(event) => setShowDestForm(!showDestForm)} className="btn-add"><PlusIcon/></button>
                    : ""
                }
            </div>
            <section>
                {showDestForm ? destinationForm() : ""}
            </section>
            <section className="card-list cards-destinations">
                {
                    trip.destinations?.map(destination => {
                        {
                            if (showDestForm.show === true && showDestForm.id === destination.id) {
                                return destinationForm()
                            } else {
                                return <div className="destination">
                                <div className="card-destination">
                                    <div className="card-destination-details">
                                        <h4>{destination.city}</h4>
                                        <p>{destination.state}, {destination.country}</p>
                                    </div>
                                </div>
                                {
                                    trip.myTrip
                                    ? <div className="icon-btns-edge destination-icons">
                                        <button onClick={() => {deleteTripDestination(trip.id, destination.id).then(() => renderTrip())}} className="icon-btn-edge destination-icon"><DeleteIcon/></button>
                                    </div>
                                    : ""
                                }
                            </div>
                }}})}
            </section>
        </>
    }

    const destinationForm = () => {        
        return <form className="form-destination">
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
            <button onClick={(event) => handleCancel(event, "destination")} className="btn">Cancel</button>
        </form>
    }

    const viewExperiences = () => {
        return <>
            <div className="trip-create-heading">
                <h4>Experiences</h4>
                {
                    trip.myTrip
                    ? <button onClick={(event) => {
                        setShowExperienceEdit({show: true, id: 0, action: "create"})
                        }} className="btn-add">
                        <PlusIcon/>
                    </button>
                    : ""
                }
            </div>
            <section>
                {showExperienceEdit.show && showExperienceEdit.action ==="create" ? experienceForm("create") : ""}
            </section>
            <section className="card-list cards-experiences">
                {
                    trip.experiences?.map(experience => {
                        {
                            if (showExperienceEdit.show === true && showExperienceEdit.id === experience.id) {
                                return experienceForm("edit")
                            } else {
                                return <div>
                                    {
                                        trip.myTrip
                                        ? <div className="icon-btns-edge">
                                            <button onClick={() => {deleteTripExperience(trip.id, experience.id).then(() => renderTrip())}} className="icon-btn-edge"><DeleteIcon/></button>
                                            <button onClick={() => {
                                                setShowExperienceEdit({show: true, id: experience.id, action: "edit"})

                                                let convertedExp = {
                                                    id: experience.id,
                                                    title: experience.title,
                                                    address: experience.address,
                                                    websiteUrl: experience.website_url,
                                                    experienceTypeId: experience.experience_type.id,
                                                    image: experience.image
                                                }
                                                updateStateExperience(convertedExp)
                                            }} className="icon-btn-edge">
                                                <EditIcon/>
                                            </button>
                                        </div>
                                        : ""
                                    }

                                    <div className="card card-experience">
                                        <img src={experience.image} alt="Experience Image" className="card-img"/>
                                        <div className="card-experience-preview">
                                            <h4>{experience.title}</h4>
                                            <p>{experience.address}</p>
                                            <p>{experience.experience_type.name}</p>
                                            <a href={`${experience.website_url}`} target="_blank">Website</a>
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

    const experienceForm = (action) => {

        return <form className="form-experience">
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
                            className="form-control">Select experience type</option>
                        {
                            experienceTypes.map(expType => <option
                            key={expType.id}
                            value={expType.id}
                            selected={expType.id === stateExperience.experienceTypeId}>
                            {expType.name}</option>)
                        }
                </select>
            </fieldset>
            <div className="upload-thumbnail">
                {
                    stateExperience.image !== "" && action === "create"
                    ? <img src={stateExperience.image} alt="" className="img-upload"/>
                    : ""
                }
                <button onClick={(event) => showExperienceWidget(event)} className="btn btn-upload-thumbnail">{action === "create" ? 'Add photo':'Edit photo'}</button>
            </div>
            {
                action === "create"
                ? <button onClick={(event) => handleSave(event, ["experience", "create"])} className="btn">Add</button>
                : <button onClick={(event) => handleSave(event, ["experience", "edit"])} className="btn">Save</button>
            }
            <button onClick={(event) => handleCancel(event, "experience")} className="btn">Cancel</button>
        </form>
    }

    return <main className="trip-page">
        <section className="trip-heading-btns">
            <button onClick={() => {trip.myTrip ? navigate('/my-trips') : navigate('/trips')}} className="btn-return">
                <BackArrow/>
            </button>
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
            <div className="comment-form">
                <form>
                    <fieldset>
                        <label htmlFor="comment"></label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Comment"
                            value={comment.message}
                            onChange={
                                (event) => {
                                    const copy = {...comment}
                                    copy.message = event.target.value
                                    updateComment(copy)
                                }
                            }
                        />
                    </fieldset>
                </form>
                <button onClick={(event) => handleSave(event, "comment")}className="btn">Post</button>
            </div>
            {trip.tripComments.map(comment => 
                <div className="comment">
                    <img src={comment.traveler.profile_img} alt='Profile image'className='profile-img'></img>
                    <div>
                        <Link to={`/travelers/${comment.traveler.id}`}>{comment.traveler.first_name}</Link>
                        <p>{comment.message}</p>
                    </div>
                </div>
            )}
        </section>
    </main>
}