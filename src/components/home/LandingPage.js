import { useNavigate } from "react-router-dom"
import './LandingPage.css'

export const LandingPage = () => {

    const navigate = useNavigate()

    return <>
        <main>
            <div className="background-landing">
                <div className="overlay"></div>
                <img src='https://res.cloudinary.com/dupram4w7/image/upload/v1672375478/Trouvaille/Jake_Kaylee___Travel_Couple_on_Instagram__CLOSED__WINNER_IS_herewearechar_%EF%B8%8FGIVEAWAY_ALERT__ROMANTIC_GETAWAY_FOR_TWO_%EF%B8%8F_You_guys_know_how_much_WE_LOVED_our_stay_last_summer__SO_dzzdkg.jpg' alt='Two people jumping off of a dock' className='img-landing'/>
            </div>
            <div className="content-landing">
                <div className="landing-header">
                    <img src='https://res.cloudinary.com/dupram4w7/image/upload/v1672372171/Trouvaille/Trouvaille_700_300_px_vly6tj.png' alt='Trouvaille' className='img-landingTitle'/>
                </div>
                <div class="typewriter">
                    <h1>a chance encounter with something wonderful.</h1>
                </div>
                {/* <p className='landing-summary'>Whether it's stumbling across a hidden back street,<br/>a quaint cafe, or connecting with a local,<br/>
trouvaille describes those magical moments <br/>we experience in our journeys.</p> */}
                <button onClick={() => navigate("/home")} className="btn-explore">Explore</button>
            </div>
        </main>
        <footer className="footer-landing">
            <img src='https://res.cloudinary.com/dupram4w7/image/upload/v1672460293/Trouvaille/Trouvaille_1_rxks06.png' alt="Home" className="img-footer"></img>
        </footer>
    </>
}