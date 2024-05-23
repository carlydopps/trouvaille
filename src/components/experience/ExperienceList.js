import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { pages } from "../../utils/pages"
import { staticImages } from "../../utils/staticImages"
import { AccommodationIcon, ActivityIcon, AttractionIcon, EateryIcon, PubIcon, searchIcon, WebsiteIcon } from "../../utils/svgs"
import { getExperiences } from "../managers/ExperienceManager"

const pageName = pages.EXPERIENCES

export const ExperienceList = () => {

    const [experiences, setExperiences] = useState([])
    const [searchTerms, setSearchTerms] = useState("")
    const [filteredExps, setFilteredExps] = useState([])
    const [feedback, setFeedback] = useState("")
    const navigate = useNavigate()

    const icons = {
        activity: ActivityIcon(),
        accommodation: AccommodationIcon(),
        attraction: AttractionIcon(),
        eatery: EateryIcon(),
        pub: PubIcon()
    }

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
                <h2>new experiences</h2>
            </div>
            {staticImages(pageName, 'header').map(img => <img src={img} className="experience-list-img-left" alt='Cover image'></img>)}
        </section>
        <section className="search">
            <div className="search-bar  search-bar__experiences">
                <div>
                    {searchIcon()}
                </div>
                <input onChange={(event) => setSearchTerms(event.target.value)}
                type="text" placeholder="Search for new adventures" className="input-search"/>
            </div>        
        </section>
        <section className="experiences-grid">
            {
                filteredExps.map(experience => {
                    return <div className='card__experience' key={`exp--${experience.id}`}>
                        <button onClick={() => experience.experience_trips.length === 0 ? setFeedback("Associated trip is no longer available") : navigate(`/trip/${experience.experience_trips.slice(0)}`)} className="card--image" style={{backgroundImage: `url(${experience.image})`}}></button>
                        <div className="experiences-details">
                            <div className="experience-status-icons">
                                <div className="icon-experienceType">{icons[experience.experience_type.name?.toLowerCase()]}</div>
                                <div className="icon-season"></div>
                                <button href={`${experience.website_url}`} target="_blank" className="icon-website">
                                    <WebsiteIcon/>
                                </button>
                            </div>
                            <h3 className="my-trips-trip-title">{experience.title}</h3>
                        </div>
                    </div>
                })
            }
        </section>
    </main>
}