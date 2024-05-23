import { useNavigate } from "react-router-dom"
import { pages } from "../../utils/pages"
import { staticImages } from "../../utils/staticImages"

export const Footer = () => {
    const navigate = useNavigate()

    return <footer className="footer">
        <button onClick={() => navigate(`/home`)} className="navbar-btn-home">
            <img src={staticImages(pages.GLOBAL, 'logo')} alt="Trouvaille logo" className="img-footer"></img>
        </button>
    </footer>
}