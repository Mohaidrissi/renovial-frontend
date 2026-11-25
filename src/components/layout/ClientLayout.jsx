import NavbarClient from '../navbar/NavbarClient';
import FooterPublic from '../footer/FooterPublic';
import { Outlet } from 'react-router-dom';

const ClientLayout = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <NavbarClient />
            <main className="flex-grow-1">
                <Outlet />
            </main>
            <FooterPublic />
        </div>
    );
};

export default ClientLayout;