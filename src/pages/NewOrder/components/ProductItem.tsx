import React from 'react';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';
import { Button, ButtonIcon } from '@/components/ui/button';
import { RemoveIcon, AddIcon, TrashIcon } from '@/components/ui/icon';
import { useOrderItemStore } from '@/src/store/useOrderItemStore';
import type { OrderProduct } from '../types';

type Props = { item: OrderProduct }

export const ProductItem: React.FC<Props> = ({ item }): JSX.Element => {
    const { decrementItemQuantity, addItemToOrder } = useOrderItemStore()
    
    const handleAddQuantity = (): void => addItemToOrder(item)
    const handleRemoveQuantity = (): void => decrementItemQuantity(item.id)
 
    return (
        <HStack className="border border-primary-50 px-4 py-2 rounded-md justify-between items-center mb-3">
            <Text className='text-secondary-0'>{item.name}</Text>

            <HStack className='items-center gap-3'>
                <Button size='xs' onPress={handleRemoveQuantity}>
                    <ButtonIcon
                        as={item.quantity === 1 ? TrashIcon : RemoveIcon}
                        className='text-white'
                        />
                </Button>
                <Text className='font-semibold text-xl text-secondary-0'>{item.quantity}</Text>
                <Button size='xs' onPress={handleAddQuantity}>
                    <ButtonIcon as={AddIcon} className='text-white' />
                </Button>
            </HStack>
        </HStack>
    );
};