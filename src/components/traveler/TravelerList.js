import { useEffect, useState } from "react"
import { getTravelers } from "../managers/TravelerManager"
import { Link, useNavigate } from "react-router-dom"

export const TravelerList = () => {

    const [travelers, setTravelers] = useState([])

    const navigate = useNavigate()

    useEffect(
        () => {
            getTravelers()
                .then(data => setTravelers(data))
        },
        []
    )

    return <>
        <h1>Travelers</h1>
        <section>
            {
                travelers.map(traveler => {
                    return <button key={`traveler--${traveler.id}`} onClick={() => 
                        {
                            localStorage.getItem("auth_token")
                            ? navigate(`/travelers/${traveler.id}`)
                            : navigate(`/login`)
                        }}>
                            <img src={traveler.profile_image_url} alt="Profile Image" className="profile-image"/>
                            <h4>{traveler.full_name}</h4>
                                <Link to={`/traveler/${traveler.id}`}>@{traveler.username}</Link>
                        </button>
                })
            }
        </section>
    </>
}