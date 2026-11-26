import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import adminUsersService from "../../services/admin/adminUsersService";

const GestionUtilisateurs = () => {
    const [utilisateurs, setUtilisateurs] = useState([]);
    const [chargement, setChargement] = useState(true);
    const [erreur, setErreur] = useState("");
    // Email de l'admin connecté (dans le token) : on ne lui propose pas de se bloquer
    const emailConnecte = useSelector((state) => state.auth.user?.username);

    useEffect(() => {
        adminUsersService.recupererTousLesUtilisateurs()
            .then((data) => setUtilisateurs(data))
            .catch(() => setErreur("Impossible de charger les utilisateurs."))
            .finally(() => setChargement(false));
    }, []);

    // On remplace la ligne par le compte renvoyé par le serveur
    const changerActif = (utilisateur) => {
        setErreur("");
        adminUsersService.changerActif(utilisateur.idUtilisateur, !utilisateur.actif)
            .then((maj) => setUtilisateurs((liste) =>
                liste.map((u) => (u.idUtilisateur === maj.idUtilisateur ? maj : u))))
            .catch((error) => setErreur(error.response?.data?.message || "Impossible de modifier ce compte."));
    };

    return (
        <div className="container py-4">
            <h1 className="h3 mb-4">Gestion des utilisateurs</h1>

            {chargement && <p>Chargement...</p>}
            {erreur && <div className="alert alert-danger">{erreur}</div>}

            {utilisateurs.length > 0 && (
                <div className="table-responsive">
                    <table className="table table-hover align-middle">
                        <thead className="table-light">
                            <tr>
                                <th>Nom</th>
                                <th>Email</th>
                                <th>Téléphone</th>
                                <th>Rôle</th>
                                <th>Inscrit le</th>
                                <th>Statut</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {utilisateurs.map((u) => (
                                <tr key={u.idUtilisateur} className={u.actif ? "" : "text-muted"}>
                                    <td className="fw-semibold">{u.nom}</td>
                                    <td>{u.email}</td>
                                    <td>{u.telephone}</td>
                                    <td>{u.role === "ROLE_ADMIN" ? "Admin" : "Client"}</td>
                                    <td>{new Date(u.dateCreation).toLocaleDateString("fr-FR")}</td>
                                    <td>
                                        <span className={`badge ${u.actif ? "bg-success" : "bg-secondary"}`}>
                                            {u.actif ? "Actif" : "Bloqué"}
                                        </span>
                                    </td>
                                    <td className="text-nowrap">
                                        {u.email === emailConnecte ? (
                                            <span className="text-secondary small">(vous)</span>
                                        ) : (
                                            <button type="button"
                                                className={`btn btn-sm ${u.actif ? "btn-outline-danger" : "btn-outline-success"}`}
                                                onClick={() => changerActif(u)}>
                                                {u.actif ? "Bloquer" : "Débloquer"}
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default GestionUtilisateurs;
