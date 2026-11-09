import React from "react";
import { Link } from "react-router-dom";

const Accueil = () => {
  return (
    <nav>
      <Link to="/">Accueil</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/services">Services</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/mes-devis">Mes Devis</Link>
      <Link to="/detail-devis">Detail Devis</Link>
      <Link to="/profil">Profil</Link>
      <Link to="/admin-dashboard">Admin Dashboard</Link>
      <Link to="/gestion-devis">Gestion Devis</Link>
      <Link to="/gestion-services">Gestion Services</Link>
        <Link to="/gestion-utilisateurs">Gestion Utilisateurs</Link>
    </nav>
  );
};

export default Accueil;