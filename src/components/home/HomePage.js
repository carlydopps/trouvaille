import { useEffect, useState } from "react"
import { getTrips } from "../managers/TripManager"
import { getTravelers } from "../managers/TravelerManager"
import { getDestinations } from "../managers/DestinationManager"
import { Link, useNavigate } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import { ImageCarousel } from "../ImageCarousel"
import "./HomePage.css"
import "../Main.css"

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

    return <main className="home-page">
        <section className="home-content">
            <button onClick={() => navigate('/trips/create')} className="home-btn-create" >Start Planning!</button>
            <section className="home-heading">
                <img src='https://res.cloudinary.com/dupram4w7/image/upload/v1672518306/Trouvaille/coloradovibes_hrvest.jpg'></img>
                <div>
                    <h2>Take the road less traveled</h2>
                    <p>Whether it's stumbling across a hidden back street, a quaint cafe, or connecting with a local, trouvaille describes those magical moments we experience in our journeys.</p>
                    <Link className="home-explore-link">&mdash; Start Exploring  </Link>
                </div>
            </section>
            <section className="home-trips">
                <div>
                    <h2>Adventure</h2>
                    <p>See where other travelers are going and have been - peek at hidden places around the world</p>
                    <div className="home-trip-carousel">
                        <ImageCarousel trips={trips}/>
                    </div>
                </div>
                <img src='https://res.cloudinary.com/dupram4w7/image/upload/v1672525771/Trouvaille/pexels-min-an-1375560_rxfhwd.jpg'></img>
            </section>
            <section className="home-travelers">
                <h2>Travelers</h2>
                <div className="home-card-list">
                    {
                        travelers.slice(0,3).map(traveler => {
                            return <button key={`traveler--${traveler.id}`} onClick={() => localStorage.getItem("auth_token") ? navigate(`/travelers/${traveler.id}`) : navigate(`/login`)}>
                                <img src={traveler.profile_img} alt="Profile Image"/>
                                <p>@{traveler.username}</p>
                            </button>
                        })
                    }
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16" onClick={() => navigate('/travelers')}>
                    <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                </svg>
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
        </section>
    </main>
}