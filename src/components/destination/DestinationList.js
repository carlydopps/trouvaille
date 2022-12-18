import { useEffect, useState } from "react"
import { getDestinations } from "../managers/DestinationManager"

export const DestinationList = () => {

    const [destinations, setDestinations] = useState([])

    useEffect(
        () => {
            getDestinations()
                .then(data => setDestinations(data))
        },
        []
    )

    return <>
        <h1>Destinations</h1>
        <section>
            {
                destinations.map(destination => {
                    return <div key={`destination--${destination.id}`}>
                            <h4>{destination.city}</h4>
                                <p>{destination.state}, {destination.country}</p>
                        </div>
                })
            }
        </section>
    </>
}