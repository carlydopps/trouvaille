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

    const follow = (travelerId) => {
        const newSubscription = {travelerId: travelerId}
        createSubscription(newSubscription).then(() => renderTravelers())
    }

    const unfollow = (travelerId) => {
        deleteSubscription(travelerId).then(() => renderTravelers())
    }

    return <>
        <h1>Travelers</h1>
        <ul>
            {
                travelers.map(traveler => {
                    return <li key={`traveler--${traveler.id}`}>
                            <img src={traveler.profile_img} alt="Profile Image" className="profile-image"/>
                            <h4>{traveler.full_name}</h4>
                            {localStorage.getItem("auth_token")
                                ? <Link to={`/travelers/${traveler.id}`}>@{traveler.username}</Link>
                                : <Link to={`/login`}>@{traveler.username}</Link>
                            }
                            {localStorage.getItem("auth_token")
                                ? traveler.myself
                                    ? ""
                                    : traveler.following
                                        ? <button onClick={() => unfollow(traveler.id)}>Unfollow</button>
                                        : <button onClick={() => follow(traveler.id)}>Follow</button>
                                : <button onClick={() => navigate(`/login`)}>Login to Follow</button>
                            }
                        </li>
                })
            }
        </ul>
    </>
}