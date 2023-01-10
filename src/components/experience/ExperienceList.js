import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getExperiences } from "../managers/ExperienceManager"
import './ExperienceList.css'

export const ExperienceList = () => {

    const [experiences, setExperiences] = useState([])
    const [searchTerms, setSearchTerms] = useState("")
    const [filteredExps, setFilteredExps] = useState([])
    const [feedback, setFeedback] = useState("")
    const navigate = useNavigate()

    useEffect(
        () => {
            getExperiences().then(data => setExperiences(data))
        },
        []
    )

    useEffect(
        () => {
            setFilteredExps(experiences)
        },
        [experiences]
    )

    useEffect(
        () => {
            const searchedExps = experiences.filter(experience => experience.title.toLowerCase().startsWith(searchTerms.toLowerCase()))
            setFilteredExps(searchedExps)
        },
        [searchTerms]
    )

    useEffect(() => {
        if (feedback !== "") {
            setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])

    return <main className="page-experiences">
        <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
            {feedback}
        </div>
        <section className="heading-experiences">
            <div className="heading-experiences-details">
                <h1>Discover</h1>
                <h2>new adventures</h2>
            </div>
            <img src="https://res.cloudinary.com/dupram4w7/image/upload/v1672636789/Trouvaille/pexels-riccardo-307008_ohsd7n.jpg" className="experience-list-img-cover"></img>
        </section>
        <div className="search-bar">
            <input onChange={(event) => setSearchTerms(event.target.value)}
            type="text" placeholder="Search for new adventures" className="input-search"/>
        </div>
        <section className="card-list">
            {
                filteredExps.map(experience => {
                    return <div key={`exp--${experience.id}`}>
                        <button onClick={() => experience.experience_trips.length === 0 ? setFeedback("Associated trip is no longer available") : navigate(`/trip/${experience.experience_trips.slice(0)}`)} className="card">
                            <img src={experience.image} alt="Cover Image" className="card-img"/>
                            <div className="card-preview">
                                <h4>{experience.title}</h4>
                                <div className="card-details">
                                    <p>{experience.address}</p>
                                    <p>{experience.experience_type.name}</p>
                                    <a href={`${experience.website_url}`} target="_blank">Visit</a>
                                </div>
                            </div>
                        </button>
                    </div>
                })
            }
        </section>
    </main>
}