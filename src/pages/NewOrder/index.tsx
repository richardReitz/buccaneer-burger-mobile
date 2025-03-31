import React from 'react';
import { VStack } from '@/components/ui/vstack';
import { OrderHeader } from './components/OrderHeader';
import { FormSelect } from '@/components/FormSelect';
import { Text } from '@/components/ui/text';
import { api } from '@/src/services/api';
import { CategoryType, ProductType } from '@/src/types/types';
import { FormButton } from '@/components/FormButton';
import { ProductItem } from './components/ProductItem';
import { useOrderItemStore } from '@/src/store/useOrderItemStore';
import { ScrollView } from 'react-native';
import { AlertDialog } from '@/components/AlertDialog';
import { useToast } from '@/src/hooks/useToast';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { StackParamList } from '../routes/types';
import type { ISelectItemProps } from '@gluestack-ui/select/lib/types';

type Props = NativeStackScreenProps<StackParamList, 'NewOrder'>

export const NewOrderScreen: React.FC<Props> = ({ navigation, route }): JSX.Element => {
    const { order_id } = route.params
    const { orderItems, addItemToOrder, reset } = useOrderItemStore()
    const { handleUseToast } = useToast()

    const [loading, setLoading] = React.useState<boolean>(false)
    const [loadingProduct, setLoadingProduct] = React.useState<boolean>(false)
    const [showFinishModal, setShowFinishModal] = React.useState<boolean>(false)
    const [categories, setCategories] = React.useState<ISelectItemProps[]>([])
    const [selectedCategoryId, setSelectedCategoryId] = React.useState<string>('')
    const [products, setProducts] = React.useState<ISelectItemProps[]>([])
    const [selectedProductId, setSelectedProductId] = React.useState<string>('')

    const onChangeCategory = (id: string) => {
        if (selectedCategoryId === id) return

        setProducts([])
        setSelectedProductId('')
        setSelectedCategoryId(id)
    }
    const onChangeProduct = (id: string) => setSelectedProductId(id)

    const getCategories = async () => {
        try {
            const response = await api.get('/categories')
            const categoriesResposne = (response.data as CategoryType[])
                .map((item) => ({
                    value: item.id, label: item.name
                }))

            setCategories(categoriesResposne)
        } catch (error) {
            handleUseToast({
                title: 'Erro',
                description: 'Algo deu errado ao buscar categorias.',
                type: 'error'
            })
            console.log('error: ', error);
        }
    }

    const getCategoryProducts = async () => {
        setLoadingProduct(true)
        try {
            const response = await api.get(
                '/category/product',
                { params: { category_id: selectedCategoryId } }
            )
            const productResponse = (response.data as ProductType[])
                .map((item) => ({
                    value: item.id, label: item.name
                }))

            setProducts(productResponse)
        } catch (error) {
            handleUseToast({
                title: 'Erro',
                description: 'Algo deu errado ao buscar produtos.',
                type: 'error'
            })
            console.log('error: ', error);
        } finally {
            setLoadingProduct(false)
        }
    }

    const handleAddItem = (): void => {
        const itemToAdd = products.find(({ value }) => value === selectedProductId)
        if (!itemToAdd) return

        const newItem = {
            id: itemToAdd.value,
            name: itemToAdd.label,
            quantity: 1
        }

        return addItemToOrder(newItem)
    }
    
    const openFinishOrderModal = (): void => setShowFinishModal(true)
    const handleCloseModal = (): void => setShowFinishModal(false)

    const handleFinishOrder = async (): Promise<void> => {
        handleCloseModal()
        setLoading(true)
        try {
            await orderItems.forEach(async (item) => {
                await api.post(
                    '/order/add',
                    {
                        order_id,
                        product_id: item.id,
                        amount: item.quantity,
                    }
                )
            })
            await api.put('/order/send', { order_id })
            handleUseToast({
                title: 'Pedido aberto!',
                description: 'Pedido foi enviado com sucesso.',
                type: 'success'
            })

            reset()
            navigation.goBack()
        } catch (error) {
            console.log('error: ', error);
            handleUseToast({
                title: 'Erro',
                description: 'Algo deu errado ao finalizar pedido, tente novamente.',
                type: 'error'
            })
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        getCategories()
    }, [])

    return (
        <>
            <VStack className="flex-1 w-full p-6 gap-1 bg-background-900">
                <OrderHeader navigation={navigation} route={route} />

                <VStack className='gap-3 mt-6'>
                    <FormSelect items={categories} onValueChange={onChangeCategory} />
                    <FormSelect 
                        loading={loadingProduct}
                        items={products}
                        onValueChange={onChangeProduct}
                        onOpen={getCategoryProducts}
                    />
                    <FormButton label='Adicionar ao pedido' onPress={handleAddItem} />

                    <Text className='font-semibold text-secondary-0 text-xl mt-4'>Itens adicionados</Text>
                    <ScrollView contentContainerStyle={{ paddingBottom: 320 }} className=''>
                        {orderItems.map((item) => 
                            <ProductItem key={item.id} item={item} />
                        )}
                    </ScrollView>
                </VStack>
            </VStack>

            <VStack className='p-3 bg-background-900 w-full self-center absolute bottom-0'>
                <FormButton
                    className='h-12'
                    label='Finalizar pedido'
                    onPress={openFinishOrderModal} 
                    loading={loading}
                />
            </VStack>

            <AlertDialog
                title='Finalizar pedido?'
                description='Deseja finalizar o pedido e enviar para a cozinha?'
                isOpen={showFinishModal}
                handleClose={handleCloseModal}
                handleConfirm={handleFinishOrder}
            />
        </>

    );
};