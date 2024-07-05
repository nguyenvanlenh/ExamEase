import React from 'react';
import { Navigate } from 'react-router-dom';

const getDataByKeyLS = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
};

const ProtectedRoute = ({ children, roles }) => {
    const authData = getDataByKeyLS("auth");
    if (!authData || !authData.authenticated) {
        return <Navigate to="/login" replace />;
    }

    if (roles && !roles.some(role => authData.listRoles.includes(role))) {
        return <Navigate to="*" replace />;
    }

    return children;
};

export default ProtectedRoute;
