import NavbarClient from '../navbar/NavbarClient';
import FooterPublic from '../footer/FooterPublic';
import { Outlet } from 'react-router-dom';

const ClientLayout = () => {
    return (
        <div>
            <NavbarClient />
            <main>
                <Outlet />
            </main>
            <FooterPublic />
        </div>
    );
};

export default ClientLayout;