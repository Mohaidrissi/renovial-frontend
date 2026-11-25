import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice";
import Marque from "../common/Marque";

// Pages privées selon le rôle de la personne connectée
const espaces = {
    ROLE_CLIENT: [
        { to: "/dashboard", texte: "Tableau de bord" },
        { to: "/mes-devis", texte: "Mes devis" },
        { to: "/profil", texte: "Mon profil" },
    ],
    ROLE_ADMIN: [
        { to: "/admin-dashboard", texte: "Tableau de bord" },
        { to: "/gestion-devis", texte: "Gestion des devis" },
        { to: "/gestion-services", texte: "Gestion des services" },
        { to: "/gestion-utilisateurs", texte: "Utilisateurs" },
    ],
};

// Le lien de la page ouverte est mis en vert
const classeLien = ({ isActive }) => "nav-link" + (isActive ? " text-success fw-semibold" : "");

// Une seule barre pour tout le site : elle change selon que l'on est visiteur, client ou admin
const Navbar = () => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const espace = user ? espaces[user.role] : null;

    // Efface le jeton puis renvoie vers la page de connexion
    const seDeconnecter = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-xl bg-white shadow-sm sticky-top">
            <div className="container">

                <Marque />

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarPrincipale"
                    aria-controls="navbarPrincipale"
                    aria-expanded="false"
                    aria-label="Ouvrir la navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarPrincipale">
                    <div className="navbar-nav ms-auto align-items-xl-center gap-xl-3 text-nowrap">

                        {espace ? (
                            <>
                                {/* Connecté : l'accueil + les pages de son espace */}
                                <NavLink to="/" end className={classeLien}>Accueil</NavLink>
                                {espace.map((lien) => (
                                    <NavLink key={lien.to} to={lien.to} className={classeLien}>{lien.texte}</NavLink>
                                ))}
                                <button type="button" className="nav-link btn btn-link text-danger text-start" onClick={seDeconnecter}>
                                    Déconnexion
                                </button>
                            </>
                        ) : (
                            <>
                                {/* Visiteur : les sections de la page d'accueil */}
                                <Link to="/#accueil" className="nav-link">Accueil</Link>
                                <Link to="/#services" className="nav-link">Nos services</Link>
                                <Link to="/#apropos" className="nav-link">À propos</Link>
                                <Link to="/#contact" className="nav-link">Contact</Link>
                                <Link to="/login" className="nav-link">Connexion</Link>
                            </>
                        )}

                        {/* L'administrateur reçoit les devis, il n'en demande pas */}
                        {user?.role !== "ROLE_ADMIN" && (
                            <Link to="/devis" className="btn btn-success rounded-pill px-4">
                                Demander un devis
                            </Link>
                        )}

                    </div>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;
