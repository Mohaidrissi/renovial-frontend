import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import devisService from "../../services/client/devisService";

const formaterPrix = (prix) =>
    Number(prix).toLocaleString("fr-FR", { style: "currency", currency: "EUR" });

const formaterNombre = (nombre) => Number(nombre).toLocaleString("fr-FR");

const styleStatut = (statut) => {
    if (statut === "En attente") return { backgroundColor: "#FEF3C7", color: "#92400E" };
    if (statut === "En cours de traitement") return { backgroundColor: "#DBEAFE", color: "#1E40AF" };
    if (statut === "Accepté") return { backgroundColor: "#E6F7EE", color: "#0F5132" };
    if (statut === "Refusé") return { backgroundColor: "#FEE2E2", color: "#991B1B" };
    return { backgroundColor: "#F3F4F6", color: "#6B7280" };
};

const DetailDevis = () => {
    const { idDevis } = useParams();
    const [devis, setDevis] = useState(null);
    const [erreur, setErreur] = useState("");

    useEffect(() => {
        devisService.recupererMonDevis(idDevis)
            .then((data) => setDevis(data))
            .catch((error) => setErreur(error.response?.data?.message || "Impossible de charger le devis."));
    }, [idDevis]);

    const boutonRetour = (
        <Link
            to="/mes-devis"
            className="btn px-4 py-2"
            style={{
                color: "#0F5132",
                border: "1px solid #0F5132",
                borderRadius: "8px"
            }}
        >
            ← Retour à mes devis
        </Link>
    );

    if (erreur) {
        return (
            <div className="container-fluid px-4 py-5">
                <div className="alert alert-danger">{erreur}</div>
                {boutonRetour}
            </div>
        );
    }

    if (!devis) {
        return <div className="container-fluid px-4 py-5"><p>Chargement...</p></div>;
    }

    const tva = devis.totalTtc - devis.totalHt;

    return (
        <div className="container-fluid px-4 py-5">

            {/* En-tête du devis */}
            <div className="mb-5">
                <div className="d-flex flex-wrap align-items-center gap-3 mb-3">
                    <h2 className="fw-bold mb-0" style={{ color: "#1F2937" }}>
                        Devis n° {devis.reference}
                    </h2>

                    <span className="badge rounded-pill px-3 py-2" style={styleStatut(devis.statut)}>
                        {devis.statut}
                    </span>
                </div>

                <p className="text-muted mb-0">
                    Demandé le {new Date(devis.dateCreation).toLocaleDateString("fr-FR")} · {devis.typeBien}
                </p>
            </div>

            {/* Liste des travaux */}
            <section className="mb-5">
                <h5 className="fw-bold mb-3" style={{ color: "#1F2937" }}>
                    Détail des travaux
                </h5>

                <div className="table-responsive">
                    <table className="table align-middle">
                        <thead>
                            <tr style={{ color: "#6B7280" }}>
                                <th className="py-3">Travail</th>
                                <th>Quantité</th>
                                <th>Prix unitaire HT</th>
                                <th>TVA</th>
                                <th>Total HT</th>
                            </tr>
                        </thead>

                        <tbody>
                            {devis.lignes.map((ligne) => (
                                <tr key={ligne.service}>
                                    <td className="py-4 fw-semibold">{ligne.service}</td>
                                    <td>{formaterNombre(ligne.quantite)} {ligne.unite}</td>
                                    <td>{formaterPrix(ligne.prixUnitaire)}</td>
                                    <td>{formaterNombre(ligne.tauxTva)} %</td>
                                    <td className="fw-bold">{formaterPrix(ligne.totalHt)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {devis.precisions && (
                    <p className="text-muted mb-0">
                        <strong>Vos précisions :</strong> {devis.precisions}
                    </p>
                )}
            </section>

            {/* Commentaire et récapitulatif */}
            <div className="row g-4 mb-5">

                <div className="col-md-6">
                    <section>
                        <div
                            className="p-4 rounded"
                            style={{
                                backgroundColor: "#E6F7EE",
                                borderLeft: "4px solid #22C55E"
                            }}
                        >
                            <h5 className="fw-bold mb-3" style={{ color: "#0F5132" }}>
                                Commentaire de Rénovial
                            </h5>

                            <p className="mb-0" style={{ color: "#1F2937" }}>
                                {devis.commentaireAdmin || "Pas encore de commentaire. Nous étudions votre demande."}
                            </p>
                        </div>
                    </section>
                </div>

                <div className="col-md-6">
                    <section>
                        <h5 className="fw-bold mb-3" style={{ color: "#1F2937" }}>
                            Récapitulatif
                        </h5>

                        <div className="py-2 border-bottom">
                            <p className="text-muted mb-1">Total HT</p>
                            <strong>{formaterPrix(devis.totalHt)}</strong>
                        </div>

                        <div className="py-2 border-bottom">
                            <p className="text-muted mb-1">TVA</p>
                            <strong>{formaterPrix(tva)}</strong>
                        </div>

                        <div className="py-3">
                            <p className="fw-bold mb-1">Total TTC</p>
                            <strong className="fs-4" style={{ color: "#22C55E" }}>
                                {formaterPrix(devis.totalTtc)}
                            </strong>
                        </div>
                    </section>
                </div>

            </div>

            {/* Boutons */}
            <div className="d-flex flex-wrap gap-3 mb-4">
                {boutonRetour}

                <button
                    type="button"
                    onClick={() => window.print()}
                    className="btn px-4 py-2 text-white"
                    style={{
                        backgroundColor: "#22C55E",
                        borderRadius: "8px"
                    }}
                >
                    Télécharger le devis (PDF)
                </button>
            </div>

        </div>
    );
};

export default DetailDevis;
