import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import adminServicesService from "../../services/admin/adminServicesService";

const formatPrix = (prix) =>
    Number(prix).toLocaleString("fr-FR", { style: "currency", currency: "EUR" });

const videForm = { nom: "", description: "", prixUnitaire: "", codeUnite: "", economieEnergie: false };

// Mêmes règles que le serveur
const validationSchema = Yup.object({
    nom: Yup.string().trim().max(100, "100 caractères maximum").required("Le nom est obligatoire"),
    prixUnitaire: Yup.number()
        .typeError("Le prix doit être un nombre")
        .moreThan(0, "Le prix doit être supérieur à zéro")
        .required("Le prix est obligatoire"),
    codeUnite: Yup.string().required("Choisissez une unité")
});

// Ce que le serveur attend (ServiceRequest)
const versRequete = (valeurs, actif) => ({
    nom: valeurs.nom,
    description: valeurs.description,
    prixUnitaire: valeurs.prixUnitaire,
    economieEnergie: valeurs.economieEnergie,
    actif,
    codeUnite: valeurs.codeUnite
});

const GestionServices = () => {
    const [services, setServices] = useState([]);
    const [unites, setUnites] = useState([]);
    const [enModification, setEnModification] = useState(null); // le service modifié, ou null pour un ajout
    const [erreur, setErreur] = useState("");
    const [succes, setSucces] = useState("");

    useEffect(() => {
        Promise.all([adminServicesService.recupererTousLesServices(), adminServicesService.recupererUnites()])
            .then(([listeServices, listeUnites]) => {
                setServices(listeServices);
                setUnites(listeUnites);
            })
            .catch(() => setErreur("Impossible de charger les services."));
    }, []);

    // Après un enregistrement, on relit la liste : l'ordre reste celui du serveur
    const rechargerServices = () =>
        adminServicesService.recupererTousLesServices().then(setServices);

    const onSubmit = async (valeurs, { resetForm }) => {
        setErreur("");
        setSucces("");
        try {
            if (enModification) {
                await adminServicesService.modifierService(enModification.idService, versRequete(valeurs, enModification.actif));
            } else {
                await adminServicesService.creerService(versRequete(valeurs, true));
            }
            await rechargerServices();
            setSucces(enModification ? "Service modifié." : "Service ajouté.");
            setEnModification(null);
            resetForm({ values: videForm });
        } catch (error) {
            setErreur(error.response?.data?.message || "Impossible d'enregistrer le service.");
        }
    };

    const formik = useFormik({ initialValues: videForm, validationSchema, onSubmit });

    const commencerModification = (service) => {
        setErreur("");
        setSucces("");
        setEnModification(service);
        formik.resetForm({
            values: {
                nom: service.nom,
                description: service.description || "",
                prixUnitaire: service.prixUnitaire,
                codeUnite: service.unite.code,
                economieEnergie: service.economieEnergie
            }
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const annuler = () => {
        setEnModification(null);
        formik.resetForm({ values: videForm });
    };

    // Désactiver = le service n'est plus proposé dans le devis en ligne, mais les anciens devis restent intacts
    const changerActif = async (service) => {
        setErreur("");
        setSucces("");
        try {
            const valeurs = { ...service, codeUnite: service.unite.code };
            await adminServicesService.modifierService(service.idService, versRequete(valeurs, !service.actif));
            await rechargerServices();
        } catch (error) {
            setErreur(error.response?.data?.message || "Impossible de changer le statut du service.");
        }
    };

    const classeChamp = (name) =>
        `form-control ${formik.touched[name] && formik.errors[name] ? "is-invalid" : ""}`;

    const messageErreur = (name) =>
        formik.touched[name] && formik.errors[name] && <div className="invalid-feedback">{formik.errors[name]}</div>;

    return (
        <div className="container py-4">
            <h1 className="h3 mb-4">Gestion des services</h1>

            {erreur && <div className="alert alert-danger">{erreur}</div>}
            {succes && <div className="alert alert-success">{succes}</div>}

            {/* Formulaire : ajout, ou modification si un service est choisi */}
            <div className="card mb-4">
                <div className="card-body">
                    <h2 className="h5 mb-3">
                        {enModification ? `Modifier « ${enModification.nom} »` : "Ajouter un service"}
                    </h2>

                    <form onSubmit={formik.handleSubmit} className="row g-3">
                        <div className="col-md-6">
                            <label htmlFor="nom" className="form-label">Nom</label>
                            <input id="nom" name="nom" className={classeChamp("nom")}
                                value={formik.values.nom} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            {messageErreur("nom")}
                        </div>

                        <div className="col-md-3">
                            <label htmlFor="prixUnitaire" className="form-label">Prix unitaire HT (€)</label>
                            <input id="prixUnitaire" name="prixUnitaire" type="number" step="0.01" min="0"
                                className={classeChamp("prixUnitaire")}
                                value={formik.values.prixUnitaire} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            {messageErreur("prixUnitaire")}
                        </div>

                        <div className="col-md-3">
                            <label htmlFor="codeUnite" className="form-label">Unité</label>
                            <select id="codeUnite" name="codeUnite"
                                className={`form-select ${formik.touched.codeUnite && formik.errors.codeUnite ? "is-invalid" : ""}`}
                                value={formik.values.codeUnite} onChange={formik.handleChange} onBlur={formik.handleBlur}>
                                <option value="">Choisir...</option>
                                {unites.map((u) => (
                                    <option key={u.code} value={u.code}>{u.libelle} ({u.code})</option>
                                ))}
                            </select>
                            {messageErreur("codeUnite")}
                        </div>

                        <div className="col-12">
                            <label htmlFor="description" className="form-label">Description (facultatif)</label>
                            <textarea id="description" name="description" rows="2" className="form-control"
                                value={formik.values.description} onChange={formik.handleChange} />
                        </div>

                        <div className="col-12 form-check ms-2">
                            <input id="economieEnergie" name="economieEnergie" type="checkbox" className="form-check-input"
                                checked={formik.values.economieEnergie} onChange={formik.handleChange} />
                            <label htmlFor="economieEnergie" className="form-check-label">
                                Travaux d'économie d'énergie (TVA à 5,5 % pour un logement)
                            </label>
                        </div>

                        <div className="col-12 d-flex gap-2">
                            <button type="submit" className="btn btn-success" disabled={formik.isSubmitting}>
                                {enModification ? "Enregistrer" : "Ajouter"}
                            </button>
                            {enModification && (
                                <button type="button" className="btn btn-outline-secondary" onClick={annuler}>
                                    Annuler
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>

            {/* Liste de tous les services */}
            <div className="table-responsive">
                <table className="table table-hover align-middle">
                    <thead className="table-light">
                        <tr>
                            <th>Nom</th>
                            <th>Unité</th>
                            <th className="text-end">Prix HT</th>
                            <th>Économie d'énergie</th>
                            <th>Statut</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map((s) => (
                            <tr key={s.idService} className={s.actif ? "" : "text-muted"}>
                                <td className="fw-semibold">{s.nom}</td>
                                <td>{s.unite.code}</td>
                                <td className="text-end text-nowrap">{formatPrix(s.prixUnitaire)}</td>
                                <td>{s.economieEnergie ? "Oui" : "Non"}</td>
                                <td>
                                    <span className={`badge ${s.actif ? "bg-success" : "bg-secondary"}`}>
                                        {s.actif ? "Actif" : "Désactivé"}
                                    </span>
                                </td>
                                <td className="text-nowrap">
                                    <button type="button" className="btn btn-sm btn-outline-primary me-2"
                                        onClick={() => commencerModification(s)}>
                                        Modifier
                                    </button>
                                    <button type="button"
                                        className={`btn btn-sm ${s.actif ? "btn-outline-danger" : "btn-outline-success"}`}
                                        onClick={() => changerActif(s)}>
                                        {s.actif ? "Désactiver" : "Activer"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GestionServices;
