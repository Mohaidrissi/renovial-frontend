import { Link } from "react-router-dom";

const NavbarPublic = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-white">
            <div className="container">


                <Link to="/" className="navbar-brand fw-bold">
                    RENO<span className="text-success">VIAL</span>
                </Link>


                <div className="d-flex align-items-center gap-4">

                    <Link to="/#accueil" className="nav-link">
                        Accueil
                    </Link>

                    <Link to="/#services" className="nav-link">
                        Nos services
                    </Link>

                    <Link to="/#apropos" className="nav-link">
                        À propos
                    </Link>

                    <a href="#contact" className="nav-link">
                        Contact
                    </a>

                    <Link to="/login" className="nav-link">
                        Connexion
                    </Link>

                    <Link to="/devis" className="btn btn-success rounded-pill px-4">
                        Demander un devis
                    </Link>

                </div>
            </div>
        </nav>
    );
};

export default NavbarPublic;