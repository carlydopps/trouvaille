import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
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

    useEffect(
        () => {
            getTraveler(travelerId)
                .then(data => {
                    const convertedTraveler = {
                        id: data.id,
                        fullName: data.full_name,
                        username: data.username,
                        bio: data.bio,
                        profileImage: data.profile_image_url
                    }
                    setTraveler(convertedTraveler)
                })
        }, 
        []
    )
    return <section>
        <img src={traveler.profileImage} alt="Profile Image" className="profile-image"/>
        <h4>{traveler.fullName}</h4>
            <p>@{traveler.username}</p>
    </section>      
}