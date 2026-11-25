import NavbarPublic from '../navbar/NavbarPublic';
import FooterPublic from '../footer/FooterPublic';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <NavbarPublic />
            <main className="flex-grow-1">
                <Outlet />
            </main>
            <FooterPublic />
        </div>
    );
};

export default MainLayout;
