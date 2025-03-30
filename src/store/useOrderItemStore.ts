import { create,  } from "zustand";
import { OrderProduct } from "../pages/NewOrder/types";

type OrderStore = { orderItems: OrderProduct[] }

const initialStore: OrderStore = {
    orderItems: []
}

type ActionOrderStore = {
    addItemToOrder: (item: OrderProduct) => void
    decrementItemQuantity: (id: string) => void
    reset: () => void
}

export const useOrderItemStore = create<OrderStore & ActionOrderStore>((set, get) => ({
    ...initialStore,
    addItemToOrder: (item) => {
        const items = get().orderItems
        const itemIndex = items.findIndex(({ id }) => id === item.id)

        if (itemIndex !== -1) {
            return set({
                orderItems: items.map((product) =>
                    product.id === item.id 
                        ? { ...product, quantity: product.quantity + 1 } 
                        : product
                ),
            });
        } else {
            return set({ orderItems: [item, ...items] });
        }
    },
    decrementItemQuantity: (id) => {
        const items = get().orderItems
        const itemToDecrement = items.find((item) => item.id === id)

        if (itemToDecrement?.quantity === 1) {
            const newItems = items.filter((item) => item.id !== id)

            return set({ orderItems: newItems })
        } else {
            const newItems = items.map((product) =>
                product.id === id ? { ...product, quantity: product.quantity - 1 } : product
            )

            return set({ orderItems: newItems })
        }
    },
    reset: () => set({ ...initialStore })
  }))