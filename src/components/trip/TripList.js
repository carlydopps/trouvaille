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

    return <main className="travelers-main">
        <h1>Trips</h1>
        <section className="card-list">
            {
                trips.map(trip => {
                    return <div key={`trip--${trip.id}`}>
                        <div className="icon-btns">
                            {localStorage.getItem("auth_token")
                                    ? trip.favorite
                                        ? <button onClick={() => unfavorite(trip.id)}className="icon-btn">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                                            </svg>
                                        </button>
                                        : <button onClick={() => favorite(trip.id)} className="icon-btn">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                                            </svg>
                                        </button>
                                    : <button className="btn-false"></button>
                            }
                        </div>
                        <button onClick={() => navigate(`/trip/${trip.id}`)} className="card">
                            <img src={trip.cover_img} alt="Cover Image" className="card-img"/>
                            <img src={trip.traveler.profile_img} alt="Profile Image" className="profile-img card-img-profile"/>
                            <div className="card-preview">
                                <h4>{trip.title}</h4>
                                <div className="card-details">
                                    {
                                        trip.destinations?.map(tripDestination => <p key={`tripDestination--${tripDestination.id}`}>{tripDestination.city}, {tripDestination.state}</p>)
                                    }
                                    <p>{trip.duration?.extent}</p>
                                </div>
                            </div>
                        </button>
                    </div>
                })
            }
        </section>
    </main>
}