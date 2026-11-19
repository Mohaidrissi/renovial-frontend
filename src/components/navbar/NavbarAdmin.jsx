import { Link } from "react-router-dom";

const NavbarAdmin = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top">
            <div className="container-fluid px-4">

                <Link to="/admin-dashboard" className="navbar-brand fw-bold fs-4">
                    RENO<span className="text-success">VIAL</span>
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarAdmin"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarAdmin">
                    <div className="navbar-nav ms-auto align-items-lg-center gap-lg-3">

                        <Link to="/admin-dashboard" className="nav-link">
                            Tableau de bord
                        </Link>

                        <Link to="/gestion-devis" className="nav-link">
                            Gestion des devis
                        </Link>

                        <Link to="/gestion-services" className="nav-link">
                            Gestion des services
                        </Link>

                        <Link to="/gestion-utilisateurs" className="nav-link">
                            Utilisateurs
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

export default NavbarAdmin;