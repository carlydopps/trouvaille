import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { createSubscription, deleteSubscription } from "../managers/SubscriptionManager"
import { getTraveler } from "../managers/TravelerManager"

export const Traveler = () => {

    const {travelerId} = useParams()
    const [traveler, setTraveler] = useState({
        id: 0,
        fullName: "",
        username: "",
        bio: "",
        profileImage: ""

    })

    const renderTraveler = () => {
        getTraveler(travelerId)
            .then(data => {
                const convertedTraveler = {
                    id: data.id,
                    fullName: data.full_name,
                    username: data.username,
                    bio: data.bio,
                    profileImage: data.profile_image_url,
                    subscribed: data.subscribed,
                    myself: data.myself
                }
                setTraveler(convertedTraveler)
            })
    }

    useEffect(
        () => {
            renderTraveler()
        }, 
        []
    )

    const subscribe = (travelerId) => {
        const newSubscription = {travelerId: travelerId}
        createSubscription(newSubscription).then(() => renderTraveler())
    }

    const unsubscribe = (travelerId) => {
        deleteSubscription(travelerId).then(() => renderTraveler())
    }

    return <section>
        <img src={traveler.profileImage} alt="Profile Image" className="profile-image"/>
        {traveler.myself
            ? ""
            : traveler.subscribed
                ? <button onClick={() => unsubscribe(traveler.id)}>Unfollow</button>
                : <button onClick={() => subscribe(traveler.id)}>Follow</button>
        }
        <h4>{traveler.fullName}</h4>
            <p>@{traveler.username}</p>
    </section>      
}