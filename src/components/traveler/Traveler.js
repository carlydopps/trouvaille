import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { createSubscription, deleteSubscription } from "../managers/SubscriptionManager"
import { getTraveler } from "../managers/TravelerManager"
import './Traveler.css'

export const Traveler = () => {

    const {travelerId} = useParams()
    const [viewStatus, setViewStatus] = useState(false)
    const [traveler, setTraveler] = useState({
        id: 0,
        fullName: "",
        username: "",
        bio: "",
        profileImg: "",
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
                    fullName: data.first_name + " " + data.last_name,
                    username: data.username,
                    bio: data.bio,
                    profileImg: data.profile_img,
                    coverImg: data.cover_img,
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

    return <main className="page-traveler">
        <section>
            <img src="https://res.cloudinary.com/dupram4w7/image/upload/v1672375661/Trouvaille/yu8uaslizfcafh2xffkn_t7fdk5.jpg" className="traveler-img-cover"></img>
        </section>
        <section className="traveler-profile">
            <img src={traveler.profileImg} alt="Profile Image" className="profile-img traveler-img-profile"/>
            {traveler.myself
                ? ""
                : traveler.subscribed
                    ? <button onClick={() => unsubscribe(traveler.id)}>Unfollow</button>
                    : <button onClick={() => subscribe(traveler.id)}>Follow</button>
            }
            <div className="traveler-profile-details">
                <h4 className="traveler-profile-name">{traveler.fullName}</h4>
                <p className="traveler-profile-username">@{traveler.username}</p>
                <div className="profile-info">
                    <p>{traveler.followerCount} followers</p>
                    <p>{traveler.traveledTrips.length} trips</p>
                </div>
                <p>{traveler.bio}</p>
            </div>
            <div className="traveler-profile-trip-heading">
                <h2>Recent Trips</h2>
                <button onClick={()=> setViewStatus(!viewStatus)}>{viewStatus ? 'Close' : 'View All'}</button>
            </div>
            <section className="traveler-trips">
                <div>
                    <ul className="traveler-trip-grid">
                        {viewStatus
                            ? <>
                                {traveler.traveledTrips.map(trip => <button key={`trip--${trip.id}`} 
                                    onClick={() => navigate(`/trip/${trip.id}`)} 
                                    style={{backgroundImage: `url(${trip.cover_img})`}}>
                                        <p>{trip.destinations[0].city}, {trip.destinations[0].state}</p>
                                    </button>)}
                            </>
                            : <>
                                {traveler.traveledTrips.slice(0,3).map(trip => <button key={`trip--${trip.id}`} 
                                    onClick={() => navigate(`/trip/${trip.id}`)} 
                                    style={{backgroundImage: `url(${trip.cover_img})`}}>
                                        <p>{trip.destinations[0].city}, {trip.destinations[0].state}</p>
                                    </button>)}
                            </>
                        }
                    </ul>
                </div>
            </section>
        </section>
    </main>      
}