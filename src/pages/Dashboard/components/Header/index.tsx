import { useContext } from 'react';
import { AuthContext } from '@/src/contexts/AuthContext';
import { Button, ButtonIcon } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';
import { Image } from 'react-native';
import { LogOut } from 'lucide-react-native';

export const Header: React.FC = (): JSX.Element => {
    const { handleSignOut } = useContext(AuthContext)
    
    return (
        <HStack className='items-center justify-between'>
            <Image
                source={require('@/src/assets/images/buccaneerburger-logo.png')}
                className='w-32 h-16'
                resizeMode='contain'
            />
            <Button size='sm' onPress={handleSignOut}>
                <ButtonIcon as={LogOut} className='text-white' />
            </Button>
        </HStack>
   );
};