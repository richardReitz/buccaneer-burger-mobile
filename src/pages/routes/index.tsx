import React from 'react';
import { AppRoutes } from './app.routes';
import { AuhtRoutes } from './auth.routes';

type Props = {

};

export const Routes: React.FC<Props> = ({

}): JSX.Element => {
    const isAuthenticated = false
    return (
        isAuthenticated ? <AuhtRoutes /> : <AppRoutes />
    );
};