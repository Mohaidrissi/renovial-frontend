import { Link, useLocation } from "react-router-dom";

const ConfirmationDevis = () => {
    const location = useLocation();

    const reference = location.state?.reference || "2026-001";
    const totalTTC = location.state?.totalTTC ?? 5618;

    const formaterPrix = (prix) => {
        return prix.toLocaleString("fr-FR", {
            maximumFractionDigits: 2
        }) + " €";
    };

    return (
        <div
            className="container-fluid px-4 py-5"
            style={{ minHeight: "550px" }}
        >
            <div
                className="mx-auto text-center"
                style={{ maxWidth: "520px" }}
            >
                {/* Icône de confirmation */}
                <div
                    className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                    style={{
                        width: "65px",
                        height: "65px",
                        backgroundColor: "#E6F7EE"
                    }}
                >
                    <div
                        className="rounded-circle d-flex align-items-center justify-content-center text-white"
                        style={{
                            width: "45px",
                            height: "45px",
                            backgroundColor: "#22C55E",
                            fontSize: "28px"
                        }}
                    >
                        ✓
                    </div>
                </div>

                {/* Message */}
                <h2
                    className="fw-bold mb-2"
                    style={{ color: "#1F2937" }}
                >
                    Demande envoyée
                </h2>

                <p className="text-muted mb-4">
                    Merci ! Notre équipe étudie votre demande et vous recontacte rapidement.
                </p>

                {/* Résumé du devis */}
                <div
                    className="rounded-4 p-4 text-start mb-4"
                    style={{ backgroundColor: "#F3F4F6" }}
                >
                    <h5 className="fw-bold mb-2">
                        Devis n° {reference}
                    </h5>

                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-muted">
                            Total TTC estimé
                        </span>

                        <strong
                            className="fs-5"
                            style={{ color: "#0F5132" }}
                        >
                            {formaterPrix(totalTTC)}
                        </strong>
                    </div>

                    <small className="text-muted">
                        <span style={{ color: "#F59E0B" }}>●</span>
                        {" "}Statut : en attente de validation
                    </small>
                </div>

                {/* Actions */}
                <div className="d-flex flex-wrap gap-3 mb-4">
                    <Link
                        to="/mes-devis"
                        className="btn text-white fw-semibold flex-fill"
                        style={{
                            backgroundColor: "#22C55E",
                            borderRadius: "20px"
                        }}
                    >
                        Voir le détail
                    </Link>

                    <Link
                        to="/"
                        className="btn fw-semibold flex-fill"
                        style={{
                            color: "#0F5132",
                            border: "1px solid #22C55E",
                            borderRadius: "20px"
                        }}
                    >
                        Retour à l'accueil
                    </Link>
                </div>

                {/* Inscription */}
                <div
                    className="rounded-4 p-4"
                    style={{ backgroundColor: "#E6F7EE" }}
                >
                    <p
                        className="fw-semibold mb-2"
                        style={{ color: "#0F5132" }}
                    >
                        Visiteur : créez un compte pour
                        <br />
                        suivre l'avancement de vos devis.
                    </p>

                    <Link
                        to="/register"
                        className="btn btn-sm text-white fw-semibold px-5"
                        style={{
                            backgroundColor: "#22C55E",
                            borderRadius: "20px"
                        }}
                    >
                        S'inscrire
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationDevis;