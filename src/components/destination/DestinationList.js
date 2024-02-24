import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { searchIcon } from "../../utils/svgs"
import { getDestinations } from "../managers/DestinationManager"
import { getExperiences } from "../managers/ExperienceManager"
import { getTrips } from "../managers/TripManager"

export const DestinationList = ({searchTermState}) => {

    const [destinations, setDestinations] = useState([])
    const [trips, setTrips] = useState([])
    const [experiences, setExperiences] = useState([])
    const [selectedDest, setSelectedDest] = useState({})
    const [viewDestinations, setViewDestinations] = useState(true)
    const [searchTerms, setSearchTerms] = useState("")
    const [filteredTrips, setFilteredTrips] = useState([])
    const [filteredDestinations, setFilteredDestinations] = useState([])
    const navigate = useNavigate()

    useEffect(
        () => {
            getDestinations().then(data => setDestinations(data))
            getTrips().then(data => setTrips(data))
            getExperiences().then(data => setExperiences(data))
        },
        []
    )

    useEffect(
        () => {
            setFilteredTrips(trips)
        },
        [trips]
    )

    useEffect(
        () => {
            setFilteredDestinations(destinations)
        },
        [destinations]
    )

    useEffect(
        () => {
            setViewDestinations(true)
            const searchedDestinations = destinations.filter(destination => destination.city.toLowerCase().startsWith(searchTerms.toLowerCase()) || destination.state.toLowerCase().startsWith(searchTerms.toLowerCase()))
            setFilteredDestinations(searchedDestinations)
        },
        [searchTerms]
    )

    useEffect(
        () => {
            const filteredTrips = trips.filter(trip => trip.destinations.find(dest => dest.id === selectedDest.id))
            setFilteredTrips(filteredTrips)
        }, [selectedDest]
    )

    return <div className="destinations-container">
        <main className="destinations-main">
            <section className="destination-list-heading">
                <div className='title'>
                    <h1>Oh the places</h1>
                    <h2>you'll go -</h2>
                </div>
                <div className="destinations-heading-images">
                    <div className="destinations-heading-grid">
                        <img src='https://res.cloudinary.com/dupram4w7/image/upload/v1673141692/Trouvaille/Screen_Shot_2023-01-07_at_5.23.32_PM_jmrgam.png' alt='Cover image'></img>
                        <img src='https://res.cloudinary.com/dupram4w7/image/upload/v1673134027/Trouvaille/Screen_Shot_2023-01-07_at_5.23.45_PM_thhvgd.png' alt='Cover image'></img>
                        <img src='https://res.cloudinary.com/dupram4w7/image/upload/v1673134027/Trouvaille/Screen_Shot_2023-01-07_at_5.23.58_PM_bfyxex.png' alt='Cover image'></img>
                        <img src='https://res.cloudinary.com/dupram4w7/image/upload/v1673134027/Trouvaille/Screen_Shot_2023-01-07_at_5.24.10_PM_zqnryr.png' alt='Cover image'></img>
                        <img src='https://res.cloudinary.com/dupram4w7/image/upload/v1673134027/Trouvaille/Screen_Shot_2023-01-07_at_5.24.23_PM_jjdjsm.png' alt='Cover image'></img>
                        <img src='https://res.cloudinary.com/dupram4w7/image/upload/v1673134027/Trouvaille/Screen_Shot_2023-01-07_at_5.24.38_PM_hcncov.png' alt='Cover image'></img>
                    </div>
                </div>
            </section>
            <section className="search search__destinations">
                <div className="search-bar search-bar__destinations">
                    <div>
                        {searchIcon()}
                    </div>
                    <input onChange={(event) => setSearchTerms(event.target.value)}
                    type="text" placeholder="Search for a city" className="input-search"/>
                </div>
            </section>
            <section className="destinations-grid">
                {
                    viewDestinations
                    ? <>
                        {
                            filteredDestinations.map(destination => {
                                return <div key={`destination--${destination.id}`}>
                                    <button onClick={() => {
                                        setSelectedDest(destination)
                                        setViewDestinations(false)
                                    }}>
                                        <div className="card-destination-details">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
                                            </svg>
                                            <h4>{destination.city}</h4>
                                            <p>{destination.state}, {destination.country}</p>
                                        </div>
                                    </button>
                                </div>
                            })
                        }
                    </>
                    : ""
                }
            </section>
            <section>
                {
                    Object.keys(selectedDest).length !== 0
                    ? <section>
                        <div className="card-list card-list-trips">
                            {
                                filteredTrips.map(trip => {
                                    return <div key={`trip--${trip.id}`}>
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
                        </div>
                    </section>
                    : ""
                }
            </section>
        </main>
    </div>
}