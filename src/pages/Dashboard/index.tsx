import React, { useContext } from 'react';
import { Button, ButtonText } from '@/components/ui/button';
import { AuthContext } from '@/src/contexts/AuthContext';
import { HStack } from '@/components/ui/hstack';

export const DashboardScreen: React.FC = (): JSX.Element => {
    const { handleSignOut } = useContext(AuthContext)
    return (
        <HStack className='flex-1 w-full bg-background-900 p-4'>
            <Button onPress={handleSignOut}>
                <ButtonText>
                    Deslogar
                </ButtonText>
            </Button>
        </HStack>
    );
};