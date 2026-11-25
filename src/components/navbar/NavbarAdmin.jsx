import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import Marque from "../common/Marque";

const NavbarAdmin = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Efface le jeton puis renvoie vers la page de connexion
    const seDeconnecter = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top">
            <div className="container">

                <Marque lien="/admin-dashboard" />

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

                        <button type="button" className="nav-link btn btn-link" onClick={seDeconnecter}>
                            Déconnexion
                        </button>

                    </div>
                </div>

            </div>
        </nav>
    );
};

export default NavbarAdmin;