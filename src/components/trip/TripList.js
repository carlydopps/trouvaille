import { useEffect, useState } from "react"
import { getTrips, getTripsWithAuth } from "../managers/TripManager"
import { useNavigate } from "react-router-dom"
import { createFavorite, deleteFavorite } from "../managers/FavoriteManager"

export const TripList = () => {

    const [trips, setTrips] = useState([])

    const navigate = useNavigate()

    const renderTrips = () => {
        if (localStorage.getItem("auth_token")) {
            getTripsWithAuth()
                .then(data => {
                    const public_trips = data.filter(trip => trip.is_draft === false && trip.is_private === false)
                    setTrips(public_trips)
            })
        } else {
            getTrips()
                .then(data => {
                    const public_trips = data.filter(trip => trip.is_draft === false && trip.is_private === false)
                    setTrips(public_trips)
                })
        }
    }

    useEffect(
        () => {
            renderTrips()
        },
        []
    )

    const favorite = (tripId) => {
        const newFavoriteTrip = {tripId: tripId}
        createFavorite(newFavoriteTrip).then(() => renderTrips())
    }

    const unfavorite = (tripId) => {
        deleteFavorite(tripId).then(() => renderTrips())
    }

    return <>
        <h1>Trips</h1>
        <ul>
            {
                trips.map(trip => {
                    return <li key={`trip--${trip.id}`}>
                        {localStorage.getItem("auth_token")
                                ? trip.favorite
                                    ? <button onClick={() => unfavorite(trip.id)}>Unfavorite</button>
                                    : <button onClick={() => favorite(trip.id)}>Favorite</button>
                                : ""
                        }
                        <button onClick={() => navigate(`/trip/${trip.id}`)}>
                            <h4>{trip.title}</h4>
                            {
                                trip.destinations?.map(tripDestination => <p key={`tripDestination--${tripDestination.id}`}>{tripDestination.city}, {tripDestination.state}</p>)
                            }
                            <p>{trip.duration?.extent}</p>
                        </button>
                    </li>
                })
            }
        </ul>
    </>
}