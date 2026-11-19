import React from "react";
import { Link } from "react-router-dom";

const MesDevis = () => {
    const devis = [
        {
            date: "09/10/2026",
            reference: "2026-001",
            total: "5 618 €",
            statut: "En attente"
        },
        {
            date: "02/10/2026",
            reference: "2026-000",
            total: "3 200 €",
            statut: "Validé"
        },
        {
            date: "25/09/2026",
            reference: "2025-042",
            total: "1 450 €",
            statut: "Refusé"
        },
        {
            date: "12/09/2026",
            reference: "2025-038",
            total: "8 900 €",
            statut: "Validé"
        }
    ];

    const getStatutStyle = (statut) => {
        switch (statut) {
            case "En attente":
                return {
                    backgroundColor: "#FEF3C7",
                    color: "#92400E"
                };
            case "Validé":
                return {
                    backgroundColor: "#E6F7EE",
                    color: "#0F5132"
                };
            case "Refusé":
                return {
                    backgroundColor: "#FEE2E2",
                    color: "#991B1B"
                };
            default:
                return {
                    backgroundColor: "#F3F4F6",
                    color: "#6B7280"
                };
        }
    };

    return (
        <div className="container-fluid px-4 px-md-5 py-5">

            <div className="mb-5">
                <p className="fw-bold mb-2" style={{ color: "#0F5132" }}>
                    MON ESPACE
                </p>

                <h2 className="fw-bold mb-2" style={{ color: "#1F2937" }}>
                    Mes devis
                </h2>

                <p className="text-muted mb-0">
                    Retrouvez et consultez l'ensemble de vos demandes de devis.
                </p>
            </div>

            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">

                <h5 className="fw-bold mb-0" style={{ color: "#1F2937" }}>
                    Historique de mes devis
                </h5>

                <Link
                    to="/devis"
                    className="btn text-white px-4 py-2"
                    style={{
                        backgroundColor: "#22C55E",
                        borderRadius: "8px"
                    }}
                >
                    + Nouveau devis
                </Link>

            </div>

            <div className="table-responsive">

                <table className="table align-middle mb-0">

                    <thead style={{ backgroundColor: "#F3F4F6" }}>
                        <tr style={{ color: "#6B7280" }}>
                            <th className="py-3 px-3">Date</th>
                            <th className="py-3">Référence</th>
                            <th className="py-3">Total TTC</th>
                            <th className="py-3">Statut</th>
                            <th className="py-3">Action</th>
                        </tr>
                    </thead>

                    <tbody>

                        {devis.map((item) => (

                            <tr key={item.reference}>

                                <td className="py-4 px-3">
                                    {item.date}
                                </td>

                                <td className="fw-semibold">
                                    {item.reference}
                                </td>

                                <td className="fw-bold">
                                    {item.total}
                                </td>

                                <td>
                                    <span
                                        className="badge rounded-pill px-3 py-2"
                                        style={getStatutStyle(item.statut)}
                                    >
                                        {item.statut}
                                    </span>
                                </td>

                                <td>
                                    <Link
                                        to="/detail-devis"
                                        className="fw-semibold text-decoration-none"
                                        style={{ color: "#22C55E" }}
                                    >
                                        Voir →
                                    </Link>
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

            {devis.length === 0 && (
                <div className="py-5">
                    <p className="fw-semibold mb-2">
                        Vous n'avez pas encore de devis.
                    </p>

                    <Link to="/devis" style={{ color: "#22C55E" }}>
                        Créer mon premier devis
                    </Link>
                </div>
            )}

        </div>
    );
};

export default MesDevis;