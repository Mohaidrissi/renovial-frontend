import { Link } from "react-router-dom";

const NavbarPublic = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top">
            <div className="container">

                <Link to="/" className="navbar-brand fw-bold fs-4">
                    RENO<span className="text-success">VIAL</span>
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarPublic"
                    aria-controls="navbarPublic"
                    aria-expanded="false"
                    aria-label="Ouvrir la navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarPublic">

                    <div className="navbar-nav ms-auto align-items-lg-center gap-lg-3">

                        <Link to="/#accueil" className="nav-link">
                            Accueil
                        </Link>

                        <Link to="/#services" className="nav-link">
                            Nos services
                        </Link>

                        <Link to="/#apropos" className="nav-link">
                            À propos
                        </Link>

                        <Link to="/#contact" className="nav-link">
                            Contact
                        </Link>

                        <Link to="/login" className="nav-link">
                            Connexion
                        </Link>

                        <Link to="/devis" className="btn btn-success rounded-pill px-4">
                            Demander un devis
                        </Link>

                    </div>

                </div>

            </div>
        </nav>
    );
};

export default NavbarPublic;