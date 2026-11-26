import Icone from "../../components/common/Icone";
import "./Accueil.css";

// Sections partagées par la page d’Accueil et les pages À propos / Contact (écrites une seule fois)
export const EMAIL_RENOVIAL = "renovial@orange.fr";
export const TELEPHONE_RENOVIAL = "06.50.47.48.38";

export const Coche = ({ children }) => (
    <li className="d-flex align-items-center gap-2 mb-2">
        <span className="texte-vert"><Icone nom="coche" taille={16} /></span>
        {children}
    </li>
);

export const SectionApropos = () => (
    <section id="apropos" className="container py-5 my-5">
        <div className="row align-items-center g-4 g-lg-5">
            <div className="col-lg-6">
                <div className="photo-apropos shadow">
                    <div className="position-absolute bottom-0 end-0 m-4 bg-white rounded-3 shadow p-3 d-flex align-items-center gap-2">
                        <span className="pastille-icone"><Icone nom="feuille" /></span>
                        <span className="small fw-semibold">Moins de chauffage,<br />plus de confort.</span>
                    </div>
                </div>
            </div>
            <div className="col-lg-6">
                <div className="surtitre mb-2">À propos de Renovial</div>
                <h2 className="display-6 fw-bold mb-3">Votre partenaire pour une rénovation énergétique réussie</h2>
                <p className="text-secondary mb-4">
                    Située à Lille, Renovial est une entreprise tous corps d'état spécialisée dans la rénovation
                    et l'amélioration de l'habitat. Nous vous aidons à améliorer la performance de votre
                    logement tout en réduisant vos dépenses énergétiques.
                </p>
                <ul className="list-unstyled mb-0">
                    <Coche>Un interlocuteur unique du début à la fin</Coche>
                    <Coche>Des matériaux durables et écologiques</Coche>
                    <Coche>Un suivi clair de votre devis en ligne</Coche>
                </ul>
            </div>
        </div>
    </section>
);

export const SectionContact = () => {
    // shortcut: le formulaire ouvre la messagerie du visiteur, à remplacer par une route API d'envoi d'e-mail plus tard
    const envoyerMessage = (event) => {
        event.preventDefault();
        const donnees = new FormData(event.target);
        const sujet = `Demande de contact - ${donnees.get("nom")}`;
        const corps = `${donnees.get("message")}\n\n${donnees.get("nom")} - ${donnees.get("email")}`;
        window.location.href = `mailto:${EMAIL_RENOVIAL}?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(corps)}`;
    };

    return (
        <section id="contact" className="container py-5 mb-4">
            <div className="surtitre mb-2">Contact</div>
            <h2 className="display-6 fw-bold mb-4">Parlons de votre projet</h2>
            <div className="row g-4 g-lg-5">
                <div className="col-lg-6">
                    <form onSubmit={envoyerMessage}>
                        <div className="mb-3">
                            <label htmlFor="contact-nom" className="form-label fw-semibold">Nom</label>
                            <input id="contact-nom" name="nom" className="form-control form-control-lg" placeholder="Votre nom" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="contact-email" className="form-label fw-semibold">Email</label>
                            <input id="contact-email" name="email" type="email" className="form-control form-control-lg" placeholder="vous@email.fr" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="contact-message" className="form-label fw-semibold">Message</label>
                            <textarea id="contact-message" name="message" rows="5" className="form-control" placeholder="Décrivez votre projet…" required />
                        </div>
                        <button type="submit" className="btn btn-renovial rounded-pill px-5 py-2">Envoyer</button>
                    </form>
                </div>
                <div className="col-lg-6">
                    <div className="carte-contact p-4 mb-4">
                        {[
                            ["Téléphone", TELEPHONE_RENOVIAL],
                            ["Email", EMAIL_RENOVIAL],
                            ["Adresse", "21 Avenue Albert, 59000 Lille"],
                            ["Horaires", "Lun – Ven : 8h – 17h"],
                        ].map(([titre, valeur]) => (
                            <div key={titre} className="d-flex gap-3 mb-3">
                                <span className="point" />
                                <div>
                                    <div className="small text-secondary">{titre}</div>
                                    <div className="fw-bold">{valeur}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="carte-contact p-5 text-center">
                        <span className="texte-vert"><Icone nom="lieu" taille={36} /></span>
                        <div className="fw-bold fs-4 mt-2">Lille</div>
                        <div className="small text-secondary">et ses environs</div>
                    </div>
                </div>
            </div>
        </section>
    );
};
