import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import profilService from "../../services/client/profilService";

// Mêmes règles que le serveur (et que les colonnes en base)
const validationSchema = Yup.object({
    nom: Yup.string()
        .trim()
        .max(100, "100 caractères maximum")
        .required("Le nom est obligatoire"),

    telephone: Yup.string()
        .trim()
        .max(20, "20 caractères maximum")
        .required("Le numéro de téléphone est obligatoire")
});

const Profil = () => {
    const [profil, setProfil] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const onSubmit = async (values) => {
        setErrorMessage("");
        setSuccessMessage("");
        try {
            const maj = await profilService.modifierProfil(values);
            setProfil(maj);
            setSuccessMessage("Vos informations ont été enregistrées.");
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "Impossible d'enregistrer vos informations.");
        }
    };

    const formik = useFormik({
        initialValues: { nom: "", telephone: "" },
        validationSchema,
        onSubmit
    });

    // Au chargement : on lit le profil et on remplit le formulaire
    const { resetForm } = formik;
    useEffect(() => {
        profilService.recupererProfil()
            .then((data) => {
                setProfil(data);
                resetForm({ values: { nom: data.nom || "", telephone: data.telephone || "" } });
            })
            .catch(() => setErrorMessage("Impossible de charger votre profil."));
    }, [resetForm]);

    const champ = (name, label, type = "text") => (
        <div className="mb-3">
            <label htmlFor={name} className="form-label fw-semibold">{label}</label>
            <input
                id={name}
                type={type}
                name={name}
                className={`form-control form-control-lg ${
                    formik.touched[name] && formik.errors[name] ? "is-invalid" : ""
                }`}
                value={formik.values[name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.touched[name] && formik.errors[name] && (
                <div className="invalid-feedback">{formik.errors[name]}</div>
            )}
        </div>
    );

    return (
        <main className="bg-light py-5" style={{ fontFamily: "Poppins, sans-serif" }}>
            <div className="container-fluid px-4 px-md-5">
                <div className="row">
                    <div className="col-12 col-md-9 col-lg-7">
                        <div className="card border-0 shadow-sm rounded-4">
                            <div className="card-body p-4 p-md-5">

                                <p className="fw-bold mb-2" style={{ color: "#0F5132" }}>MON ESPACE</p>
                                <h4 className="fw-bold mb-1" style={{ color: "#1F2937" }}>Mon profil</h4>
                                <p className="text-secondary mb-4">
                                    {profil
                                        ? `Client depuis le ${new Date(profil.dateCreation).toLocaleDateString("fr-FR")}`
                                        : "Chargement..."}
                                </p>

                                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                                {successMessage && <div className="alert alert-success">{successMessage}</div>}

                                {profil && (
                                    <form onSubmit={formik.handleSubmit}>

                                        {champ("nom", "Nom")}

                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label fw-semibold">Adresse e-mail</label>
                                            <input
                                                id="email"
                                                type="email"
                                                className="form-control form-control-lg"
                                                value={profil.email}
                                                disabled
                                            />
                                            <div className="form-text">
                                                L'adresse e-mail sert à vous connecter : elle ne peut pas être modifiée.
                                            </div>
                                        </div>

                                        {champ("telephone", "Téléphone", "tel")}

                                        <button
                                            type="submit"
                                            className="btn btn-lg text-white px-4"
                                            style={{ backgroundColor: "#22C55E", borderRadius: "8px" }}
                                            disabled={formik.isSubmitting}
                                        >
                                            {formik.isSubmitting ? "Enregistrement..." : "Enregistrer"}
                                        </button>

                                    </form>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Profil;
