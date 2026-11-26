import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import prestationService from "../../services/public/prestationService";
import "./Accueil.css";

const formatPrix = (prix) =>
    Number(prix).toLocaleString("fr-FR", { style: "currency", currency: "EUR" });

// Catalogue public : les services actifs, avec leur vrai prix (la même route que le devis en ligne)
const Services = () => {
    const [services, setServices] = useState([]);
    const [chargement, setChargement] = useState(true);
    const [erreur, setErreur] = useState("");

    useEffect(() => {
        prestationService.recupererPrestationsActives()
            .then((data) => setServices(data))
            .catch(() => setErreur("Impossible de charger nos services pour le moment."))
            .finally(() => setChargement(false));
    }, []);

    return (
        <div className="accueil">
            <section className="container py-5">
                <div className="surtitre mb-2">Nos services</div>
                <h1 className="display-6 fw-bold mb-3">Tout pour rénover durablement</h1>
                <p className="text-secondary mb-5">
                    Les prix sont indiqués hors taxes. La TVA (5,5 %, 10 % ou 20 %) dépend de votre logement
                    et des travaux : elle est calculée dans votre devis en ligne.
                </p>

                {chargement && <p>Chargement...</p>}
                {erreur && <div className="alert alert-danger">{erreur}</div>}

                <div className="row g-4 mb-5">
                    {services.map((s) => (
                        <div key={s.idService} className="col-md-6 col-lg-4">
                            <div className="carte-renovial p-4 h-100 d-flex flex-column">
                                <h2 className="h5 fw-bold">{s.nom}</h2>
                                {s.description && <p className="text-secondary small flex-grow-1">{s.description}</p>}
                                <div className="d-flex justify-content-between align-items-end mt-auto">
                                    <div>
                                        <span className="fs-4 fw-bold texte-vert">{formatPrix(s.prixUnitaire)}</span>
                                        <span className="text-secondary small"> HT / {s.unite.libelle.toLowerCase()}</span>
                                    </div>
                                    {s.economieEnergie && (
                                        <span className="badge bg-success-subtle text-success">Économie d'énergie</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <Link to="/devis" className="btn btn-renovial rounded-pill px-5 py-2">
                        Demander un devis
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Services;
