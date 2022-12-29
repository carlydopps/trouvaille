import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { createSubscription, deleteSubscription } from "../managers/SubscriptionManager"
import { getTraveler } from "../managers/TravelerManager"

export const Traveler = () => {

    const {travelerId} = useParams()
    const [traveler, setTraveler] = useState({
        id: 0,
        fullName: "",
        username: "",
        bio: "",
        profileImage: "",
        subscribed: "",
        myself: "",
        followerCount: 0,
        traveledTrips: []
    })

    const navigate = useNavigate()

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
                    myself: data.myself,
                    followerCount: data.follower_count,
                    traveledTrips: data.traveled_trips
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
        <p>{traveler.followerCount} followers</p>
        <p>{traveler.traveledTrips.length} trips</p>
        <h4>Trips</h4>
        <ul>
            {
                traveler.traveledTrips.map(trip => 
                    <button key={`trip--${trip.id}`} onClick={() => navigate(`/trip/${trip.id}`)}>
                        <p>{trip.title}</p>
                        <p>{trip.style.name}</p>
                        <p>{trip.season.name}</p>
                        <p>{trip.duration.extent}</p>
                    </button>
                )
            }
        </ul>
    </section>      
}