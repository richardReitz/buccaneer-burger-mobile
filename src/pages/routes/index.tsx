import React, { useContext } from 'react';
import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';
import { AuthContext } from '@/src/contexts/AuthContext';
import { HStack } from '@/components/ui/hstack';
import { Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

type Props = {

};

export const Routes: React.FC<Props> = ({

}): JSX.Element => {
    const { isAuthenticated, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <HStack className='flex-1 items-center justify-center bg-background-900'>
                <Image
                    className='size-72'
                    source={require('../../assets/images/buccaneerburger-logo.png')}
                />
            </HStack>
        )
    }

    return (
        <>
            <StatusBar backgroundColor="#272625" style='light' />
            {isAuthenticated ? <AuthRoutes /> : <AppRoutes />}
        </>
    );
};