import { Link } from "react-router-dom";
import Icone from "../../components/common/Icone";
import logoComplet from "../../assets/images/logo_renovial_complet.png";
import "./Accueil.css";
import { Coche, SectionApropos, SectionContact, TELEPHONE_RENOVIAL } from "./SectionsAccueil";

const atouts = [
    { icone: "feuille", titre: "Isolation performante", texte: "Moins de déperditions, plus de confort." },
    { icone: "maison", titre: "Économies d'énergie", texte: "Réduisez vos factures et votre impact environnemental." },
    { icone: "bouclier", titre: "Travaux de qualité", texte: "Des prestations fiables et durables." },
    { icone: "personnes", titre: "Accompagnement personnalisé", texte: "Un interlocuteur unique du début à la fin de votre projet." },
];

const etapes = [
    { titre: "Choisissez vos travaux", texte: "Isolation, fenêtres, solaire… indiquez simplement les surfaces concernées." },
    { titre: "Recevez votre estimation", texte: "Le total HT et TTC se calcule en direct, avec la bonne TVA." },
    { titre: "Nous validons votre devis", texte: "Notre équipe étudie votre demande et vous recontacte rapidement." },
];

const services = [
    { icone: "feuille", titre: "Isolation écologique", texte: "Combles, murs et planchers : réduisez les déperditions et gagnez en confort." },
    { icone: "fenetre", titre: "Fenêtres et menuiseries", texte: "Double et triple vitrage pour une meilleure isolation thermique et phonique." },
    { icone: "thermometre", titre: "Pompe à chaleur", texte: "Un chauffage performant qui réduit durablement votre facture d'énergie." },
    { icone: "soleil", titre: "Panneaux solaires", texte: "Produisez votre propre électricité et valorisez votre toiture." },
    { icone: "pinceau", titre: "Peinture écologique", texte: "Des finitions saines, durables et respectueuses de l'environnement." },
    { icone: "bain", titre: "Salle de bain", texte: "Une rénovation complète, pensée pour le confort et la sobriété." },
];

