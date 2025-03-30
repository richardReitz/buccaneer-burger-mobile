import React from 'react';
import { Input, InputField } from '@/components/ui/input';
import { VStack } from '@/components/ui/vstack';
import { Text } from 'react-native';
import { FormButton } from '@/components/FormButton';
import { Header } from './components/Header';
import { api } from '@/src/services/api';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { StackParamList } from '../routes/types';

export type NewOrder = {
    table: number
    id: string
}

export const DashboardScreen: React.FC = (): JSX.Element => {
    const { navigate } = useNavigation<NativeStackNavigationProp<StackParamList>>()

    const [tableNumber, setTableNumber] = React.useState<string>('')
    const [loading, setLoading] = React.useState<boolean>(false)

    const handleCreateOrder = async (): Promise<void> => {
        if (!tableNumber) return

        setLoading(true)
        try {
            const response = await api.post(
                '/order',
                { table: Number(tableNumber) }
            )
            const newORder: NewOrder = response.data
            setTableNumber('')

            navigate("NewOrder", { table: newORder.table, order_id: newORder.id })
        } catch (error) {
            console.log('Erro ao abrir pedido! ', error);
        } finally {
            setLoading(false)
        }
    }

    return (
        <VStack className='flex-1 w-full bg-background-900 px-6'>
            <Header />

            <VStack className='flex-1 gap-3 justify-center'>
                <Text className='text-secondary-0 font-semibold text-2xl'>Novo pedido</Text>
                <Input className="bg-background-700 border-0" size="lg">
                    <InputField
                        value={tableNumber}
                        onChangeText={setTableNumber}
                        placeholder="Digite o número da mesa"
                        className='text-secondary-0 font-semibold'
                        keyboardType='numeric'
                    />
                </Input>

                <FormButton
                    label='Abrir pedido'
                    loading={loading}
                    disabled={!tableNumber || loading}
                    onPress={handleCreateOrder}
                />
            </VStack>
        </VStack>
    );
};