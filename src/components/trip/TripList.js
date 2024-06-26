import { useEffect, useState } from "react"
import { getTrips } from "../managers/TripManager"
import { useNavigate } from "react-router-dom"
import { createFavorite, deleteFavorite } from "../managers/FavoriteManager"
import { FavoriteIcon, UnfavoriteIcon } from "../../utils/svgs"
import { pages } from "../../utils/pages"
import { staticImages } from "../../utils/staticImages"

const pageName = pages.TRIPS

export const TripList = () => {

    const [trips, setTrips] = useState([])

    const navigate = useNavigate()

    const renderTrips = () => {
        getTrips()
            .then(data => {
                const public_trips = data.filter(trip => trip.is_draft === false && trip.is_private === false)
                setTrips(public_trips)
        })
    }

    useEffect(
        () => {
            window.scrollTo(0, 0)
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

    return <main className="page-trips">
        <div className="heading-trips">
            <div className="heading-trips-details">
                <h2>Find your next</h2>
                <h3>adventure.</h3>
            </div>
            <img src={staticImages(pageName, 'header')} alt="Cover image"/>
        </div>
        <div className="trips-list">
            <button onClick={() => navigate('/trips/create')} className="trips-btn-create" >Plan your own Adventure</button>
            <section className="card-list card-list-trips">
                {
                    trips.map(trip => {
                        return <div key={`trip--${trip.id}`}>
                            <div className="icon-btns">
                                {localStorage.getItem("auth_token")
                                        ? trip.favorite
                                            ? <button onClick={() => unfavorite(trip.id)}className="icon-btn"><UnfavoriteIcon/></button>
                                            : <button onClick={() => favorite(trip.id)} className="icon-btn"><FavoriteIcon/></button>
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
        </div>
    </main>
}