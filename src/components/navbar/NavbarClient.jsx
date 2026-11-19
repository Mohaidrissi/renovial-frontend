import { Link } from "react-router-dom";

const NavbarClient = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top">
            <div className="container-fluid px-4">

                <Link to="/" className="navbar-brand fw-bold fs-4">
                    RENO<span className="text-success">VIAL</span>
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarClient"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarClient">
                    <div className="navbar-nav ms-auto align-items-lg-center gap-lg-3">

                        <Link to="/mes-devis" className="nav-link">
                            Mes devis
                        </Link>

                        <Link to="/devis" className="nav-link">
                            Devis en ligne
                        </Link>

                        <Link to="/login" className="nav-link">
                            Déconnexion
                        </Link>

                    </div>
                </div>

            </div>
        </nav>
    );
};

export default NavbarClient;