import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { FollowIcon, UnfollowIcon } from "../../utils/svgs"
import { Footer } from "../footer/Footer"
import { createSubscription, deleteSubscription } from "../managers/SubscriptionManager"
import { getTraveler } from "../managers/TravelerManager"

export const Traveler = () => {

    const {travelerId} = useParams()
    const [viewStatus, setViewStatus] = useState(false)
    const [traveler, setTraveler] = useState({
        id: 0,
        fullName: "",
        username: "",
        bio: "",
        profileImg: "",
        myself: "",
        followerCount: 0,
        traveledTrips: [],
        following: false
    })

    const navigate = useNavigate()

    const renderTraveler = () => {
        window.scrollTo(0, 0)
        getTraveler(travelerId)
            .then(data => {
                const convertedTraveler = {
                    id: data.id,
                    fullName: data.full_name,
                    username: data.username,
                    bio: data.bio,
                    profileImg: data.profile_img,
                    coverImg: data.cover_img,
                    myself: data.myself,
                    followerCount: data.follower_count,
                    traveledTrips: data.traveled_trips,
                    following: data.following
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

    return <>
        <main className="page-traveler">
            <section>
                <img src={traveler.coverImg} className="traveler-img-cover" alt='Cover image'></img>
            </section>
            <section className="traveler-profile">
                <img src={traveler.profileImg} alt="Profile Image" className="profile-img traveler-img-profile"/>
                <div className="traveler-profile-details">
                    <div className="traveler-profile-heading">
                        <h4 className="traveler-profile-name">{traveler.fullName}</h4>
                        {
                            traveler.myself
                            ? ""
                            : traveler.following
                                ? <button className="icon-btn icon-orange icon-profile" onClick={() => unsubscribe(traveler.id)}><UnfollowIcon/></button>
                                : <button className="icon-btn icon-orange icon-profile" onClick={() => subscribe(traveler.id)}><FollowIcon/></button>
                        }
                    </div>
                    <div className="profile-info">
                        <p className="traveler-profile-username">@{traveler.username}</p>
                        <p>{traveler.followerCount} followers</p>
                        <p>{traveler.traveledTrips.length} trips</p>
                    </div>
                    <p>{traveler.bio}</p>
                </div>
                <div className="traveler-profile-trip-heading">
                    <h2>Recent Trips</h2>
                    <button onClick={()=> setViewStatus(!viewStatus)} className="btn btn-view-all">{viewStatus ? 'Close' : 'View All'}</button>
                </div>
                <section className="traveler-trips">
                    <div>
                        <ul className="traveler-trip-grid">
                            {
                                viewStatus
                                ? <>
                                    {traveler.traveledTrips.map(trip => 
                                        <button key={`trip--${trip.id}`} onClick={() => navigate(`/trip/${trip.id}`)} style={{backgroundImage: `url(${trip.cover_img})`}}>
                                            <p>{trip.destinations[0]?.city}, {trip.destinations[0]?.state}</p>
                                        </button>)}
                                </>
                                : <>
                                    {traveler.traveledTrips.slice(0,3).map(trip => 
                                    <button key={`trip--${trip.id}`} onClick={() => navigate(`/trip/${trip.id}`)} style={{backgroundImage: `url(${trip.cover_img})`}}>
                                        <p>{trip.destinations[0]?.city}, {trip.destinations[0]?.state}</p>
                                    </button>)}
                                </>
                            }
                        </ul>
                    </div>
                </section>
            </section>
        </main>  
        <Footer/>
    </>    
}