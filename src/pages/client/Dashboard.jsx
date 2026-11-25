import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import devisService from "../../services/client/devisService";

const formatPrix = (prix) =>
  Number(prix).toLocaleString("fr-FR", { style: "currency", currency: "EUR" });

const Dashboard = () => {
  const [devis, setDevis] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState("");

  // Même route que la page Mes devis : on compte les devis ici, pas besoin d'une nouvelle route
  useEffect(() => {
    devisService.recupererMesDevis()
      .then((data) => setDevis(data))
      .catch(() => setErreur("Impossible de charger vos devis."))
      .finally(() => setChargement(false));
  }, []);

  const enAttente = devis.filter((d) => d.statut === "En attente").length;
  const termines = devis.filter((d) => d.statut === "Accepté" || d.statut === "Refusé").length;
  const derniers = devis.slice(0, 3); // la liste arrive déjà triée, du plus récent au plus ancien

  return (
    <div className="container-fluid py-4 px-4">

      <div className="mb-5">
        <h2 className="fw-bold">Mon espace client</h2>
        <p className="text-muted">
          Bienvenue sur votre espace Rénovial.
          Retrouvez ici le suivi de vos demandes de devis.
        </p>
      </div>

      {erreur && <div className="alert alert-danger">{erreur}</div>}

      <div className="mb-5">
        <h5 className="fw-bold mb-3">Vue d'ensemble</h5>

        <div className="row g-3">

          <div className="col-md-4">
            <div className="p-3 border rounded">
              <p className="text-muted mb-2">Total des devis</p>
              <h3 className="fw-bold">{chargement ? "…" : devis.length}</h3>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-3 border rounded">
              <p className="text-muted mb-2">En attente</p>
              <h3 className="fw-bold text-warning">{chargement ? "…" : enAttente}</h3>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-3 border rounded">
              <p className="text-muted mb-2">Devis terminés</p>
              <h3 className="fw-bold text-success">{chargement ? "…" : termines}</h3>
            </div>
          </div>

        </div>
      </div>

      <div className="mb-5">
        <h5 className="fw-bold mb-3">Actions rapides</h5>

        <div className="d-flex flex-wrap gap-3">

          <Link to="/devis" className="btn btn-success">
            Demander un devis
          </Link>

          <Link to="/mes-devis" className="btn btn-outline-success">
            Consulter mes devis
          </Link>

        </div>
      </div>

      <div>
        <h5 className="fw-bold mb-3">Mes dernières demandes</h5>

        {!chargement && !erreur && devis.length === 0 && (
          <>
            <p className="text-muted">
              Vous n'avez pas encore effectué de demande de devis.
            </p>

            <Link to="/devis" className="text-success text-decoration-none">
              Effectuer ma première demande →
            </Link>
          </>
        )}

        {derniers.length > 0 && (
          <ul className="list-group">
            {derniers.map((d) => (
              <li key={d.idDevis} className="list-group-item d-flex flex-wrap justify-content-between align-items-center gap-2">
                <span>
                  <strong>{d.reference}</strong>
                  <span className="text-muted"> · {new Date(d.dateCreation).toLocaleDateString("fr-FR")} · {d.statut}</span>
                </span>
                <span className="d-flex align-items-center gap-3">
                  <strong>{formatPrix(d.totalTtc)}</strong>
                  <Link to={`/detail-devis/${d.idDevis}`} className="text-success text-decoration-none">
                    Voir →
                  </Link>
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
};

export default Dashboard;
