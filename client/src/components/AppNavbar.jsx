import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Navbar1 from './Navbar1';

function AppNavbar({ setSearchQuery }) {
    const location = useLocation();
    const showNavbar1 = location.pathname === '/' || location.pathname === '/404';

    return <>{showNavbar1 ? <Navbar1 /> : <Navbar setSearchQuery={setSearchQuery}/>}</>;
} 

export default AppNavbar;
