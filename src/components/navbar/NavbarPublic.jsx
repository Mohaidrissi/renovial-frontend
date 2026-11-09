import { Link } from "react-router-dom";

const NavbarPublic = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white">
            <div className="container d-flex align-items-center gap-4">

                <img src="/logo.png" alt="Logo Rénovial" width="120" className="me-3" />

                <Link to="/" className="nav-link">Accueil</Link>
                <Link to="/services" className="nav-link">Services</Link>
                <Link to="/apropos" className="nav-link">À propos</Link>
                <Link to="/contact" className="nav-link">Contact</Link>
                <Link to="/login" className="nav-link">Connexion</Link>

                <Link to="/devis" className="btn btn-success text-white ms-auto">
                    Demander un devis
                </Link>

            </div>
        </nav>
    );
};

export default NavbarPublic;
