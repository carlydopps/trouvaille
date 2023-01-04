import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getDestinations } from "../managers/DestinationManager"

export const DestinationList = ({searchTermState}) => {

    const [destinations, setDestinations] = useState([])
    const [filteredDestinations, setFilteredDestinations] = useState([])
    const navigate = useNavigate()

    useEffect(
        () => {
            getDestinations()
                .then(data => setDestinations(data))
        },
        []
    )

    useEffect(
        () => {
            setFilteredDestinations(destinations)
        },
        [destinations]
    )

    useEffect(
        () => {
            const searchedDestinations = destinations.filter(destination => {
                return destination.city.toLowerCase().startsWith(searchTermState.toLowerCase())
            })
            setFilteredDestinations(searchedDestinations)
        },
        [searchTermState]
    )

    return <main className="travelers-main">
        <h1>Destinations</h1>
        <section className="card-list">
            {
                filteredDestinations.map(destination => {
                    return <div key={`destination--${destination.id}`}>
                        <button onClick={() => navigate(`/destinations`)} className="card">
                            <div className="card-preview">
                                <h4>{destination.city}</h4>
                                <p>{destination.state}, {destination.country}</p>
                            </div>
                        </button>
                    </div>
                })
            }
        </section>
    </main>
}