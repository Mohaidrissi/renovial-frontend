import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="container-fluid py-4 px-4">

      <div className="mb-5">
        <h2 className="fw-bold">Mon espace client</h2>
        <p className="text-muted">
          Bienvenue sur votre espace Rénovial.
          Retrouvez ici le suivi de vos demandes de devis.
        </p>
      </div>

      <div className="mb-5">
        <h5 className="fw-bold mb-3">Vue d'ensemble</h5>

        <div className="row g-3">

          <div className="col-md-4">
            <div className="p-3 border rounded">
              <p className="text-muted mb-2">Total des devis</p>
              <h3 className="fw-bold">0</h3>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-3 border rounded">
              <p className="text-muted mb-2">En attente</p>
              <h3 className="fw-bold text-warning">0</h3>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-3 border rounded">
              <p className="text-muted mb-2">Devis terminés</p>
              <h3 className="fw-bold text-success">0</h3>
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

          <Link to="/user/mes-devis" className="btn btn-outline-success">
            Consulter mes devis
          </Link>

        </div>
      </div>

      <div>
        <h5 className="fw-bold mb-3">Mes dernières demandes</h5>

        <p className="text-muted">
          Vous n'avez pas encore effectué de demande de devis.
        </p>

        <Link to="/devis" className="text-success text-decoration-none">
          Effectuer ma première demande →
        </Link>
      </div>

    </div>
  );
};

export default Dashboard;