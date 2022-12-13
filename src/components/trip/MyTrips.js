import { useEffect, useState } from "react"
import { deleteTrip, getMyTrips } from "../managers/TripManager"

export const MyTrips = () => {

    const [trips, setTrips] = useState([])

    const renderTrips = () => {
        getMyTrips()
                .then(data => setTrips(data))
    }
    useEffect(
        () => {
            renderTrips()
        },
        []
    )

    return <>
        <h2>My Trips</h2>
        <ul>
            {
                trips.map(trip => {
                    return <li key={`trip--${trip.id}`}>
                        <div>
                            <p>{trip.title}</p>
                            <p>{trip.summary}</p>
                            <p>Theme: {trip.style.name}</p>
                            <p>Season: {trip.season.name}</p>
                            <p>Duration: {trip.duration.extent}</p>
                            <p>This trip {trip.is_upcoming ? "is upcoming": "has been completed"}</p>
                            <p>Status: {trip.is_draft ? "Draft" : "Posted"}</p>
                            <p>Privacy: {trip.is_private ? "Private" : "Public"}</p>
                        </div>
                        <div>
                            <h5>Destinations</h5>
                            <ul>
                                {
                                    trip.destinations.map(destination => {
                                        return <li key={`destination--${destination.id}`}>
                                            <p>{destination.city}, {destination.state}</p>
                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                        <div>
                            <h5>Experiences</h5>
                                <ul>
                                    {
                                        trip.experiences.map(experience => {
                                            return <li key={`experience--${experience.id}`}>
                                                <p>{experience.title}</p>
                                                <p>{experience.experience_type.name}</p>
                                                <p>{experience.address}</p>
                                                <a>{experience.website_url}</a>
                                            </li>
                                        })
                                    }
                                </ul>
                        </div>
                        <button>Edit</button>
                        <button onClick={(event) => {
                            event.preventDefault()
                            deleteTrip(trip.id)
                                .then(() => renderTrips())
                        }}>Delete</button>
                    </li>
                })
            }
        </ul>
    </>
}