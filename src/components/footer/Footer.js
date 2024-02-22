import { useNavigate } from "react-router-dom"

export const Footer = () => {
    const navigate = useNavigate()

    return <footer className="footer">
        <button onClick={() => navigate(`/home`)} className="navbar-btn-home">
            <img src='https://res.cloudinary.com/dupram4w7/image/upload/v1672460293/Trouvaille/Trouvaille_1_rxks06.png' alt="Trouvaille logo" className="img-footer"></img>
        </button>
    </footer>
}