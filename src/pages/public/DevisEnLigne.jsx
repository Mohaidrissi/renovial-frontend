import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import prestationService from "../../services/public/prestationService";
import typeBienService from "../../services/public/typeBienService.js";
import devisService from "../../services/client/devisService";

const DevisEnLigne = () => {

    const navigate = useNavigate();

    const [typesBien, setTypesBien] = useState([]);
    const [idTypeBien, setIdTypeBien] = useState("");

    const [travaux, setTravaux] = useState([]);
    const [chargement, setChargement] = useState(true);
    const [envoi, setEnvoi] = useState(false);
    const [erreur, setErreur] = useState("");

    const [coordonnees, setCoordonnees] = useState({
        nom: "",
        email: "",
        telephone: "",
        precisions: ""
    });

    useEffect(() => {

        const chargerDonnees = async () => {

            try {

                const [prestations, types] = await Promise.all([
                    prestationService.recupererPrestationsActives(),
                    typeBienService.recupererTypesBien()
                ]);

                const unites = {
                    M2: "m²",
                    ML: "ml",
                    U: "unité",
                    M3: "m³",
                    FORFAIT: "forfait"
                };

                const prestationsFormatees = prestations.map(service => ({
                    id: service.idService,
                    nom: service.nom,
                    description: service.description,
                    prix: Number(service.prixUnitaire),
                    unite: unites[service.unite.code] || service.unite.libelle,
                    quantite: "",
                    actif: service.actif,
                    selectionne: false
                }));

                setTravaux(prestationsFormatees);
                setTypesBien(types);

                const appartement = types.find(
                    type => type.libelle === "Appartement"
                );

                if (appartement) {
                    setIdTypeBien(appartement.idTypeBien);
                } else if (types.length > 0) {
                    setIdTypeBien(types[0].idTypeBien);
                }

            } catch (error) {

                setErreur("Impossible de charger les données du devis.");

            } finally {

                setChargement(false);

            }

        };

        chargerDonnees();

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
                ? {
                    ...travail,
                    quantite: quantite === ""
                        ? ""
                        : Math.max(0, Number(quantite))
                }
                : travail
        ));

    };

    const travauxSelectionnes = travaux.filter(
        travail =>
            travail.actif &&
            travail.selectionne &&
            Number(travail.quantite) > 0
    );

    const totalHT = travauxSelectionnes.reduce(
        (total, travail) =>
            total + travail.prix * Number(travail.quantite),
        0
    );

    const tva = totalHT * 0.055;
    const totalTTC = totalHT + tva;

    const typeBienSelectionne = typesBien.find(
        type => type.idTypeBien === Number(idTypeBien)
    );

    const afficherTypeBien = (libelle) => {
        return libelle === "Local professionnel" ? "Local pro" : libelle;
    };

    const formaterPrix = (prix) =>
        prix.toLocaleString("fr-FR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }) + " €";

    const envoyerDemande = async (e) => {

        e.preventDefault();

        if (!idTypeBien) {
            setErreur("Veuillez sélectionner un type de bien.");
            return;
        }

        if (travauxSelectionnes.length === 0) {
            setErreur("Veuillez sélectionner au moins un travail avec une quantité supérieure à zéro.");
            return;
        }

        setErreur("");
        setEnvoi(true);

        try {

            const devisData = {
                nom: coordonnees.nom,
                email: coordonnees.email,
                telephone: coordonnees.telephone,
                precisions: coordonnees.precisions,
                idTypeBien: Number(idTypeBien),
                travaux: travauxSelectionnes.map(travail => ({
                    idService: travail.id,
                    quantite: Number(travail.quantite)
                }))
            };

            const response = await devisService.creerDevis(devisData);

            navigate("/confirmation-devis", {
                state: {
                    reference: response.reference,
                    totalHT: response.totalHt,
                    totalTVA: response.totalTva,
                    totalTTC: response.totalTtc,
                    typeBien: typeBienSelectionne?.libelle,
                    travaux: travauxSelectionnes,
                    coordonnees: coordonnees
                }
            });

        } catch (error) {

            setErreur(
                error.response?.data?.message ||
                "Impossible d'envoyer votre demande de devis."
            );

        } finally {

            setEnvoi(false);

        }

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

                                {typesBien.map(type => (

                                    <button
                                        key={type.idTypeBien}
                                        type="button"
                                        onClick={() => setIdTypeBien(type.idTypeBien)}
                                        className="btn px-4 py-1 rounded-pill"
                                        style={{
                                            backgroundColor: Number(idTypeBien) === type.idTypeBien ? "#E6F7EE" : "#FFFFFF",
                                            color: Number(idTypeBien) === type.idTypeBien ? "#0F5132" : "#1F2937",
                                            border: Number(idTypeBien) === type.idTypeBien
                                                ? "1px solid #22C55E"
                                                : "1px solid #D1D5DB"
                                        }}
                                    >
                                        {afficherTypeBien(type.libelle)}
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

                            {!chargement && travaux.length === 0 && (
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
                                            step="1"
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
                                Type de bien : {typeBienSelectionne
                                    ? afficherTypeBien(typeBienSelectionne.libelle)
                                    : "Non sélectionné"}
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
                                        {formaterPrix(travail.prix * Number(travail.quantite))}
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
                                🟠 Statut : en attente après envoi
                            </p>

                            {erreur && (
                                <div className="alert alert-danger small">
                                    {erreur}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={chargement || envoi}
                                className="btn w-100 text-white fw-semibold rounded-pill mb-2"
                                style={{ backgroundColor: "#22C55E" }}
                            >
                                {envoi ? "Envoi en cours..." : "Envoyer ma demande"}
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