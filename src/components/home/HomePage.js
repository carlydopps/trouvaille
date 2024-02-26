import { useEffect, useState } from "react"
import { getTrips } from "../managers/TripManager"
import { getAuthTraveler, getTravelers } from "../managers/TravelerManager"
import { useNavigate } from "react-router-dom"
import { Footer } from "../footer/Footer"
import 'bootstrap/dist/css/bootstrap.min.css';

export const HomePage = () => {

    const [trips, setTrips] = useState([])
    const [travelers, setTravelers] = useState([])
    const [customTrips, setCustomTrips] = useState([])
    const [customTravelers, setCustomTravelers] = useState([])
    const [projectType, setProjectType] = useState("new")
    const [loadStatus, setLoadStatus] = useState(false)
    const [authTraveler, setAuthTraveler] = useState({
        firstName: ""
    })

    const navigate = useNavigate()

    useEffect(
        () => {
            window.scrollTo(0, 0)
            getTrips()
            .then(data => {
                const publicTrips = data.filter(trip => trip.is_draft === false && trip.is_private === false)
                setTrips(publicTrips)
            })
            .then(() => {
                getTravelers()
                    .then(data => setTravelers(data))
                    .then(() => {
                        if (localStorage.getItem("auth_token")) {
                            getAuthTraveler()
                                .then(data => {
                                    let traveler = {}
                                    traveler.firstName = data.first_name
                                    traveler.lastName = data.last_name
                                    traveler.username = data.username
                                    traveler.bio = data.bio
                                    traveler.profileImg = data.profile_img
                                    traveler.coverImg = data.cover_img
                                    setAuthTraveler(traveler)
                                    setLoadStatus(!loadStatus)
                                })
                        }
                    })
            })
            
        }, []
    )

    useEffect(
        () => {
            const copyTrips = [...trips]
            const newTrips = copyTrips.filter(trip => trip.favorite === false && trip.traveler.username !== authTraveler.username)
            setTrips(newTrips)

            const customTrips = copyTrips.filter(trip => trip.favorite === true)
            setCustomTrips(customTrips)

            const copyTravelers = [...travelers]
            const newTravelers = copyTravelers.filter(traveler => traveler.following === false && traveler.username !== authTraveler.username)
            setTravelers(newTravelers)

            const customTravelers = copyTravelers.filter(traveler => traveler.following === true && traveler.username !== authTraveler.username)
            setCustomTravelers(customTravelers)

        }, [loadStatus]
    )

    useEffect(
        () => {
            if (projectType === "new") {
            document.querySelector(".section-toggle").classList.remove('active');
            } else {
                document.querySelector(".section-toggle").classList.add('active');
            }
        },
        [projectType]
    )

    return <>
    <main className="home-page">
        <section className="home-content">
            <section className="home-heading">
                <div className="home-heading-left">
                    <div className="home-heading-details">
                        <h1>Where<br/>to<br/>next{localStorage.getItem("auth_token") ? `, ${authTraveler.firstName}` :""}?</h1>
                    </div>
                    <button onClick={() => navigate('/trips/create')}>Start planning</button>
                </div>
                <div className="home-images">
                    <div className="home-grid">
                        <img src='https://res.cloudinary.com/dupram4w7/image/upload/v1708540849/pexels-jess-loiterton-5505397_bfslhi.jpg' alt='Cover image'></img>
                        <img src='https://res.cloudinary.com/dupram4w7/image/upload/v1708547163/pexels-faruk-tokluog%CC%86lu-20081241_bngq6w.jpg' alt='Cover image'></img>
                        <img src='https://res.cloudinary.com/dupram4w7/image/upload/v1708540870/pexels-piotr-arnoldes-6441050_phq1jt.jpg' alt='Cover image'></img>
                        <img src='https://res.cloudinary.com/dupram4w7/image/upload/v1708540883/pexels-toa-heftiba-s%CC%A7inca-1194399_kmhpxc.jpg' alt='Cover image'></img>
                        <img src='https://res.cloudinary.com/dupram4w7/image/upload/v1708540868/pexels-niklas-jeromin-14760650_gmzebk.jpg' alt='Cover image'></img>
                        <img src='https://res.cloudinary.com/dupram4w7/image/upload/v1708540884/pexels-toa-heftiba-s%CC%A7inca-1194406_xybfa5.jpg' alt='Cover image'></img>
                        <img src='https://res.cloudinary.com/dupram4w7/image/upload/v1708547198/pexels-jess-loiterton-5232303_hh9sin.jpg' alt='Cover image'></img>
                        <img src='https://res.cloudinary.com/dupram4w7/image/upload/v1708561137/pexels-maria-orlova-4947223_gmsewn.jpg' alt='Cover image'></img>
                    </div>
                </div>
            </section>
            <div className="section-toggle">
                <div className="toggle-header">
                    <div>
                    {
                        <div className="toggle-container">
                                <div className="input-toggle">
                                    <label htmlFor="toggle">Discover</label>
                                    <input type="checkbox" id="toggle" className="input" onChange={() => {
                                        if (!localStorage.getItem("auth_token")) {
                                            navigate('/login')
                                            return
                                        }
                                        if (projectType === "custom") {
                                            setProjectType("new")
                                        } else {
                                            setProjectType("custom")
                                        }}}/>
                                    <label htmlFor="toggle" className="toggle"></label>
                                    <label htmlFor="toggle">
                                        {
                                            localStorage.getItem("auth_token") 
                                            ? <h2>Favorites</h2>
                                            : <>
                                                <p>Login to view</p>
                                                <h2>Favorites</h2>
                                            </>
                                        }
                                    </label>
                                </div>
                            </div>
                    }
                    </div>
                </div>
                <div>
                    { projectType === "new"
                        ? <div className="body-views">
                            <section className="home-travelers">
                                <div className="heading">
                                    <h2>Meet</h2>
                                    <h2 className="heading-dynamic-green">New</h2>
                                    <h2 className="heading-dynamic-green">Travelers</h2>
                                </div>
                                <div className="home-card-list">
                                    {
                                        travelers.slice(0,9).map(traveler => {
                                            return <button key={`traveler--${traveler.id}`} onClick={() => localStorage.getItem("auth_token") ? navigate(`/travelers/${traveler.id}`) : navigate(`/login`)}>
                                                <img src={traveler.profile_img} alt="Profile Image"/>
                                            </button>
                                        })
                                    }
                                </div>
                            </section>
                            <section className="home-trips">
                                <div className="home-card-list">
                                    {
                                        trips.slice(0,9).map(trip => {
                                            return <button key={`trip--${trip.id}`} onClick={() => localStorage.getItem("auth_token") ? navigate(`/trip/${trip.id}`) : navigate(`/login`)}>
                                                <img src={trip.cover_img} alt="Trip Image"/>
                                                <p>{trip.destinations[0]?.city}, {trip.destinations[0]?.state}</p>
                                            </button>
                                        })
                                    }
                                </div>
                                <div className="heading">
                                    <h2 className="heading-dynamic-green">Discover</h2>
                                    <h2>More</h2>
                                    <h2>Adventures</h2>
                                </div>
                            </section>
                        </div> 
                        :  <div className="body-views">
                            <section className="home-travelers">
                                <div className="heading">
                                    <h2>Travelers</h2>
                                    <h2>you</h2>
                                    <h2 className="heading-dynamic-orange">Follow</h2>
                                </div>
                                <div className="home-card-list">
                                    {
                                        customTravelers.slice(0,9).map(traveler => {
                                            return <button key={`traveler--${traveler.id}`} onClick={() => localStorage.getItem("auth_token") ? navigate(`/travelers/${traveler.id}`) : navigate(`/login`)}>
                                                <img src={traveler.profile_img} alt="Profile Image"/>
                                            </button>
                                        })
                                    }
                                </div>
                            </section>
                            <section className="home-trips">
                                <div className="home-card-list">
                                    {
                                        customTrips.slice(0,9).map(trip => {
                                            return <button key={`trip--${trip.id}`} onClick={() => localStorage.getItem("auth_token") ? navigate(`/trip/${trip.id}`) : navigate(`/login`)}>
                                                <img src={trip.cover_img} alt="Trip Image"/>
                                                <p>{trip.destinations[0]?.city}, {trip.destinations[0]?.state}</p>
                                            </button>
                                        })
                                    }
                                </div>
                                <div className="heading">
                                    <h2>Trips</h2>
                                    <h2>you</h2>
                                    <h2 className="heading-dynamic-orange">Love</h2>
                                </div>
                            </section>
                        </div>                      
                    }
                </div>
            </div>
        </section>
    </main>
    <Footer/>
</>
}