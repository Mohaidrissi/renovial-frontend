import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import authService from "../../services/auth/authService";
import { useState } from "react";

const Register = () => {

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();

    const initialValues = {
        nom: "",
        email: "",
        telephone: "",
        password: "",
        confirmPassword: ""
    };

    const validationSchema = Yup.object({
        nom: Yup.string()
            .required("Le nom est obligatoire"),

        email: Yup.string()
            .email("Adresse e-mail invalide")
            .required("L'adresse e-mail est obligatoire"),

        telephone: Yup.string()
            .required("Le numéro de téléphone est obligatoire"),

        password: Yup.string()
            .min(8, "Le mot de passe doit contenir au moins 8 caractères")
            .required("Le mot de passe est obligatoire"),

        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Les mots de passe ne correspondent pas")
            .required("La confirmation du mot de passe est obligatoire")
    });

    const onSubmit = async (values) => {

        setErrorMessage("");
        setSuccessMessage("");

        const registerData = {
            nom: values.nom,
            email: values.email,
            telephone: values.telephone,
            password: values.password
        };

        try {
            await authService.sInscrire(registerData);

            setSuccessMessage("Votre compte a été créé avec succès.");

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (error) {
            console.error(error);

            setErrorMessage(
                error.response?.data?.message ||
                "Erreur lors de l'inscription. Cette adresse e-mail est peut-être déjà utilisée."
            );
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    });

    return (
        <main
            className="bg-light min-vh-100 py-5"
            style={{ fontFamily: "Poppins, sans-serif" }}
        >

            <div className="container-fluid px-4 px-md-5">

                <div className="row">

                    <div className="col-12 col-md-9 col-lg-7">

                        <div className="card border-0 shadow-sm rounded-4">

                            <div className="card-body p-4 p-md-5">

                                <h4 className="fw-bold mt-2" style={{ color: "#0F5132" }}>
                                    Créer un compte
                                </h4>

                                <p className="text-secondary mb-4">
                                    Suivez vos devis en quelques clics.
                                </p>

                                <form onSubmit={formik.handleSubmit}>

                                    <div className="mb-3">

                                        <label className="form-label fw-semibold">
                                            Nom
                                        </label>

                                        <input
                                            type="text"
                                            name="nom"
                                            className={`form-control form-control-lg ${
                                                formik.touched.nom && formik.errors.nom ? "is-invalid" : ""
                                            }`}
                                            placeholder="Votre nom"
                                            value={formik.values.nom}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />

                                        {formik.touched.nom && formik.errors.nom && (
                                            <div className="invalid-feedback">
                                                {formik.errors.nom}
                                            </div>
                                        )}

                                    </div>

                                    <div className="mb-3">

                                        <label className="form-label fw-semibold">
                                            Adresse e-mail
                                        </label>

                                        <input
                                            type="email"
                                            name="email"
                                            className={`form-control form-control-lg ${
                                                formik.touched.email && formik.errors.email ? "is-invalid" : ""
                                            }`}
                                            placeholder="exemple@email.com"
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />

                                        {formik.touched.email && formik.errors.email && (
                                            <div className="invalid-feedback">
                                                {formik.errors.email}
                                            </div>
                                        )}

                                    </div>

                                    <div className="mb-3">

                                        <label className="form-label fw-semibold">
                                            Téléphone
                                        </label>

                                        <input
                                            type="tel"
                                            name="telephone"
                                            className={`form-control form-control-lg ${
                                                formik.touched.telephone && formik.errors.telephone ? "is-invalid" : ""
                                            }`}
                                            placeholder="Votre numéro de téléphone"
                                            value={formik.values.telephone}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />

                                        {formik.touched.telephone && formik.errors.telephone && (
                                            <div className="invalid-feedback">
                                                {formik.errors.telephone}
                                            </div>
                                        )}

                                    </div>

                                    <div className="mb-3">

                                        <label className="form-label fw-semibold">
                                            Mot de passe
                                        </label>

                                        <div className="input-group">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                className={`form-control form-control-lg ${
                                                    formik.touched.password && formik.errors.password ? "is-invalid" : ""
                                                }`}
                                                placeholder="Votre mot de passe"
                                                value={formik.values.password}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />

                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary"
                                                onClick={() => setShowPassword(!showPassword)}
                                                aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                                            >
                                                {showPassword ? "🙈" : "👁"}
                                            </button>
                                        </div>

                                        {formik.touched.password && formik.errors.password && (
                                            <div className="text-danger small mt-1">
                                                {formik.errors.password}
                                            </div>
                                        )}

                                    </div>

                                    <div className="mb-4">

                                        <label className="form-label fw-semibold">
                                            Confirmer le mot de passe
                                        </label>

                                        <div className="input-group">
                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                name="confirmPassword"
                                                className={`form-control form-control-lg ${
                                                    formik.touched.confirmPassword && formik.errors.confirmPassword ? "is-invalid" : ""
                                                }`}
                                                placeholder="Confirmez votre mot de passe"
                                                value={formik.values.confirmPassword}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />

                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                aria-label={showConfirmPassword ? "Masquer la confirmation" : "Afficher la confirmation"}
                                            >
                                                {showConfirmPassword ? "🙈" : "👁"}
                                            </button>
                                        </div>

                                        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                            <div className="text-danger small mt-1">
                                                {formik.errors.confirmPassword}
                                            </div>
                                        )}

                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-success btn-lg w-100 rounded-pill"
                                        disabled={formik.isSubmitting}
                                    >
                                        {formik.isSubmitting ? "Inscription en cours..." : "S'inscrire"}
                                    </button>

                                    {errorMessage && (
                                        <div className="alert alert-danger mt-3">
                                            {errorMessage}
                                        </div>
                                    )}

                                    {successMessage && (
                                        <div className="alert alert-success mt-3">
                                            {successMessage}
                                        </div>
                                    )}

                                </form>

                                <div className="mt-4">

                                    <p className="text-secondary mb-1">
                                        Vous avez déjà un compte ?
                                    </p>

                                    <Link
                                        to="/login"
                                        className="text-success fw-bold text-decoration-none"
                                    >
                                        Se connecter
                                    </Link>

                                </div>

                                <div className="mt-3">

                                    <Link
                                        to="/"
                                        className="text-secondary text-decoration-none small"
                                    >
                                        Retour à l'accueil
                                    </Link>

                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </main>
    );
};

export default Register;