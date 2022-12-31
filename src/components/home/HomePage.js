import { useEffect, useState } from "react"
import { getTrips } from "../managers/TripManager"
import { getTravelers } from "../managers/TravelerManager"
import { getDestinations } from "../managers/DestinationManager"
import "./HomePage.css"
import { useNavigate } from "react-router-dom"

export const HomePage = () => {

    const [trips, setTrips] = useState([])
    const [travelers, setTravelers] = useState([])
    const [destinations, setDestinations] = useState([])

    const navigate = useNavigate()

    useEffect(
        () => {
            getTrips()
                .then(data => {
                    const public_trips = data.filter(trip => trip.is_draft === false && trip.is_private === false)
                    setTrips(public_trips)
                })
            getTravelers()
                .then(data => setTravelers(data))
            getDestinations()
                .then(data => setDestinations(data))
        },
        []
    )

    return <>
        <h1>Trouvaille</h1>
        <section>
            <h2>Trips</h2>
            <button onClick={() => navigate('/trips/create')} >Start Planning!</button>
            {
                trips.map(trip => {
                    return <div key={`trip--${trip.id}`}>
                            <h4>{trip.title}</h4>
                            {
                                trip.destinations.map(tripDestination => <p key={`tripDestination--${tripDestination.id}`}>{tripDestination.city}, {tripDestination.state}</p>)
                            }
                            <p>{trip.duration.extent}</p>
                        </div>
                })
            }
        </section>
        <section>
            <h2>Travelers</h2>
            {
                travelers.map(traveler => {
                    return <div key={`traveler--${traveler.id}`}>
                            <img src={traveler.profile_img} alt="Profile Image" className="profile-image"/>
                            <h4>{traveler.full_name}</h4>
                                <p>@{traveler.username}</p>
                        </div>
                })
            }
        </section>
        <section>
            <h2>Destinations</h2>
            {
                destinations.map(destination => {
                    return <div key={`destination--${destination.id}`}>
                            <h4>{destination.city}</h4>
                                <p>{destination.state}, {destination.country}</p>
                        </div>
                })
            }
        </section>
    </>

}