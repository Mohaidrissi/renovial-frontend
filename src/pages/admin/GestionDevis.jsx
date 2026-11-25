import { useEffect, useState } from "react";
import adminDevisService from "../../services/admin/adminDevisService";

const couleurStatut = (statut) => {
    if (statut === "En attente") return "bg-warning text-dark";
    if (statut === "Accepté") return "bg-success";
    if (statut === "Refusé") return "bg-danger";
    if (statut === "En cours de traitement") return "bg-info text-dark";
    return "bg-secondary";
};

const formatPrix = (prix) =>
    Number(prix).toLocaleString("fr-FR", { style: "currency", currency: "EUR" });

const GestionDevis = () => {
    const [devis, setDevis] = useState([]);
    const [chargement, setChargement] = useState(true);
    const [erreur, setErreur] = useState("");

    useEffect(() => {
        adminDevisService.recupererTousLesDevis()
            .then((data) => setDevis(data))
            .catch(() => setErreur("Impossible de charger les devis."))
            .finally(() => setChargement(false));
    }, []);

    // Accepter ou refuser : on remplace la ligne par le devis renvoyé par le serveur
    const changerStatut = (idDevis, code) => {
        setErreur("");
        adminDevisService.changerStatut(idDevis, code)
            .then((maj) => setDevis((liste) => liste.map((d) => (d.idDevis === idDevis ? maj : d))))
            .catch((error) => setErreur(error.response?.data?.message || "Impossible de changer le statut."));
    };

    return (
        <div className="container py-4">
            <h1 className="h3 mb-4">Gestion des devis</h1>

            {chargement && <p>Chargement...</p>}
            {erreur && <div className="alert alert-danger">{erreur}</div>}
            {!chargement && devis.length === 0 && <p>Aucun devis pour le moment.</p>}

            {devis.length > 0 && (
                <div className="table-responsive">
                    <table className="table table-hover align-middle">
                        <thead className="table-light">
                            <tr>
                                <th>Référence</th>
                                <th>Date</th>
                                <th>Client</th>
                                <th>Type de bien</th>
                                <th className="text-end">Total TTC</th>
                                <th>Statut</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {devis.map((d) => (
                                <tr key={d.idDevis}>
                                    <td className="fw-semibold text-nowrap">{d.reference}</td>
                                    <td>{new Date(d.dateCreation).toLocaleDateString("fr-FR")}</td>
                                    <td>
                                        {d.nomContact}
                                        <br />
                                        <small className="text-secondary">{d.emailContact}</small>
                                    </td>
                                    <td>{d.typeBien}</td>
                                    <td className="text-end">{formatPrix(d.totalTtc)}</td>
                                    <td>
                                        <span className={`badge ${couleurStatut(d.statut)}`}>{d.statut}</span>
                                    </td>
                                    <td className="text-nowrap">
                                        {d.statut === "En attente" && (
                                            <>
                                                <button className="btn btn-sm btn-success me-2"
                                                        onClick={() => changerStatut(d.idDevis, "ACCEPTE")}>
                                                    Accepter
                                                </button>
                                                <button className="btn btn-sm btn-outline-danger"
                                                        onClick={() => changerStatut(d.idDevis, "REFUSE")}>
                                                    Refuser
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default GestionDevis;