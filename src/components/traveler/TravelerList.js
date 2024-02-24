import { useEffect, useState } from "react"
import { getTravelers } from "../managers/TravelerManager"
import { useNavigate } from "react-router-dom"
import { createSubscription, deleteSubscription } from "../managers/SubscriptionManager"
import { FollowIcon, searchIcon, UnfollowIcon } from "../../utils/svgs"

export const TravelerList = () => {

    const [travelers, setTravelers] = useState([])
    const [searchTerms, setSearchTerms] = useState("")
    const [filteredTravelers, setFilteredTravelers] = useState([])

    const navigate = useNavigate()

    const renderTravelers = () => {
        getTravelers().then(data => setTravelers(data))
    }

    useEffect(
        () => {
            renderTravelers()
            window.scrollTo(0, 0)
        },
        []
    )

    useEffect(
        () => {
            setFilteredTravelers(travelers)
        },
        [travelers]
    )

    useEffect(
        () => {
            const searchedTravelers = travelers.filter(traveler => {
                return traveler.first_name.toLowerCase().startsWith(searchTerms.toLowerCase()) || traveler.username.toLowerCase().startsWith(searchTerms.toLowerCase())
            })
            setFilteredTravelers(searchedTravelers)
        },
        [searchTerms]
    )

    const follow = (travelerId) => {
        const newSubscription = {travelerId: travelerId}
        createSubscription(newSubscription).then(() => renderTravelers())
    }

    const unfollow = (travelerId) => {
        deleteSubscription(travelerId).then(() => renderTravelers())
    }

    return <main className="page-travelers">
        <section className="heading-travelers">
            <div className='details'>
                <h1>Travelers</h1>
                <h3>Explorers</h3>
                <h5>Friends</h5>
            </div>
            <div className="images">
                <div className="grid">
                    <img src='https://res.cloudinary.com/dupram4w7/image/upload/v1708540855/pexels-jess-loiterton-8651388_oco8ph.jpg' alt='Cover image'></img>
                    <img src='https://res.cloudinary.com/dupram4w7/image/upload/v1708576736/pexels-maria-orlova-4947416_vevnx1.jpg' alt='Cover image'></img>
                    <img src='https://res.cloudinary.com/dupram4w7/image/upload/v1708561137/pexels-taryn-elliott-3889827_hjqo4j.jpg' alt='Cover image'></img>
                    <img src='https://res.cloudinary.com/dupram4w7/image/upload/v1708711927/DSC04063_3_u0mque.jpg' alt='Cover image'></img>
                    <img src='https://res.cloudinary.com/dupram4w7/image/upload/v1708371773/DSC_1139_sng0vl.jpg' alt='Cover image'></img>
                </div>
            </div>
        </section>
        <section className="search search__travelers">
            <div className="search-bar search-bar__travelers">
                <div>
                    {searchIcon()}
                </div>
                <input onChange={(event) => setSearchTerms(event.target.value)}
                type="text" placeholder="Find new travelers" className="input-search"/>
            </div>
        </section>
        <div className='travelers-cards-container'>
            <section className="card-list">
                {
                    filteredTravelers.map(traveler => {
                        return <div className='card__travelers' key={`traveler--${traveler.id}`}>
                            <div className="icon-btns">
                                {
                                    localStorage.getItem("auth_token")
                                    ? traveler.myself
                                        ? <button className="btn-false"></button>
                                        : traveler.following
                                            ? <button onClick={() => unfollow(traveler.id)} className="icon-btn"><UnfollowIcon/></button>
                                            : <button onClick={() => follow(traveler.id)} className="icon-btn"><FollowIcon/></button>
                                    : <button onClick={() => navigate(`/login`)}>Login to Follow</button>
                                }
                            </div>
                            <button onClick={() => localStorage.getItem("auth_token") ? navigate(`/travelers/${traveler.id}`): navigate(`/login`)} className="card">
                                <img src={traveler.cover_img} alt="Cover Image" className="card-img"/>
                                <img src={traveler.profile_img} alt="Profile Image" className="profile-img card-img-profile"/>
                                <div className="card-preview">
                                    <h4 className="traveler-list-name">{traveler.full_name}</h4>
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
        </div>
    </main>
}