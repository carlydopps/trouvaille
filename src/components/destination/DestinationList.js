import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getDestinations } from "../managers/DestinationManager"
import { getExperiences } from "../managers/ExperienceManager"
import { getTrips } from "../managers/TripManager"
import './DestinationList.css'

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
                <h1>Destinations</h1>
                <div className="search-bar search-bar-destination">
                    <input onChange={(event) => setSearchTerms(event.target.value)}
                    type="text" placeholder="Enter city" className="input-search"/>
                </div>
                <h4>{Object.keys(selectedDest).length !== 0 ? "Visit" : ""} {selectedDest?.city}</h4>
            </section>
            <section className="destinations-grid">
                {
                    viewDestinations
                    ? <>
                        {
                            filteredDestinations.slice(0,3).map(destination => {
                                return <div key={`destination--${destination.id}`}>
                                    <button onClick={() => {
                                        setSelectedDest(destination)
                                        setViewDestinations(false)
                                    }}>
                                        <div className="card-destination-details">
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