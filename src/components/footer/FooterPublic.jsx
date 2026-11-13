import { Link } from "react-router-dom";

const FooterPublic = () => {
    return (
        <footer className="bg-dark text-white">

            <div className="container py-5">

                <div className="row">

                    <div className="col-md-4 mb-4 text-start">
                        <h2 className="fw-bold mb-3">Rénovial</h2>

                        <p className="text-white-50">
                            Rénovation énergétique du bâtiment à Lille :
                            isolation, chauffage et menuiseries.
                    
                        </p>
                    </div>

                    <div className="col-md-4 mb-4 text-start">
                        <h5 className="fw-bold mb-3">Contact</h5>

                        <p className="text-white-50">
                            <i className="bi bi-geo-alt me-2"></i>
                            21 Avenue Albert, 59000 Lille
                        </p>

                        <p className="text-white-50">
                            <i className="bi bi-telephone me-2"></i>
                            06 50 47 48 38
                        </p>

                        <p className="text-white-50">
                            <i className="bi bi-envelope me-2"></i>
                            contact@renovial.fr
                        </p>
                    </div>

                    <div className="col-md-4 mb-4 text-start">
                        <h5 className="fw-bold mb-3">Navigation</h5>

                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <Link to="/" className="text-white-50 text-decoration-none">
                                    Accueil
                                </Link>
                            </li>

                            <li className="mb-2">
                                <Link to="/services" className="text-white-50 text-decoration-none">
                                    Nos services
                                </Link>
                            </li>

                            <li className="mb-2">
                                <Link to="/apropos" className="text-white-50 text-decoration-none">
                                    À propos
                                </Link>
                            </li>

                            <li className="mb-2">
                                <Link to="/contact" className="text-white-50 text-decoration-none">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                </div>

                <hr className="border-secondary my-4" />

                <div className="row">

                    <div className="col-md-6 mb-3 mb-md-0 text-start">
                        <p className="text-white-50 mb-0">
                            © 2026 Rénovial - Tous droits réservés.
                        </p>
                    </div>

                    <div className="col-md-6 text-start">
                        <Link to="/mentions-legales" className="text-white-50 text-decoration-none me-3">
                            Mentions légales
                        </Link>

                        <Link to="/confidentialite" className="text-white-50 text-decoration-none">
                            Confidentialité
                        </Link>
                    </div>

                </div>

            </div>

        </footer>
    );
};

export default FooterPublic;