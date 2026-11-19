import NavbarAdmin from '../navbar/NavbarAdmin';
import FooterPublic from '../footer/FooterPublic';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
    return (
        <div>
            <NavbarAdmin />
            <main>
                <Outlet />
            </main>
            <FooterPublic />
        </div>
    );
};

export default AdminLayout;