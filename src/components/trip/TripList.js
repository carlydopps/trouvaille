import { useEffect, useState } from "react"
import { getTrips } from "../managers/TripManager"
import { useNavigate } from "react-router-dom"

export const TripList = () => {

    const [trips, setTrips] = useState([])

    const navigate = useNavigate()

    useEffect(
        () => {
            getTrips()
                .then(data => {
                    const public_trips = data.filter(trip => trip.is_draft === false && trip.is_private === false)
                    setTrips(public_trips)
                })
        },
        []
    )

    return <>
        <h1>Trips</h1>
        <section>
            {
                trips.map(trip => {
                    return <button key={`trip--${trip.id}`} onClick={() => navigate(`/trip/${trip.id}`)}>
                            <h4>{trip.title}</h4>
                            {
                                trip.destinations.map(tripDestination => <p key={`tripDestination--${tripDestination.id}`}>{tripDestination.city}, {tripDestination.state}</p>)
                            }
                            <p>{trip.duration.extent}</p>
                        </button>
                })
            }
        </section>
    </>
}