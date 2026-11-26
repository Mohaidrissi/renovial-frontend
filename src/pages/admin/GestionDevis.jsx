import { Fragment, useEffect, useState } from "react";
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
    // Devis en cours de traitement : { idDevis, code, commentaire }, ou null
    const [traitement, setTraitement] = useState(null);

    useEffect(() => {
        adminDevisService.recupererTousLesDevis()
            .then((data) => setDevis(data))
            .catch(() => setErreur("Impossible de charger les devis."))
            .finally(() => setChargement(false));
    }, []);

    // Accepter ou refuser : on remplace la ligne par le devis renvoyé par le serveur
    const confirmerStatut = () => {
        setErreur("");
        const { idDevis, code, commentaire } = traitement;
        adminDevisService.changerStatut(idDevis, code, commentaire)
            .then((maj) => {
                setDevis((liste) => liste.map((d) => (d.idDevis === idDevis ? maj : d)));
                setTraitement(null);
            })
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
                                <Fragment key={d.idDevis}>
                                <tr>
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
                                        {d.commentaireAdmin && (
                                            <div className="small text-secondary mt-1">« {d.commentaireAdmin} »</div>
                                        )}
                                    </td>
                                    <td className="text-nowrap">
                                        {d.statut === "En attente" && traitement?.idDevis !== d.idDevis && (
                                            <>
                                                <button className="btn btn-sm btn-success me-2"
                                                        onClick={() => setTraitement({ idDevis: d.idDevis, code: "ACCEPTE", commentaire: "" })}>
                                                    Accepter
                                                </button>
                                                <button className="btn btn-sm btn-outline-danger"
                                                        onClick={() => setTraitement({ idDevis: d.idDevis, code: "REFUSE", commentaire: "" })}>
                                                    Refuser
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>

                                {/* Zone de commentaire sous la ligne, avant de confirmer */}
                                {traitement?.idDevis === d.idDevis && (
                                    <tr>
                                        <td colSpan="7" className="bg-light">
                                            <label htmlFor="commentaire" className="form-label fw-semibold">
                                                {traitement.code === "ACCEPTE"
                                                    ? "Message pour le client (facultatif)"
                                                    : "Pourquoi le devis est refusé ? (obligatoire)"}
                                            </label>
                                            <textarea id="commentaire" className="form-control mb-2" rows="2" maxLength="1000"
                                                      value={traitement.commentaire}
                                                      onChange={(e) => setTraitement({ ...traitement, commentaire: e.target.value })} />
                                            <button className={`btn btn-sm me-2 ${traitement.code === "ACCEPTE" ? "btn-success" : "btn-danger"}`}
                                                    onClick={confirmerStatut}>
                                                {traitement.code === "ACCEPTE" ? "Confirmer l'acceptation" : "Confirmer le refus"}
                                            </button>
                                            <button className="btn btn-sm btn-outline-secondary" onClick={() => setTraitement(null)}>
                                                Annuler
                                            </button>
                                        </td>
                                    </tr>
                                )}
                                </Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default GestionDevis;