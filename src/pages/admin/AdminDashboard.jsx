import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import adminDevisService from "../../services/admin/adminDevisService";
import adminUsersService from "../../services/admin/adminUsersService";
import adminServicesService from "../../services/admin/adminServicesService";

const formatPrix = (prix) =>
    Number(prix).toLocaleString("fr-FR", { style: "currency", currency: "EUR" });

const Chiffre = ({ titre, valeur, couleur }) => (
    <div className="col-6 col-md-3">
        <div className="p-3 border rounded h-100">
            <p className="text-muted mb-2">{titre}</p>
            <h3 className={`fw-bold mb-0 ${couleur}`}>{valeur}</h3>
        </div>
    </div>
);

const AdminDashboard = () => {
    const [donnees, setDonnees] = useState(null);
    const [erreur, setErreur] = useState("");

    // On réutilise les 3 listes admin : pas besoin d'une route de statistiques
    useEffect(() => {
        Promise.all([
            adminDevisService.recupererTousLesDevis(),
            adminUsersService.recupererTousLesUtilisateurs(),
            adminServicesService.recupererTousLesServices()
        ])
            .then(([devis, utilisateurs, services]) => setDonnees({ devis, utilisateurs, services }))
            .catch(() => setErreur("Impossible de charger le tableau de bord."));
    }, []);

    if (erreur) {
        return <div className="container py-4"><div className="alert alert-danger">{erreur}</div></div>;
    }
    if (!donnees) {
        return <div className="container py-4"><p>Chargement...</p></div>;
    }

    const { devis, utilisateurs, services } = donnees;
    const enAttente = devis.filter((d) => d.statut === "En attente");

    return (
        <div className="container py-4">
            <h1 className="h3 mb-1">Tableau de bord</h1>
            <p className="text-muted mb-4">Vue d'ensemble de l'activité Rénovial.</p>

            <div className="row g-3 mb-5">
                <Chiffre titre="Devis en attente" valeur={enAttente.length} couleur="text-warning" />
                <Chiffre titre="Devis acceptés" valeur={devis.filter((d) => d.statut === "Accepté").length} couleur="text-success" />
                <Chiffre titre="Clients" valeur={utilisateurs.filter((u) => u.role === "ROLE_CLIENT").length} couleur="" />
                <Chiffre titre="Services actifs" valeur={services.filter((s) => s.actif).length} couleur="" />
            </div>

            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
                <h2 className="h5 fw-bold mb-0">Devis à traiter</h2>
                <Link to="/gestion-devis" className="btn btn-success btn-sm">Gérer les devis</Link>
            </div>

            {enAttente.length === 0 ? (
                <p className="text-muted mb-5">Aucun devis en attente. Tout est à jour.</p>
            ) : (
                <ul className="list-group mb-5">
                    {enAttente.slice(0, 5).map((d) => (
                        <li key={d.idDevis} className="list-group-item d-flex flex-wrap justify-content-between gap-2">
                            <span>
                                <strong>{d.reference}</strong>
                                <span className="text-muted"> · {d.nomContact} · {new Date(d.dateCreation).toLocaleDateString("fr-FR")}</span>
                            </span>
                            <strong>{formatPrix(d.totalTtc)}</strong>
                        </li>
                    ))}
                </ul>
            )}

            <h2 className="h5 fw-bold mb-3">Raccourcis</h2>
            <div className="d-flex flex-wrap gap-3">
                <Link to="/gestion-devis" className="btn btn-outline-success">Gestion des devis</Link>
                <Link to="/gestion-services" className="btn btn-outline-success">Gestion des services</Link>
                <Link to="/gestion-utilisateurs" className="btn btn-outline-success">Gestion des utilisateurs</Link>
            </div>
        </div>
    );
};

export default AdminDashboard;
