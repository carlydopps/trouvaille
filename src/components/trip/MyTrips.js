import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { pages } from "../../utils/pages"
import { DeleteIcon, DraftIcon, PastIcon, PostedIcon, PrivateIcon, PublicIcon, UpcomingIcon } from "../../utils/svgs"
import { getAuthTraveler } from "../managers/TravelerManager"
import { deleteTrip, getMyTrips } from "../managers/TripManager"

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

    const setTextColor = (copy, property, defaultFilter, secondaryFilter) => {

        const orange = "#ff9659"
        const gray = "rgb(103, 103, 103)"

        if (status[property] === true) {
            copy[defaultFilter] = orange
            copy[secondaryFilter] = gray
        } else {
            copy[secondaryFilter] = orange
            copy[defaultFilter] = gray
        }

        return copy
    }

    useEffect(
        () => {
            if (status === {}) {
                updateFilteredTrips(trips)
            } else {
                let selectedTrips = [...trips]
                let copy = {...textColors}
                const gray = "rgb(103, 103, 103)"
                const properties = [
                    {
                        pyProperty: "is_draft",
                        jsProperty: "isDraft",
                        defaultFilter: "draft",
                        secondaryFilter: "post"
                    },
                    {
                        pyProperty: "is_private",
                        jsProperty: "isPrivate",
                        defaultFilter: "private",
                        secondaryFilter: "public"
                    },
                    {
                        pyProperty: "is_upcoming",
                        jsProperty: "isUpcoming",
                        defaultFilter: "upcoming",
                        secondaryFilter: "past"
                    }
                ]

                for (const i of properties) {
                    if (i.jsProperty in status) {
                        selectedTrips = selectedTrips.filter(trip => trip[i.pyProperty] === status[i.jsProperty])
                        copy = setTextColor(copy, i.jsProperty, i.defaultFilter, i.secondaryFilter)
                    } else {
                        copy[i.defaultFilter] = gray
                        copy[i.secondaryFilter] = gray
                    }
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
            <div className="heading-my-trips-title">
                <h2>{authUser.first_name}'s Trips</h2>
            </div>
        </div>
        <div className="body-my-trips">
            <section className="my-trips-filters">
                <h4>Filter</h4>
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
                <button onClick={() => updateStatusState("all", true)} className='btn-clear'><DeleteIcon/> Clear all</button>
            </section>
            <section className="my-trips-grid">
                {
                    filteredTrips.map(trip => {
                        return <div className='card__myTrip' key={`trip--${trip.id}`}>
                            <div className="icon-btns-edge-my-trips">
                                <button onClick={(event) => {
                                    event.preventDefault()
                                    deleteTrip(trip.id).then(() => renderTrips())
                                }} className="icon-btn-edge">
                                    <DeleteIcon/>
                                </button>
                            </div>
                            <button onClick={() => navigate(`/trip/${trip.id}`)} className='card--image' style={{backgroundImage: `url(${trip.cover_img})`}}>
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