import React, { useContext } from 'react';
import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';
import { AuthContext } from '@/src/contexts/AuthContext';
import { HStack } from '@/components/ui/hstack';
import { Image } from 'react-native';

type Props = {

};

export const Routes: React.FC<Props> = ({

}): JSX.Element => {
    const { isAuthenticated, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <HStack className='flex-1 items-center justify-center bg-background-50'>
                <Image
                    className='size-72'
                    source={require('../../assets/images/bccburger-black-vetor.png')}
                />
            </HStack>
        )
    }

    return (
        isAuthenticated ? <AuthRoutes /> : <AppRoutes />
    );
};