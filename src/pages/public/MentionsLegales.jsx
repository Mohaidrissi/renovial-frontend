import { Link } from "react-router-dom";

const MentionsLegales = () => {
    return (
        <main
            className="w-100 py-5"
            style={{
                backgroundColor: "#FFFFFF",
                fontFamily: "Poppins, sans-serif"
            }}
        >
            <style>
                {`
                    .accordion-button {
                        background-color: #FFFFFF;
                        color: #1F2937;
                        box-shadow: none;
                    }

                    .accordion-button:not(.collapsed) {
                        background-color: #FFFFFF;
                        color: #0F5132;
                        box-shadow: none;
                    }

                    .accordion-button:focus {
                        border-color: transparent;
                        box-shadow: none;
                        outline: none;
                    }

                    .accordion-item {
                        border-left: none;
                        border-right: none;
                        border-radius: 0;
                    }

                    .accordion-body {
                        color: #1F2937;
                        text-align: left;
                    }
                `}
            </style>

            <div className="container-fluid px-4 px-md-5">

                <div className="mb-5 text-start">
                    <h1 className="fw-bold mb-3" style={{ color: "#1F2937" }}>
                        Mentions légales
                    </h1>

                    <p style={{ color: "#6B7280" }}>
                        Retrouvez les informations légales concernant le site Rénovial.
                    </p>
                </div>

                <div className="accordion text-start" id="accordionMentions">

                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button
                                className="accordion-button"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseOne"
                                aria-expanded="true"
                                aria-controls="collapseOne"
                            >
                                <strong>1. Éditeur du site</strong>
                            </button>
                        </h2>

                        <div
                            id="collapseOne"
                            className="accordion-collapse collapse show"
                            data-bs-parent="#accordionMentions"
                        >
                            <div className="accordion-body">
                                <p>Le présent site est édité par Rénovial, entreprise spécialisée dans la rénovation énergétique.</p>
                                <p>Nom : Rénovial</p>
                                <p>Adresse : 21 Avenue Albert, 59000 Lille</p>
                                <p>Téléphone : 06 50 47 48 38</p>
                                <p className="mb-0">E-mail : contact@renovial.fr</p>
                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseTwo"
                                aria-expanded="false"
                                aria-controls="collapseTwo"
                            >
                                <strong>2. Directeur de publication</strong>
                            </button>
                        </h2>

                        <div
                            id="collapseTwo"
                            className="accordion-collapse collapse"
                            data-bs-parent="#accordionMentions"
                        >
                            <div className="accordion-body">
                                Le directeur de publication est le responsable de l'entreprise Rénovial.
                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseThree"
                                aria-expanded="false"
                                aria-controls="collapseThree"
                            >
                                <strong>3. Hébergement du site</strong>
                            </button>
                        </h2>

                        <div
                            id="collapseThree"
                            className="accordion-collapse collapse"
                            data-bs-parent="#accordionMentions"
                        >
                            <div className="accordion-body">
                                Les informations relatives à l'hébergeur du site seront renseignées par Rénovial.
                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseFour"
                                aria-expanded="false"
                                aria-controls="collapseFour"
                            >
                                <strong>4. Propriété intellectuelle</strong>
                            </button>
                        </h2>

                        <div
                            id="collapseFour"
                            className="accordion-collapse collapse"
                            data-bs-parent="#accordionMentions"
                        >
                            <div className="accordion-body">
                                <p>L'ensemble des éléments présents sur ce site, notamment les textes, images, logos et éléments graphiques, sont protégés par les règles relatives à la propriété intellectuelle.</p>
                                <p className="mb-0">Toute reproduction ou utilisation sans autorisation préalable est interdite, sauf exceptions prévues par la loi.</p>
                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseFive"
                                aria-expanded="false"
                                aria-controls="collapseFive"
                            >
                                <strong>5. Responsabilité</strong>
                            </button>
                        </h2>

                        <div
                            id="collapseFive"
                            className="accordion-collapse collapse"
                            data-bs-parent="#accordionMentions"
                        >
                            <div className="accordion-body">
                                Rénovial s'efforce de fournir des informations exactes et régulièrement mises à jour. Toutefois, l'entreprise ne peut garantir l'exactitude et l'exhaustivité de toutes les informations publiées sur le site.
                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseSix"
                                aria-expanded="false"
                                aria-controls="collapseSix"
                            >
                                <strong>6. Données personnelles</strong>
                            </button>
                        </h2>

                        <div
                            id="collapseSix"
                            className="accordion-collapse collapse"
                            data-bs-parent="#accordionMentions"
                        >
                            <div className="accordion-body">
                                <p>Les informations transmises par les utilisateurs dans les formulaires du site sont utilisées dans le cadre du traitement de leurs demandes et de la gestion de leur relation avec Rénovial.</p>
                                <p className="mb-0">Les utilisateurs disposent des droits prévus par la réglementation applicable en matière de protection des données personnelles.</p>
                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseSeven"
                                aria-expanded="false"
                                aria-controls="collapseSeven"
                            >
                                <strong>7. Cookies</strong>
                            </button>
                        </h2>

                        <div
                            id="collapseSeven"
                            className="accordion-collapse collapse"
                            data-bs-parent="#accordionMentions"
                        >
                            <div className="accordion-body">
                                Le site peut utiliser des cookies ou autres traceurs nécessaires à son fonctionnement ou soumis au consentement de l'utilisateur, conformément à la réglementation applicable.
                            </div>
                        </div>
                    </div>

                </div>

                <div className="mt-4 text-start">
                    <Link
                        to="/"
                        className="text-decoration-none fw-semibold"
                        style={{ color: "#22C55E" }}
                    >
                        ← Retour à l'accueil
                    </Link>
                </div>

            </div>
        </main>
    );
};

export default MentionsLegales;
