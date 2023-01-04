import { useEffect, useState } from "react"
import { getTravelers, getTravelersWithAuth } from "../managers/TravelerManager"
import { Link, useNavigate } from "react-router-dom"
import { createSubscription, deleteSubscription } from "../managers/SubscriptionManager"
import './TravelerList.css'

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

    return <main className="travelers-main">
        <h1>Travelers</h1>
        <section className="card-list">
            {
                travelers.map(traveler => {
                    return <div key={`traveler--${traveler.id}`}>
                        <div className="icon-btns">
                            {localStorage.getItem("auth_token")
                                ? traveler.myself
                                    ? <button className="btn-false"></button>
                                    : traveler.following
                                        ? <button onClick={() => unfollow(traveler.id)}className="icon-btn">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                            </svg>
                                        </button>
                                        : <button onClick={() => follow(traveler.id)} className="icon-btn">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-person-plus-fill" viewBox="0 0 16 16">
                                            <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                            <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                                            </svg>
                                        </button>
                                : <button onClick={() => navigate(`/login`)}>Login to Follow</button>
                            }
                        </div>
                        <button onClick={() => localStorage.getItem("auth_token") ? navigate(`/travelers/${traveler.id}`): navigate(`/login`)} className="card">
                            <img src={traveler.cover_img} alt="Cover Image" className="card-img"/>
                            <img src={traveler.profile_img} alt="Profile Image" className="profile-img card-img-profile"/>
                            <div className="card-preview">
                                <h4>{traveler.full_name}</h4>
                                <div className="card-details">
                                    <p>@{traveler.username}</p>
                                    <p>{traveler.traveled_trips.length} trips</p>
                                </div>
                            </div>
                        </button>
                    </div>
                })
            }
        </section>
    </main>
}