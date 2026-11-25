import NavbarAdmin from '../navbar/NavbarAdmin';
import FooterPublic from '../footer/FooterPublic';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <NavbarAdmin />
            <main className="flex-grow-1">
                <Outlet />
            </main>
            <FooterPublic />
        </div>
    );
};

export default AdminLayout;