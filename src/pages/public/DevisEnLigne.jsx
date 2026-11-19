import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DevisEnLigne = () => {

    const navigate = useNavigate();

    const [typeBien, setTypeBien] = useState("Appartement");

    const [travaux, setTravaux] = useState([]);
    const [chargement, setChargement] = useState(true);
    const [erreur, setErreur] = useState("");

    const [coordonnees, setCoordonnees] = useState({
        nom: "",
        email: "",
        telephone: "",
        precisions: ""
    });


    useEffect(() => {

        const controller = new AbortController();

        const chargerServices = async () => {

            try {

                const response = await fetch(
                    "http://localhost:8081/api/services/actifs",
                    { signal: controller.signal }
                );

                if (!response.ok) {
                    throw new Error("Impossible de récupérer les services.");
                }

                const donnees = await response.json();

                const servicesFormates = donnees.map(service => {

                    const unites = {
                        M2: "m²",
                        ML: "ml",
                        U: "unité",
                        M3: "m³",
                        FORFAIT: "forfait"
                    };

                    return {
                        id: service.idService,
                        nom: service.nom,
                        description: service.description,
                        prix: Number(service.prixUnitaire),
                        unite: unites[service.unite.code] || service.unite.libelle,
                        quantite: 0,
                        actif: service.actif,
                        selectionne: false
                    };

                });

                setTravaux(servicesFormates);

            } catch (error) {

                if (error.name !== "AbortError") {
                    setErreur("Impossible de charger les services. Veuillez réessayer.");
                }

            } finally {

                if (!controller.signal.aborted) {
                    setChargement(false);
                }

            }

        };

        chargerServices();

        return () => controller.abort();

    }, []);

 
    const modifierSelection = (id) => {

        setTravaux(travaux.map(travail =>
            travail.id === id
                ? { ...travail, selectionne: !travail.selectionne }
                : travail
        ));

    };


    const modifierQuantite = (id, quantite) => {

        setTravaux(travaux.map(travail =>
            travail.id === id
                ? { ...travail, quantite: Math.max(0, Number(quantite)) }
                : travail
        ));

    };


    const travauxSelectionnes = travaux.filter(
        travail => travail.actif && travail.selectionne && travail.quantite > 0
    );

    const totalHT = travauxSelectionnes.reduce(
        (total, travail) => total + travail.prix * travail.quantite,
        0
    );

    const tva = totalHT * 0.055;
    const totalTTC = totalHT + tva;

  
    const formaterPrix = (prix) =>
        prix.toLocaleString("fr-FR", {
            maximumFractionDigits: 2
        }) + " €";

 
    const envoyerDemande = (e) => {

        e.preventDefault();

        if (travauxSelectionnes.length === 0) {
            alert("Veuillez sélectionner au moins un travail avec une quantité supérieure à zéro.");
            return;
        }

        const reference = `2026-${String(
            Math.floor(Math.random() * 999) + 1
        ).padStart(3, "0")}`;

        navigate("/confirmation-devis", {
            state: {
                reference: reference,
                totalTTC: Math.round(totalTTC),
                typeBien: typeBien,
                travaux: travauxSelectionnes,
                coordonnees: coordonnees
            }
        });

    };

    return (

        <div className="container-fluid px-4 px-md-5 py-4">

            <div className="mb-4">

                <p className="fw-bold small mb-1" style={{ color: "#22C55E" }}>
                    DEVIS EN LIGNE
                </p>

                <h2 className="fw-bold" style={{ color: "#1F2937" }}>
                    Estimez vos travaux de rénovation
                </h2>

            </div>

            <form onSubmit={envoyerDemande}>

                <div className="row g-4">

                    <div className="col-lg-8">

                  
                        <section className="mb-4">

                            <h6 className="fw-bold mb-3">
                                Type de bien
                            </h6>

                            <div className="d-flex flex-wrap gap-2">

                                {["Maison", "Appartement", "Local pro"].map(type => (

                                    <button
                                        key={type}
                                        type="button"
                                        onClick={() => setTypeBien(type)}
                                        className="btn px-4 py-1 rounded-pill"
                                        style={{
                                            backgroundColor: typeBien === type ? "#E6F7EE" : "#FFFFFF",
                                            color: typeBien === type ? "#0F5132" : "#1F2937",
                                            border: typeBien === type
                                                ? "1px solid #22C55E"
                                                : "1px solid #D1D5DB"
                                        }}
                                    >
                                        {type}
                                    </button>

                                ))}

                            </div>

                        </section>

            
                        <section className="mb-4">

                            <h6 className="fw-bold mb-3">
                                Travaux souhaités
                            </h6>

                            {chargement && (
                                <p className="text-muted">
                                    Chargement des services...
                                </p>
                            )}

                            {erreur && (
                                <div className="alert alert-danger">
                                    {erreur}
                                </div>
                            )}

                            {!chargement && !erreur && travaux.length === 0 && (
                                <p className="text-muted">
                                    Aucun service disponible pour le moment.
                                </p>
                            )}

                            {travaux.filter(travail => travail.actif).map(travail => (

                                <div
                                    key={travail.id}
                                    className="d-flex flex-wrap align-items-center gap-3 p-2 mb-2 rounded-3"
                                    style={{
                                        border: travail.selectionne
                                            ? "1px solid #22C55E"
                                            : "1px solid #D1D5DB",
                                        backgroundColor: travail.selectionne
                                            ? "#E6F7EE"
                                            : "#FFFFFF"
                                    }}
                                >

                                    <div className="form-check flex-grow-1 mb-0">

                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={travail.selectionne}
                                            onChange={() => modifierSelection(travail.id)}
                                            id={`travail-${travail.id}`}
                                            style={{ cursor: "pointer" }}
                                        />

                                        <label
                                            className="form-check-label fw-semibold"
                                            htmlFor={`travail-${travail.id}`}
                                            style={{ cursor: "pointer" }}
                                        >
                                            {travail.nom}
                                        </label>

                                    </div>

                                    <span className="text-muted small">
                                        {formaterPrix(travail.prix)}/{travail.unite}
                                    </span>

                                    <div style={{ width: "110px" }}>

                                        <input
                                            type="number"
                                            min="0"
                                            className="form-control form-control-sm text-center fw-semibold"
                                            value={travail.quantite}
                                            disabled={!travail.selectionne}
                                            onChange={(e) =>
                                                modifierQuantite(travail.id, e.target.value)
                                            }
                                            aria-label={`Quantité pour ${travail.nom}`}
                                        />

                                    </div>

                                </div>

                            ))}

                        </section>

                
                        <section className="mb-4">

                            <h6 className="fw-bold mb-2">
                                Coordonnées
                                <span className="text-muted small fw-normal">
                                </span>
                            </h6>

                            <div className="row g-2 mb-2">

                                <div className="col-md-4">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Votre nom"
                                        value={coordonnees.nom}
                                        onChange={(e) => setCoordonnees({
                                            ...coordonnees,
                                            nom: e.target.value
                                        })}
                                    />
                                </div>

                                <div className="col-md-4">
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="vous@email.fr"
                                        value={coordonnees.email}
                                        onChange={(e) => setCoordonnees({
                                            ...coordonnees,
                                            email: e.target.value
                                        })}
                                    />
                                </div>

                                <div className="col-md-4">
                                    <input
                                        type="tel"
                                        className="form-control"
                                        placeholder="06 00 00 00 00"
                                        value={coordonnees.telephone}
                                        onChange={(e) => setCoordonnees({
                                            ...coordonnees,
                                            telephone: e.target.value
                                        })}
                                    />
                                </div>

                            </div>

                            <textarea
                                className="form-control"
                                rows="3"
                                placeholder="Précisions (facultatif)"
                                value={coordonnees.precisions}
                                onChange={(e) => setCoordonnees({
                                    ...coordonnees,
                                    precisions: e.target.value
                                })}
                            />

                        </section>

                    </div>

                 
                    <div className="col-lg-4">

                        <section
                            className="p-4 rounded-4"
                            style={{ backgroundColor: "#F3F4F6" }}
                        >

                            <h5 className="fw-bold mb-4">
                                Votre devis
                            </h5>

                            <p className="small text-muted">
                                Type de bien : {typeBien}
                            </p>

                            {travauxSelectionnes.map(travail => (

                                <div
                                    key={travail.id}
                                    className="d-flex justify-content-between gap-2 mb-2"
                                >

                                    <div>
                                        <p className="small fw-semibold mb-0">
                                            {travail.nom}
                                        </p>

                                        <p className="small text-muted mb-0">
                                            {travail.quantite} {travail.unite}
                                        </p>
                                    </div>

                                    <strong className="small">
                                        {formaterPrix(travail.prix * travail.quantite)}
                                    </strong>

                                </div>

                            ))}

                            {travauxSelectionnes.length === 0 && (
                                <p className="text-muted small">
                                    Aucun travail sélectionné.
                                </p>
                            )}

                            <hr />

                            <div className="d-flex justify-content-between mb-3">
                                <span className="text-muted">Total HT</span>
                                <strong>{formaterPrix(totalHT)}</strong>
                            </div>

                            <div className="d-flex justify-content-between mb-3">
                                <span className="text-muted">TVA 5,5 %</span>
                                <strong>{formaterPrix(tva)}</strong>
                            </div>

                            <hr />

                            <div className="d-flex justify-content-between align-items-center mb-4">

                                <strong>Total TTC</strong>

                                <strong
                                    className="fs-5"
                                    style={{ color: "#0F5132" }}
                                >
                                    {formaterPrix(totalTTC)}
                                </strong>

                            </div>

                            <div
                                className="p-3 rounded-3 mb-3"
                                style={{ backgroundColor: "#E6F7EE" }}
                            >

                                <p className="small mb-1" style={{ color: "#0F5132" }}>
                                    Aides possibles : MaPrimeRénov'.
                                </p>

                                <p className="small text-muted mb-0">
                                    Estimation non contractuelle.
                                </p>

                            </div>

                            <p className="small text-muted mb-3">
                                🟠 Statut : brouillon
                            </p>

                            <button
                                type="submit"
                                disabled={chargement || !!erreur}
                                className="btn w-100 text-white fw-semibold rounded-pill mb-2"
                                style={{ backgroundColor: "#22C55E" }}
                            >
                                Envoyer ma demande
                            </button>

                            <button
                                type="button"
                                onClick={() => window.print()}
                                className="btn w-100 fw-semibold rounded-pill"
                                style={{
                                    color: "#0F5132",
                                    border: "1px solid #22C55E",
                                    backgroundColor: "#FFFFFF"
                                }}
                            >
                                Télécharger le PDF
                            </button>

                        </section>

                    </div>

                </div>

            </form>

        </div>

    );

};

export default DevisEnLigne;