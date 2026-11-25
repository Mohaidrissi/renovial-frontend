import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import Marque from "../common/Marque";

const NavbarClient = () => {

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

                <Marque />

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

                        <button type="button" className="nav-link btn btn-link" onClick={seDeconnecter}>
                            Déconnexion
                        </button>

                    </div>
                </div>

            </div>
        </nav>
    );
};

export default NavbarClient;