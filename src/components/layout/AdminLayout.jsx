import Navbar from '../navbar/Navbar';
import FooterPublic from '../footer/FooterPublic';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <main className="flex-grow-1">
                <Outlet />
            </main>
            <FooterPublic />
        </div>
    );
};

export default AdminLayout;