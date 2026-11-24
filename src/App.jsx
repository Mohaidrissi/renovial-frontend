import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainLayout from './components/layout/MainLayout';
import ClientLayout from './components/layout/ClientLayout';
import AdminLayout from './components/layout/AdminLayout';

import Accueil from './pages/public/Accueil';
import Contact from './pages/public/Contact';
import Services from './pages/public/Services';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import MentionsLegales from './pages/public/MentionsLegales';
import DevisEnLigne from './pages/public/DevisEnLigne';
import ConfirmationDevis from './pages/public/ConfirmationDevis';

import Dashboard from './pages/client/Dashboard';
import MesDevis from './pages/client/MesDevis';
import DetailDevis from './pages/client/DetailDevis';
import Profil from './pages/client/Profil';

import AdminDashboard from './pages/admin/AdminDashboard';
import GestionDevis from './pages/admin/GestionDevis';
import GestionServices from './pages/admin/GestionServices';
import GestionUtilisateurs from './pages/admin/GestionUtilisateurs';
import ProtectedRoute from './components/common/ProtectedRoute';

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
                    <Route path="/mentions-legales" element={<MentionsLegales />} />
                    <Route path="/devis" element={<DevisEnLigne />} />
                    <Route path="/confirmation-devis" element={<ConfirmationDevis />} />
                </Route>

                {/* Espace client */}
                <Route element={<ProtectedRoute role="ROLE_CLIENT"><ClientLayout /></ProtectedRoute>}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/mes-devis" element={<MesDevis />} />
                    <Route path="/detail-devis" element={<DetailDevis />} />
                    <Route path="/profil" element={<Profil />} />
                </Route>

                {/* Espace administrateur */}
                <Route element={<ProtectedRoute role="ROLE_ADMIN"><AdminLayout /></ProtectedRoute>}>
                    <Route path="/admin-dashboard" element={<AdminDashboard />} />
                    <Route path="/gestion-devis" element={<GestionDevis />} />
                    <Route path="/gestion-services" element={<GestionServices />} />
                    <Route path="/gestion-utilisateurs" element={<GestionUtilisateurs />} />
                </Route>

            </Routes>
        </BrowserRouter>
    );
};

export default App;