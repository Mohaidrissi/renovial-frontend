import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Adresse e-mail invalide")
        .required("L'adresse e-mail est obligatoire"),

      password: Yup.string()
        .required("Le mot de passe est obligatoire")
    }),

    onSubmit: (values) => {
      console.log(values);
    }
  });

  return (
    <main className="bg-light min-vh-100 d-flex align-items-center py-5">

      <div className="container">
        <div className="row justify-content-center">

          <div className="col-12 col-sm-10 col-md-8 col-lg-8 col-xl-6">

            <div className="card border-0 shadow rounded-4">
              <div className="card-body p-4 p-md-5">

                <div className="text-center mb-4">


                  <h4 className="fw-bold mt-4">
                    Bienvenue !
                  </h4>

                  <p className="text-secondary">
                    Connectez-vous à votre espace client.
                  </p>
                </div>

                <form onSubmit={formik.handleSubmit}>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Adresse e-mail
                    </label>

                    <input
                      type="email"
                      name="email"
                      className={`form-control form-control-lg ${formik.touched.email && formik.errors.email
                          ? "is-invalid"
                          : ""
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

                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                      Mot de passe
                    </label>

                    <input
                      type="password"
                      name="password"
                      className={`form-control form-control-lg ${formik.touched.password && formik.errors.password
                          ? "is-invalid"
                          : ""
                        }`}
                      placeholder="Votre mot de passe"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />

                    {formik.touched.password && formik.errors.password && (
                      <div className="invalid-feedback">
                        {formik.errors.password}
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-success btn-lg w-100 rounded-pill"
                  >
                    Se connecter
                  </button>

                </form>

                <div className="text-center mt-4">
                  <p className="text-secondary mb-1">
                    Vous n'avez pas encore de compte ?
                  </p>

                  <Link
                    to="/register"
                    className="text-success fw-bold text-decoration-none"
                  >
                    Créer un compte
                  </Link>
                </div>

                <div className="text-center mt-3">
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

export default Login;