const Accueil = () => {

    return (
        <div className="accueil">

            {/* Haut de page */}
            <section id="accueil" className="fond-vert text-white hero">
                <div className="container">
                    <div className="row align-items-center g-4 g-lg-5">

                        <div className="col-lg-6">
                            <span className="badge-hero d-inline-block rounded-pill px-3 py-1 mb-4 fw-semibold">
                                ● RÉNOVATION ÉNERGÉTIQUE À LILLE
                            </span>
                            <h1 className="display-4 fw-bold text-white mb-4">
                                Des travaux aujourd'hui, des <span className="texte-vert">économies demain !</span>
                            </h1>
                            <p className="fs-5 text-white-50 mb-4">
                                Isolation, chauffage, menuiseries… Renovial améliore votre confort tout en
                                réduisant votre consommation d'énergie. Estimez vos travaux en ligne en quelques minutes.
                            </p>
                            <Link to="/devis" className="btn btn-renovial btn-lg rounded-pill px-4 d-inline-flex align-items-center gap-2">
                                Demander un devis gratuit <Icone nom="fleche" taille={18} />
                            </Link>
                            <ul className="list-unstyled d-flex flex-wrap gap-4 mt-4 mb-0 small">
                                <Coche>Entreprise certifiée RGE</Coche>
                                <Coche>Estimation immédiate</Coche>
                                <Coche>Basé à Lille</Coche>
                            </ul>
                        </div>

                        <div className="col-lg-6 d-none d-md-block">
                            <div className="vitrine ms-lg-5">
                                <div className="carte-flottante d-flex align-items-center gap-3 p-3" style={{ top: "1.5rem", left: "-2rem" }}>
                                    <span className="pastille-icone"><Icone nom="bouclier" /></span>
                                    <div>
                                        <div className="fw-bold small">Entreprise certifiée RGE</div>
                                        <div className="text-secondary" style={{ fontSize: "0.75rem" }}>Accès aux aides de l'État</div>
                                    </div>
                                </div>

                                <div className="etiquette px-3 py-2 text-center">
                                    Un habitat plus performant<br />et plus durable
                                </div>

                                <div className="carte-flottante p-3" style={{ bottom: "-2rem", left: "-1rem", width: "290px" }}>
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <span className="fw-bold small text-nowrap">Votre devis</span>
                                        <span className="badge rounded-pill" style={{ background: "#e6f7ee", color: "#15803d" }}>Estimation immédiate</span>
                                    </div>
                                    <div className="d-flex justify-content-between small text-secondary"><span>Isolation, 45 m²</span><span>2 925 €</span></div>
                                    <div className="d-flex justify-content-between small text-secondary mb-2"><span>Peinture, 80 m²</span><span>2 400 €</span></div>
                                    <div className="d-flex justify-content-between border-top pt-2">
                                        <span className="fw-bold small">Total TTC</span>
                                        <span className="fw-bold texte-vert">5 618 €</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Les 4 atouts, qui chevauchent le haut de page */}
            <section className="container atouts">
                <div className="row g-4">
                    {atouts.map((atout) => (
                        <div key={atout.titre} className="col-sm-6 col-lg-3">
                            <div className="carte-renovial p-4">
                                <span className="pastille-icone mb-3"><Icone nom={atout.icone} /></span>
                                <h3 className="h6 fw-bold">{atout.titre}</h3>
                                <p className="small text-secondary mb-0">{atout.texte}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Le devis en 3 étapes */}
            <section className="container py-5 my-5 text-center">
                <div className="surtitre mb-2">Simple et rapide</div>
                <h2 className="display-6 fw-bold mb-3">Votre devis en 3 étapes</h2>
                <p className="text-secondary mx-auto mb-5" style={{ maxWidth: "520px" }}>
                    Un devis en ligne, sans déplacement ni paperasse. Vous gardez la main, nous validons.
                </p>
                <div className="row g-4 g-lg-5 mb-5">
                    {etapes.map((etape, index) => (
                        <div key={etape.titre} className="col-md-4">
                            <span className="etape-numero mb-4">{index + 1}</span>
                            <h3 className="h6 fw-bold">{etape.titre}</h3>
                            <p className="small text-secondary mb-0">{etape.texte}</p>
                        </div>
                    ))}
                </div>
                <Link to="/devis" className="btn btn-renovial rounded-pill px-4 py-2 d-inline-flex align-items-center gap-2">
                    Faire mon devis en ligne <Icone nom="fleche" taille={18} />
                </Link>
            </section>

            {/* Les services */}
            <section id="services" className="container pb-5 mb-5 text-center">
                <div className="surtitre mb-2">Nos services</div>
                <h2 className="display-6 fw-bold mb-3">Tout pour rénover durablement</h2>
                <p className="text-secondary mx-auto mb-5" style={{ maxWidth: "520px" }}>
                    Des solutions performantes pour améliorer votre confort et alléger vos factures.
                </p>
                <div className="row g-4 text-start">
                    {services.map((service) => (
                        <div key={service.titre} className="col-md-6 col-lg-4">
                            <div className="carte-renovial p-4">
                                <span className="pastille-icone mb-3"><Icone nom={service.icone} /></span>
                                <h3 className="h6 fw-bold">{service.titre}</h3>
                                <p className="small text-secondary">{service.texte}</p>
                                <Link to="/devis" className="small fw-semibold text-success text-decoration-none d-inline-flex align-items-center gap-1">
                                    Demander un devis <Icone nom="fleche" taille={14} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Certification RGE */}
            <section className="fond-vert text-white py-5">
                <div className="container py-5">
                    <div className="row align-items-center g-4 g-lg-5">
                        <div className="col-lg-6">
                            <div className="surtitre mb-2">Entreprise certifiée</div>
                            <h2 className="display-6 fw-bold text-white mb-3">Une entreprise certifiée RGE</h2>
                            <p className="text-white-50 mb-4">
                                Renovial est reconnue <strong className="text-white">RGE</strong> (Reconnu Garant de
                                l'Environnement) : la garantie de travaux de qualité et l'accès aux aides de l'État
                                pour votre rénovation énergétique.
                            </p>
                            <div className="d-flex flex-wrap gap-2 mb-4">
                                <span className="pilule active">RGE</span>
                                <span className="pilule">Tous corps d'état</span>
                                <span className="pilule">Rénovation de l'habitat</span>
                            </div>
                            <ul className="list-unstyled mb-4">
                                <Coche>Des professionnels reconnus et contrôlés</Coche>
                                <Coche>Des travaux éligibles aux aides à la rénovation</Coche>
                                <Coche>Un engagement qualité du devis au chantier</Coche>
                            </ul>
                            <Link to="/devis" className="btn btn-light rounded-pill px-4 py-2 fw-semibold d-inline-flex align-items-center gap-2">
                                Demander un devis <Icone nom="fleche" taille={18} />
                            </Link>
                        </div>
                        <div className="col-lg-6">
                            <div className="position-relative bg-white rounded-4 p-4 shadow-lg ms-lg-5">
                                <span className="position-absolute top-0 end-0 translate-middle-y me-3 badge rounded-pill btn-renovial px-3 py-2 d-inline-flex align-items-center gap-1">
                                    <Icone nom="bouclier" taille={14} /> Certifié RGE
                                </span>
                                <img src={logoComplet} alt="Logo E.U.R.L Renovial, entreprise certifiée RGE" className="img-fluid d-block mx-auto" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <SectionApropos />

            {/* Bandeau d'appel à l'action */}
            <section className="container mb-5">
                <div className="bandeau-cta text-white p-4 p-md-5 d-md-flex align-items-center justify-content-between gap-4">
                    <div className="mb-4 mb-md-0">
                        <h2 className="h1 fw-bold text-white mb-2">Prêt à réduire vos factures d'énergie ?</h2>
                        <p className="mb-0 opacity-75">Obtenez votre estimation en quelques minutes, sans engagement.</p>
                    </div>
                    <div className="text-md-end flex-shrink-0">
                        <Link to="/devis" className="btn btn-light rounded-pill px-4 py-2 fw-semibold d-inline-flex align-items-center gap-2 text-success">
                            Demander un devis <Icone nom="fleche" taille={18} />
                        </Link>
                        <div className="small mt-2 d-flex align-items-center gap-2 justify-content-md-end">
                            <Icone nom="telephone" taille={14} /> Ou appelez-nous : {TELEPHONE_RENOVIAL}
                        </div>
                    </div>
                </div>
            </section>

            <SectionContact />

        </div>
    );
};

export default Accueil;
