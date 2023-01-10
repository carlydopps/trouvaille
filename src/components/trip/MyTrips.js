import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { DeleteIcon, DraftIcon, PastIcon, PostedIcon, PrivateIcon, PublicIcon, UpcomingIcon } from "../icons/Icons"
import { getAuthTraveler } from "../managers/TravelerManager"
import { deleteTrip, getMyTrips } from "../managers/TripManager"
import "./MyTrips.css"

export const MyTrips = () => {

    const [trips, setTrips] = useState([])
    const [status, updateStatus] = useState({})
    const [textColors, updateTextColors] = useState({})
    const [filteredTrips, updateFilteredTrips] = useState([])
    const [authUser, setAuthUser] = useState({})
    const navigate = useNavigate()

    const renderTrips = () => {
        getMyTrips().then(data => setTrips(data))
    }
    useEffect(
        () => {
            window.scrollTo(0, 0)
            getAuthTraveler().then(data => setAuthUser(data))
            renderTrips()
        },
        []
    )

    useEffect(
        () => {
            updateFilteredTrips(trips)
        }, [trips]
    )

    useEffect(
        () => {
            if (status === {}) {
                updateFilteredTrips(trips)
            } else {
                let selectedTrips = [...trips]
                let copy = {...textColors}

                if ("isDraft" in status) {
                    selectedTrips = selectedTrips.filter(trip => trip.is_draft === status.isDraft)

                    if (status.isDraft === true) {
                        copy["draft"] = "#ff9659"
                        copy["post"] = "rgb(103, 103, 103)"
                    } else {
                        copy["post"] = "#ff9659"
                        copy["draft"] = "rgb(103, 103, 103)"
                    }
                } else {
                    copy["draft"] = "rgb(103, 103, 103)"
                    copy["post"] = "rgb(103, 103, 103)"
                }

                if ("isPrivate" in status) {
                    selectedTrips = selectedTrips.filter(trip => trip.is_private === status.isPrivate)

                    if (status.isPrivate === true) {
                        copy["private"] = "#ff9659"
                        copy["public"] = "rgb(103, 103, 103)"
                    } else {
                        copy["public"] = "#ff9659"
                        copy["private"] = "rgb(103, 103, 103)"
                    }
                } else {
                    copy["private"] = "rgb(103, 103, 103)"
                    copy["public"] = "rgb(103, 103, 103)"
                }

                if ("isUpcoming" in status) {
                    selectedTrips = selectedTrips.filter(trip => trip.is_upcoming === status.isUpcoming)

                    if (status.isUpcoming === true) {
                        copy["upcoming"] = "#ff9659"
                        copy["past"] = "rgb(103, 103, 103)"
                    } else {
                        copy["past"] = "#ff9659"
                        copy["upcoming"] = "rgb(103, 103, 103)"
                    }
                } else {
                    copy["upcoming"] = "rgb(103, 103, 103)"
                    copy["past"] = "rgb(103, 103, 103)"
                }

                updateFilteredTrips(selectedTrips)
                updateTextColors(copy)
            }
        }, [status]
    )

    const updateStatusState = (property, value) => {
        if (property === "all") {
            updateStatus({})
        } else {
            const copy = {...status}
            if (property in copy && copy[property] === value) {
                delete copy[property]
            } else {
                copy[property] = value
            }
            updateStatus(copy)
        }
    }

    return <main className="page-my-trips">
        <div className="heading-my-trips">
            <div className="heading-my-trips-details">
                <h2>{authUser.first_name}'s Trips</h2>
            </div>
            <img src="https://res.cloudinary.com/dupram4w7/image/upload/v1673122930/Trouvaille/pexels-roman-odintsov-4553618_fbttpw.jpg" alt=""/>
        </div>
        <div className="body-my-trips">
            <aside className="my-trips-filters">
                <section>
                    <div className="filter-btns-left">
                        <button onClick={() => updateStatusState("isDraft", false)} style={{color: textColors["post"]}}>Posts</button>
                        <button onClick={() => updateStatusState("isPrivate", false)} style={{color: textColors["public"]}}>Public</button>
                        <button onClick={() => updateStatusState("isUpcoming", false)} style={{color: textColors["past"]}}>Past</button>
                    </div>
                    <div className="filter-btns-right">
                        <button onClick={() => updateStatusState("isDraft", true)} style={{color: textColors["draft"]}}>Drafts</button>
                        <button onClick={() => updateStatusState("isPrivate", true)} style={{color: textColors["private"]}}>Private</button>
                        <button onClick={() => updateStatusState("isUpcoming", true)} style={{color: textColors["upcoming"]}}>Upcoming</button>
                    </div>
                </section>
                <button onClick={() => updateStatusState("all", true)}><DeleteIcon/> Clear all</button>
            </aside>
            <section className="my-trips-grid">
                {
                    filteredTrips.map(trip => {
                        return <div key={`trip--${trip.id}`}>
                            <div className="icon-btns-edge icon-btns-edge-my-trips">
                                <button onClick={(event) => {
                                    event.preventDefault()
                                    deleteTrip(trip.id).then(() => renderTrips())
                                }} className="icon-btn-edge icon-btn-edge-my-trips">
                                    <DeleteIcon/>
                                </button>
                            </div>
                            <button onClick={() => navigate(`/trip/${trip.id}`)} style={{backgroundImage: `url(${trip.cover_img})`}}>
                            </button>
                            <div className="my-trips-details">
                                <div className="trip-status-icons">
                                        <div className="icon-upcoming">{trip.is_upcoming ? <UpcomingIcon/> : <PastIcon/>}</div>
                                        <div className="icon-draft">{trip.is_draft ? <DraftIcon/> : <PostedIcon/>}</div>
                                        <div className="icon-private">{trip.is_private ? <PrivateIcon/> : <PublicIcon/>}</div>
                                </div>
                                <h3 className="my-trips-trip-title">{trip.title}</h3>
                            </div>
                        </div>
                    })
                }
            </section>
        </div>
    </main>
}