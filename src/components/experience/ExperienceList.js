import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getExperiences } from "../managers/ExperienceManager"

export const ExperienceList = () => {

    const [experiences, setExperiences] = useState([])
    const [feedback, setFeedback] = useState("")
    const navigate = useNavigate()

    useEffect(
        () => {
            getExperiences()
                .then(data => setExperiences(data))
        },
        []
    )

    useEffect(() => {
        if (feedback !== "") {
            setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])

    return <main className="travelers-main">
        <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
            {feedback}
        </div>
        <h1>Experiences</h1>
        <section className="card-list">
            {
                experiences.map(experience => {
                    return <div key={experience.id}>
                        <button onClick={() => experience.experience_trips.length === 0 ? setFeedback("Associated trip is no longer available") : navigate(`/trip/${experience.experience_trips.slice(0)}`)} className="card">
                            <img src={experience.image} alt="Cover Image" className="card-img"/>
                            <div className="card-preview">
                                <h4>{experience.title}</h4>
                                <a href={`${experience.website_url}`} target="_blank">{experience.website_url}</a>
                                <p>{experience.address}</p>
                            </div>
                        </button>
                    </div>
                })
            }
        </section>
    </main>
}