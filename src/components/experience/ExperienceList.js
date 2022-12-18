import { useEffect, useState } from "react"
import { getExperiences } from "../managers/ExperienceManager"

export const ExperienceList = () => {

    const [experiences, setExperiences] = useState([])

    useEffect(
        () => {
            getExperiences()
                .then(data => setExperiences(data))
        },
        []
    )

    return <>
        <h1>Experiences</h1>
        <ul>
            {
                experiences.map(experience => {
                    return <li key={experience.id}>
                        <p>{experience.title}</p>
                        <a href={`${experience.website_url}`}>{experience.website_url}</a>
                        <p>{experience.address}</p>
                    </li>
                })
            }
        </ul>
    </>
}