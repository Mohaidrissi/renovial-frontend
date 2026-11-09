import React from "react";
import { Link } from "react-router-dom";


const Services = () => {
  return (
    <nav>
      <Link to="/">Accueil</Link>
      <Link to="/services">Services</Link>
    </nav>
  );
};

export default Services;