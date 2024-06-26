import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ImageCarousel } from "../ImageCarousel"
import { getDestinations } from "../managers/DestinationManager"
import { getTravelers } from "../managers/TravelerManager"
import { getTrips } from "../managers/TripManager"
import { Footer } from "../footer/Footer"
import { ForwardArrow } from "../../utils/svgs"
import { staticImages } from "../../utils/staticImages"
import { pages } from "../../utils/pages"

const pageName = pages.LANDING

export const LandingPage = () => {
    const [trips, setTrips] = useState([])
    const [travelers, setTravelers] = useState([])
    const [destinations, setDestinations] = useState([])
    const navigate = useNavigate()

    useEffect(
        () => {
            getTrips()
                .then(data => {
                    const public_trips = data.filter(trip => trip.is_draft === false && trip.is_private === false).reverse()
                    setTrips(public_trips)
                })
            getTravelers().then(data => setTravelers(data))
            getDestinations().then(data => setDestinations(data))
        },
        []
    )

    return <>
        <main className="landing-page">
            <div className="content-landing">
                <div className="landing-header">
                    <button onClick={() => navigate(`/home`)}>
                        <img src={staticImages(pageName, 'title')} alt='Trouvaille' className='img-landingTitle'/>
                    </button>
                    <button onClick={() => navigate('/home')} className="forward-arrow">
                        <ForwardArrow/>
                    </button>
                </div>
                <div className="typewriter">
                    <h1>a chance encounter with something wonderful.</h1>
                </div>
            </div>
            <div className="landing-main">
                <section className="landing-content">
                    <section className="landing-heading">
                        <img src={staticImages(pageName, 'section1')} alt='Cover image'/>
                        <div>
                            <h2>Take the road less traveled</h2>
                            <p>Whether it's stumbling across a hidden back street, a quaint cafe, or connecting with a local, trouvaille describes those magical moments we experience in our journeys.</p>
                            <Link to="/home" className="landing-explore-link">&mdash; Start Exploring  </Link>
                        </div>
                    </section>
                    <section className="landing-trips">
                        <div>
                            <h2>Adventure</h2>
                            <p>See where other travelers are going or have been -</p>
                            <div>
                                <ImageCarousel trips={trips}/>
                            </div>
                        </div>
                        <img src={staticImages(pageName, 'section2')} alt='Cover image'/>
                    </section>
                    <section className="landing-travelers">
                        <h2>Travelers</h2>
                        <div className="landing-card-list">
                            {
                                travelers.slice(0,5).map(traveler => {
                                    return <button key={`traveler--${traveler.id}`} onClick={() => localStorage.getItem("auth_token") ? navigate(`/travelers/${traveler.id}`) : navigate(`/login`)}>
                                        <img src={traveler.profile_img} alt="Profile Image"/>
                                    </button>
                                })
                            }
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16" onClick={() => navigate('/travelers')}>
                            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                        </svg>
                    </section>
                </section>
            </div>
        </main>
        <Footer/>
    </>
}