import { Link } from "react-router-dom";
import logo from "../../assets/images/logo_renovial_icone.png";

// Logo + nom de l'entreprise, avec les couleurs du vrai logo Renovial
const Marque = ({ lien = "/" }) => {
    return (
        <Link to={lien} className="navbar-brand d-flex align-items-center gap-2">
            <img src={logo} alt="Logo Renovial" height="56" />
            <span className="d-flex flex-column text-start lh-1">
                <span className="fw-bold fs-4" style={{ color: "#1F4D3C", letterSpacing: "2px" }}>
                    RENOVIAL
                </span>
                <small className="text-secondary mt-1" style={{ fontSize: "0.7rem" }}>
                    Rénovation de l'habitat
                </small>
            </span>
        </Link>
    );
};

export default Marque;
