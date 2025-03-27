import AsyncStorage from "@react-native-async-storage/async-storage"
import { User } from "../contexts/AuthContext"

type Props = {
    saveUserStore: (user: User) => Promise<void>
    getUserStore: () => Promise<User | null>
    removeUserStore: () => Promise<void>
}

export const useUserStorage = (): Props => {
    const KEY = '@buccaneerburger:user'

    const saveUserStore = async (user: User): Promise<void> => {
        await AsyncStorage.setItem(KEY, JSON.stringify(user))
    }

    const getUserStore = async (): Promise<User | null> => {
        const userJson = await AsyncStorage.getItem(KEY)
        if (userJson) {
            return JSON.parse(userJson)
        }
       return null
    }

    const removeUserStore = async (): Promise<void> => {
        await AsyncStorage.removeItem(KEY)
    }

    return { saveUserStore, getUserStore, removeUserStore }
}