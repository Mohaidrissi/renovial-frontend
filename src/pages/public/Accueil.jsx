import { Link } from "react-router-dom";

const Accueil = () => {
    return (
        <main>

            <section id="accueil" className="container py-5">
                <div className="row align-items-center py-5">

                    <div className="col-lg-7">
                        <h1 className="fw-bold display-4 mb-4">
                            Améliorez votre confort grâce à la rénovation énergétique
                        </h1>

                        <p className="fs-5 text-secondary mb-4">
                            Rénovial vous accompagne dans vos travaux de rénovation
                            énergétique pour améliorer votre habitat et réduire
                            votre consommation d'énergie.
                        </p>

                        <Link to="/devis" className="btn btn-success btn-lg rounded-pill px-4">
                            Demander un devis
                        </Link>

                        <Link to="/services" className="btn btn-outline-success btn-lg rounded-pill px-4 ms-2">
                            Nos services
                        </Link>
                    </div>

                    <div className="col-lg-5 mt-4 mt-lg-0">
                        
                    </div>

                </div>
            </section>

            <section id="services" className="bg-light py-5">
                <div className="container">

                    <div className="mb-5">
                        <h2 className="fw-bold">Nos services</h2>
                        <p className="text-secondary">
                            Découvrez nos solutions de rénovation énergétique.
                        </p>
                    </div>

                    <div className="row">

                        <div className="col-md-4 mb-4">
                            <div className="card border-0 shadow-sm h-100">
                                <div className="card-body p-4">
                                    <h4 className="fw-bold">Isolation</h4>
                                    <p className="text-secondary">
                                        Améliorez l'isolation de votre logement
                                        pour limiter les pertes de chaleur.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 mb-4">
                            <div className="card border-0 shadow-sm h-100">
                                <div className="card-body p-4">
                                    <h4 className="fw-bold">Chauffage</h4>
                                    <p className="text-secondary">
                                        Optimisez votre système de chauffage
                                        pour améliorer votre confort énergétique.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 mb-4">
                            <div className="card border-0 shadow-sm h-100">
                                <div className="card-body p-4">
                                    <h4 className="fw-bold">Menuiseries</h4>
                                    <p className="text-secondary">
                                        Améliorez les performances énergétiques
                                        de vos portes et fenêtres.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>

                    <Link to="/services" className="btn btn-success rounded-pill px-4">
                        Découvrir tous nos services
                    </Link>

                </div>
            </section>

            <section id="apropos" className="container py-5">

                <div className="row align-items-center py-4">

                    <div className="col-lg-6 mb-4">
                        <h2 className="fw-bold mb-4">
                            À propos de Rénovial
                        </h2>

                        <p className="text-secondary">
                            Rénovial est une entreprise spécialisée dans
                            la rénovation énergétique du bâtiment à Lille.
                            Nous accompagnons nos clients dans leurs projets
                            pour améliorer le confort et les performances
                            énergétiques de leur logement.
                        </p>

                        <Link to="/apropos" className="btn btn-outline-success rounded-pill px-4">
                            En savoir plus
                        </Link>
                    </div>

                    <div className="col-lg-6">
                    </div>

                </div>

            </section>

            <section id="contact" className="bg-success text-white py-5">
                <div className="container py-3">

                    <h2 className="fw-bold">
                        Vous avez un projet de rénovation ?
                    </h2>

                    <p>
                        Contactez-nous pour discuter de votre projet
                        et obtenir un devis.
                    </p>

                    <Link to="/devis" className="btn btn-light rounded-pill px-4">
                        Demander un devis
                    </Link>

                </div>
            </section>

        </main>
    );
};

export default Accueil;