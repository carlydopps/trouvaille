import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ImageCarousel } from "../ImageCarousel"
import { getDestinations } from "../managers/DestinationManager"
import { getTravelers } from "../managers/TravelerManager"
import { getTrips } from "../managers/TripManager"
import './LandingPage.css'

export const LandingPage = () => {

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
        <main className="landing-page">
            <div className="background-landing">
                <div className="overlay"></div>
                {/* <img src='https://res.cloudinary.com/dupram4w7/image/upload/v1672612283/Trouvaille/Untitled_design_13_j4bsrk.png' alt='Two people jumping off of a dock' className='img-landing'/> */}
            </div>
            <div className="content-landing">
                <div className="landing-header">
                    <img src='https://res.cloudinary.com/dupram4w7/image/upload/v1672372171/Trouvaille/Trouvaille_700_300_px_vly6tj.png' alt='Trouvaille' className='img-landingTitle'/>
                </div>
                <div className="typewriter">
                    <h1>a chance encounter with something wonderful.</h1>
                </div>
                {/* <p className='landing-summary'>Whether it's stumbling across a hidden back street,<br/>a quaint cafe, or connecting with a local,<br/>
trouvaille describes those magical moments <br/>we experience in our journeys.</p> */}
                {/* <button onClick={() => navigate("/home")} className="btn-explore">Explore</button> */}
            </div>
            <div className="home-page">
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
            </div>
        </main>
        {/* <footer className="footer-landing">
            <img src='https://res.cloudinary.com/dupram4w7/image/upload/v1672460293/Trouvaille/Trouvaille_1_rxks06.png' alt="Home" className="img-footer"></img>
        </footer> */}
    </>
}

// export const LandingPage = () => {

//     const navigate = useNavigate()

//     return <>
//         <main>
//             <div className="background-landing">
//                 <div className="overlay"></div>
//                 <img src='https://res.cloudinary.com/dupram4w7/image/upload/v1672375478/Trouvaille/Jake_Kaylee___Travel_Couple_on_Instagram__CLOSED__WINNER_IS_herewearechar_%EF%B8%8FGIVEAWAY_ALERT__ROMANTIC_GETAWAY_FOR_TWO_%EF%B8%8F_You_guys_know_how_much_WE_LOVED_our_stay_last_summer__SO_dzzdkg.jpg' alt='Two people jumping off of a dock' className='img-landing'/>
//             </div>
//             <div className="content-landing">
//                 <div className="landing-header">
//                     <img src='https://res.cloudinary.com/dupram4w7/image/upload/v1672372171/Trouvaille/Trouvaille_700_300_px_vly6tj.png' alt='Trouvaille' className='img-landingTitle'/>
//                 </div>
//                 <div className="typewriter">
//                     <h1>a chance encounter with something wonderful.</h1>
//                 </div>
//                 {/* <p className='landing-summary'>Whether it's stumbling across a hidden back street,<br/>a quaint cafe, or connecting with a local,<br/>
// trouvaille describes those magical moments <br/>we experience in our journeys.</p> */}
//                 <button onClick={() => navigate("/home")} className="btn-explore">Explore</button>
//             </div>
//         </main>
//         <footer className="footer-landing">
//             <img src='https://res.cloudinary.com/dupram4w7/image/upload/v1672460293/Trouvaille/Trouvaille_1_rxks06.png' alt="Home" className="img-footer"></img>
//         </footer>
//     </>
// }