import React from 'react';
import adminRoutes from './adminRoutes'
import './admin-layout.css'
import SideNavigation from './SideNavigation';
import { Route, Routes } from 'react-router-dom';

const AdminLayout = () => {
    return (
        <div className="admin-layout">
            <SideNavigation />
            <div className="admin-layout-main">
                <nav>
                    <span>PENTECOST UNIVERSITY HOSTEL MANAGEMENT</span>
                    <button className="user-account-control">Logout</button>
                </nav>
                <div className="admin-layout-main-content">
                    <Routes>
                        {adminRoutes.map((route, index)=>{
                            return <Route key={index} path={route.path} element={route.element} exact={route.exact}/>
                        })}
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;