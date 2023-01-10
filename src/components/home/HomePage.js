import { useEffect, useState } from "react"
import { getTrips } from "../managers/TripManager"
import { getAuthTraveler, getTravelers } from "../managers/TravelerManager"
import { useNavigate } from "react-router-dom"
import { Footer } from "../footer/Footer"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./HomePage.css"
import "../Main.css"

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
                        <div>
                            <h5>Book the flight</h5>
                            <h5>Take the road-trip</h5>
                            <h5>Explore again</h5>
                        </div>
                    </div>
                    <button onClick={() => navigate('/trips/create')} className="home-btn-create" >Start Planning!</button>
                </div>
                <div className="home-images">
                    <div className="home-grid">
                        <img src='https://res.cloudinary.com/dupram4w7/image/upload/v1673141692/Trouvaille/Screen_Shot_2023-01-07_at_5.23.32_PM_jmrgam.png'></img>
                        <img src='https://res.cloudinary.com/dupram4w7/image/upload/v1673134027/Trouvaille/Screen_Shot_2023-01-07_at_5.23.45_PM_thhvgd.png'></img>
                        <img src='https://res.cloudinary.com/dupram4w7/image/upload/v1673134027/Trouvaille/Screen_Shot_2023-01-07_at_5.23.58_PM_bfyxex.png'></img>
                        <img src='https://res.cloudinary.com/dupram4w7/image/upload/v1673134027/Trouvaille/Screen_Shot_2023-01-07_at_5.24.10_PM_zqnryr.png'></img>
                        <img src='https://res.cloudinary.com/dupram4w7/image/upload/v1673134027/Trouvaille/Screen_Shot_2023-01-07_at_5.24.23_PM_jjdjsm.png'></img>
                        <img src='https://res.cloudinary.com/dupram4w7/image/upload/v1673134027/Trouvaille/Screen_Shot_2023-01-07_at_5.24.38_PM_hcncov.png'></img>
                    </div>
                </div>
            </section>
            <div className="section-toggle">
                <div className="toggle-header">
                    <div>
                    {
                        localStorage.getItem("auth_token")
                        ? <div className="toggle-container">
                            <div className="input-toggle">
                                <label htmlFor="toggle">Discover</label>
                                <input type="checkbox" id="toggle" className="input" onChange={() => {
                                    if (projectType === "custom") {
                                        setProjectType("new")
                                    } else {
                                        setProjectType("custom")
                                    }}}/>
                                <label htmlFor="toggle" className="toggle"></label>
                                <label htmlFor="toggle">Favorites</label>
                            </div>
                        </div>
                        : ""
                    }
                    { 
                        projectType === "new"
                        ? <h2 className="toggle-title-new">Discover new</h2>
                        : <h2 className="toggle-title-custom">Explore your favorites</h2>
                    }  
                    </div>
                </div>
                <div>
                    { projectType === "new"
                        ? <div className="body-views">
                            <section className="home-trips">
                                <div className="home-trips-toggle-heading">
                                    <h2>Trips to</h2>
                                    <h2 className="heading-dynamic-green">Discover</h2>
                                </div>
                                <div className="home-card-list">
                                    {
                                        trips.slice(0,9).map(trip => {
                                            return <button key={`trip--${trip.id}`} onClick={() => localStorage.getItem("auth_token") ? navigate(`/trip/${trip.id}`) : navigate(`/login`)}>
                                                <img src={trip.cover_img} alt="Trip Image"/>
                                                <h4>{trip.title}</h4>
                                            </button>
                                        })
                                    }
                                </div>
                            </section>
                            <section className="home-travelers">
                                <div className="home-trips-toggle-heading">
                                    <h2>Meet</h2>
                                    <h2 className="heading-dynamic-green">New Travelers</h2>
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
                        </div> 
                        :  <div className="body-views">
                            <section className="home-trips">
                                <div className="home-trips-toggle-heading">
                                    <h2>Trips you</h2>
                                    <h2 className="heading-dynamic-orange">Love</h2>
                                </div>
                                <div className="home-card-list">
                                    {
                                        customTrips.map(trip => {
                                            return <button key={`trip--${trip.id}`} onClick={() => localStorage.getItem("auth_token") ? navigate(`/trip/${trip.id}`) : navigate(`/login`)}>
                                                <img src={trip.cover_img} alt="Trip Image"/>
                                                <h4>{trip.title}</h4>
                                            </button>
                                        })
                                    }
                                </div>
                            </section>
                            <section className="home-travelers">
                                <div className="home-trips-toggle-heading">
                                    <h2>Travelers you</h2>
                                    <h2 className="heading-dynamic-orange">Follow</h2>
                                </div>
                                <div className="home-card-list">
                                    {
                                        customTravelers.map(traveler => {
                                            return <button key={`traveler--${traveler.id}`} onClick={() => localStorage.getItem("auth_token") ? navigate(`/travelers/${traveler.id}`) : navigate(`/login`)}>
                                                <img src={traveler.profile_img} alt="Profile Image"/>
                                            </button>
                                        })
                                    }
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