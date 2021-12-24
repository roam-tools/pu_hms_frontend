import React from 'react';
import {Route, Routes } from 'react-router-dom';
import Navbar from '../../components/nav/Navbar';
import userRoutes from './userRoutes'

const DefaultLayout = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                {userRoutes.map((route, index)=>{
                    return <Route key={index} path={route.path} element={route.element} exact={route.exact}/>
                })}
            </Routes>
        </div>
    );
};

export default DefaultLayout;