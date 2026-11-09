import NavbarPublic from '../navbar/NavbarPublic';
import FooterPublic from '../footer/FooterPublic';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div>
            <NavbarPublic />
            <main>
                <Outlet />
            </main>
            <FooterPublic />
        </div>
    );
};

export default MainLayout;
