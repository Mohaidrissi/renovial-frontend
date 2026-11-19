import React from "react";
import { Link } from "react-router-dom";

const DetailDevis = () => {
    const travaux = [
        {
            nom: "Isolation écologique",
            surface: "45 m²",
            prix: "65 €/m²",
            total: 2925
        },
        {
            nom: "Peinture écologique",
            surface: "80 m²",
            prix: "30 €/m²",
            total: 2400
        }
    ];

    const totalHT = travaux.reduce((total, travail) => total + travail.total, 0);
    const tva = totalHT * 0.055;
    const totalTTC = totalHT + tva;

    const formaterPrix = (prix) => {
        return prix.toLocaleString("fr-FR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }) + " €";
    };

    const telechargerPDF = () => {
        window.print();
    };

    return (
        <div className="container-fluid px-4 py-5">

            {/* En-tête du devis */}
            <div className="mb-5">
                <div className="d-flex flex-wrap align-items-center gap-3 mb-3">
                    <h2 className="fw-bold mb-0" style={{ color: "#1F2937" }}>
                        Devis n° 2026-001
                    </h2>

                    <span
                        className="badge rounded-pill px-3 py-2"
                        style={{
                            backgroundColor: "#FEF3C7",
                            color: "#92400E"
                        }}
                    >
                        En attente
                    </span>
                </div>

                <p className="text-muted mb-0">
                    Retrouvez le détail de votre demande de devis.
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
                                <th>Surface</th>
                                <th>Prix unitaire</th>
                                <th>Total</th>
                            </tr>
                        </thead>

                        <tbody>
                            {travaux.map((travail, index) => (
                                <tr key={index}>
                                    <td className="py-4 fw-semibold">
                                        {travail.nom}
                                    </td>

                                    <td>{travail.surface}</td>

                                    <td>{travail.prix}</td>

                                    <td className="fw-bold">
                                        {formaterPrix(travail.total)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
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
                            <h5
                                className="fw-bold mb-3"
                                style={{ color: "#0F5132" }}
                            >
                                Commentaire de Rénovial
                            </h5>

                            <p className="mb-0" style={{ color: "#1F2937" }}>
                                Devis en cours d'étude. Nous vous recontactons sous 48 h.
                            </p>
                        </div>
                    </section>
                </div>

                <div className="col-md-6">
                    <section>
                        <h5
                            className="fw-bold mb-3"
                            style={{ color: "#1F2937" }}
                        >
                            Récapitulatif
                        </h5>

                        <div className="py-2 border-bottom">
                            <p className="text-muted mb-1">Total HT</p>
                            <strong>{formaterPrix(totalHT)}</strong>
                        </div>

                        <div className="py-2 border-bottom">
                            <p className="text-muted mb-1">TVA 5,5 %</p>
                            <strong>{formaterPrix(tva)}</strong>
                        </div>

                        <div className="py-3">
                            <p className="fw-bold mb-1">Total TTC</p>

                            <strong
                                className="fs-4"
                                style={{ color: "#22C55E" }}
                            >
                                {formaterPrix(totalTTC)}
                            </strong>
                        </div>
                    </section>
                </div>

            </div>

            {/* Boutons */}
            <div className="d-flex flex-wrap gap-3 mb-4">

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

                <button
                    type="button"
                    onClick={telechargerPDF}
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