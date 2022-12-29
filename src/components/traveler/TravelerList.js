import { useEffect, useState } from "react"
import { getTravelers, getTravelersWithAuth } from "../managers/TravelerManager"
import { Link, useNavigate } from "react-router-dom"
import { createSubscription, deleteSubscription } from "../managers/SubscriptionManager"

export const TravelerList = () => {

    const [travelers, setTravelers] = useState([])

    const navigate = useNavigate()

    const renderTravelers = () => {
        if (localStorage.getItem("auth_token")) {
            getTravelersWithAuth().then(data => setTravelers(data))
        } else {
            getTravelers().then(data => setTravelers(data))
        }
    }

    useEffect(
        () => {
            renderTravelers()
        },
        []
    )

    const subscribe = (travelerId) => {
        const newSubscription = {travelerId: travelerId}
        createSubscription(newSubscription).then(() => renderTravelers())
    }

    const unsubscribe = (travelerId) => {
        deleteSubscription(travelerId).then(() => renderTravelers())
    }

    return <>
        <h1>Travelers</h1>
        <ul>
            {
                travelers.map(traveler => {
                    return <li key={`traveler--${traveler.id}`}>
                            <img src={traveler.profile_image_url} alt="Profile Image" className="profile-image"/>
                            <h4>{traveler.full_name}</h4>
                            {localStorage.getItem("auth_token")
                                ? <Link to={`/travelers/${traveler.id}`}>@{traveler.username}</Link>
                                : <Link to={`/login`}>@{traveler.username}</Link>
                            }
                            {localStorage.getItem("auth_token")
                                ? traveler.myself
                                    ? ""
                                    : traveler.subscribed
                                        ? <button onClick={() => unsubscribe(traveler.id)}>Unfollow</button>
                                        : <button onClick={() => subscribe(traveler.id)}>Follow</button>
                                : <button onClick={() => navigate(`/login`)}>Login to Follow</button>
                            }
                        </li>
                })
            }
        </ul>
    </>
}