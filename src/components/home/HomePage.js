import { useEffect, useState } from "react"
import { getTrips } from "../managers/TripManager"
import { getTravelers } from "../managers/TravelerManager"
import { getDestinations } from "../managers/DestinationManager"
import "./HomePage.css"
import { Link, useNavigate } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import { ImageCarousel } from "../ImageCarousel"

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
        {/* <button onClick={() => navigate('/trips/create')} >Start Planning!</button> */}
        <section className="home-content">
            <section className="home-heading">
                <img src='https://res.cloudinary.com/dupram4w7/image/upload/v1672518306/Trouvaille/coloradovibes_hrvest.jpg'></img>
                <div>
                    <h2>Take the road less traveled</h2>
                    <p>Whether it's stumbling across a hidden back street, a quaint cafe, or connecting with a local, trouvaille describes those magical moments we experience in our journeys.</p>
                    <a className="home-explore-link">&mdash; Start Exploring  </a>
                </div>
            </section>
            <section className="home-trips">
                <div>
                    <h2>Adventure</h2>
                    <p>See where other travelers are going and have been - peek at hidden places around the world</p>
                </div>
                <img src='https://res.cloudinary.com/dupram4w7/image/upload/v1672525771/Trouvaille/pexels-min-an-1375560_rxfhwd.jpg'></img>
                <ul>
                    <ImageCarousel trips={trips}/>
                </ul>
            </section>
            <section>
                <h2>Travelers</h2>
                {
                    travelers.map(traveler => {
                        return <div key={`traveler--${traveler.id}`}>
                                <img src={traveler.profile_img} alt="Profile Image" className="profile-image"/>
                                <h4>{traveler.full_name}</h4>
                                {localStorage.getItem("auth_token")
                                    ? <Link to={`/travelers/${traveler.id}`}>@{traveler.username}</Link>
                                    : <Link to={`/login`}>@{traveler.username}</Link>
                                }
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
        </section>
    </main>
}