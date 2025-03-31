import React from 'react';
import { View } from 'react-native';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';
import { Button, ButtonIcon, ButtonSpinner } from '@/components/ui/button';
import { Trash } from 'lucide-react-native';
import { api } from '@/src/services/api';
import { useToast } from '@/src/hooks/useToast';
import { AlertDialog } from '@/components/AlertDialog';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { StackParamList } from '@/src/pages/routes/types';

type Props = NativeStackScreenProps<StackParamList, 'NewOrder'>

export const OrderHeader: React.FC<Props> = ({ navigation, route }): JSX.Element => {
    const { order_id, table } = route.params
    const { handleUseToast } = useToast()

    const [loading, setLoading] = React.useState<boolean>(false);
    const [deleteModal, setDeleteModal] = React.useState<boolean>(false);

    const showDeleteModal = () => setDeleteModal(true)
    const closeDeleteModal = () => setDeleteModal(false)

    const handleDeleteOrder = async (): Promise<void> => {
        setLoading(true)
        try {
            await api.delete('/order', { data: { order_id } })
            navigation.goBack()
        } catch (error) {
            setLoading(false)
            handleUseToast({
                title: 'Erro',
                description: 'Algo deu errado, tente novamente.',
                type: 'error'
            })
        }
    }

    return (
        <VStack className="">
                <Text className='text-center font-bold text-3xl mb-4 text-secondary-0'>
                    Novo pedido
                </Text>

            <HStack className='justify-between items-center'>
                <View className='border border-background-500 p-2 rounded-md'>
                    <Text className='font-semibold text-secondary-0 text-lg'>Mesa {table}</Text>
                </View>

                <Button onPress={showDeleteModal} disabled={loading} className={`${loading && 'opacity-60'}`}>
                    {loading && <ButtonSpinner className='text-white' />}
                    <ButtonIcon as={Trash} />
                </Button>
            </HStack>
           

            <AlertDialog
                title='Remover pedido?'
                description='Deseja cancelar e remover pedido?'
                isOpen={deleteModal}
                handleClose={closeDeleteModal}
                handleConfirm={handleDeleteOrder}
            />
        </VStack>
    );
};