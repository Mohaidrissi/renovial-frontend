import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainLayout from './components/layout/MainLayout';

import Accueil from './pages/public/Accueil';
import Contact from './pages/public/Contact';
import Services from './pages/public/Services';
import Login from './pages/public/Login';
import Register from './pages/public/Register';

import Dashboard from './pages/client/Dashboard';
import MesDevis from './pages/client/MesDevis';
import DetailDevis from './pages/client/DetailDevis';
import Profil from './pages/client/Profil';

import AdminDashboard from './pages/admin/AdminDashboard';
import GestionDevis from './pages/admin/GestionDevis';
import GestionServices from './pages/admin/GestionServices';
import GestionUtilisateurs from './pages/admin/GestionUtilisateurs';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>

                {/* Pages publiques */}
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Accueil />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>

                {/* Pages client */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/mes-devis" element={<MesDevis />} />
                <Route path="/detail-devis" element={<DetailDevis />} />
                <Route path="/profil" element={<Profil />} />

                {/* Pages administrateur */}
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/gestion-devis" element={<GestionDevis />} />
                <Route path="/gestion-services" element={<GestionServices />} />
                <Route path="/gestion-utilisateurs" element={<GestionUtilisateurs />} />

            </Routes>
        </BrowserRouter>
    );
};

export default App;