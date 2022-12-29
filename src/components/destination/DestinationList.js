import { useEffect, useState } from "react"
import { getDestinations } from "../managers/DestinationManager"

export const DestinationList = ({searchTermState}) => {

    const [destinations, setDestinations] = useState([])
    const [filteredDestinations, setFilteredDestinations] = useState([])

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

    return <>
        <h1>Destinations</h1>
        <section>
            {
                filteredDestinations.map(destination => {
                    return <div key={`destination--${destination.id}`}>
                            <h4>{destination.city}</h4>
                                <p>{destination.state}, {destination.country}</p>
                        </div>
                })
            }
        </section>
    </>
}