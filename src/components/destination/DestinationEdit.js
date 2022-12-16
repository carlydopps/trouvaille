import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getDestination, saveDestination } from "../managers/DestinationManager"

export const DestinationEdit = () => {

    const {destinationId, tripId} = useParams()
    const navigate = useNavigate()
    const [destination, updateDestination] = useState({
        "city": "",
        "state": "",
        "country": ""
    })

    useEffect(
        () => {
            getDestination(destinationId)
                .then(data => updateDestination(data))
        },
        []
    )

    const handleSave = (event) => {
        event.preventDefault()

        saveDestination(destination)
            .then(() => navigate(`/trip/${tripId}`))
    }

    return <main>
        <form>
            <fieldset>
                <label htmlFor="city"></label>
                <input
                    required autoFocus
                    type="text"
                    className="form-control"
                    placeholder="City"
                    value={destination.city}
                    onChange={
                        (event) => {
                            const copy = {...destination}
                            copy.city = event.target.value
                            updateDestination(copy)
                        }
                    }
                />
            </fieldset>
            <fieldset>
                <label htmlFor="state"></label>
                <input
                    required
                    type="text"
                    className="form-control"
                    placeholder="state"
                    value={destination.state}
                    onChange={
                        (event) => {
                            const copy = {...destination}
                            copy.state = event.target.value
                            updateDestination(copy)
                        }
                    }
                />
            </fieldset>
            <fieldset>
                <label htmlFor="country"></label>
                <input
                    required
                    type="text"
                    className="form-control"
                    placeholder="country"
                    value={destination.country}
                    onChange={
                        (event) => {
                            const copy = {...destination}
                            copy.country = event.target.value
                            updateDestination(copy)
                        }
                    }
                />
            </fieldset>
            <button onClick={(event) => handleSave(event)}>Save</button>
        </form>
    </main>
}