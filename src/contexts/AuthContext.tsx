import React, { createContext, ReactNode, SetStateAction } from "react";
import { api } from "../services/api";
import { useUserStorage } from "../store/useUserStorage";

export type User = {
    id: string;
    name: string;
    email: string;
    token: string;
}

type AuthContextData = {
    user: User;
    isAuthenticated: boolean;
    loading: boolean;
    loadingAuth: boolean;
    handleSignIn: (data: SignInProps) => Promise<void>;
    handleSignOut: () => Promise<void>;
}

type SignInProps = {
    email: string;
    password: string;
}

export const AuthContext = createContext({} as AuthContextData);

const initialUserValue: User = {
    id: '',
    name: '',
    email: '',
    token: ''
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const { saveUserStore, getUserStore, removeUserStore } = useUserStorage()

    const [user, setUser] = React.useState<User>(initialUserValue)
    const [loading, setLoading] = React.useState<boolean>(false)
    const [loadingAuth, setLoadingAuth] = React.useState<boolean>(false)
    const isAuthenticated = !!user.token

    const handleGetUserSession = async () => {
        setLoading(true)
        
        try {
            const userInfo = await getUserStore()
            if (userInfo) setUser(userInfo)
        } catch (err) {
            throw err
        } finally {
            setLoading(false)
        }
    }

    const handleSignOut = async (): Promise<void> => {
        try {
            await removeUserStore()
            setUser(initialUserValue)
        } catch (err) {
            console.log('err: ', err);
            throw err
        }
    }

    const handleSignIn = async ({ email, password }: SignInProps) => {
        setLoadingAuth(true)
        try {
            const response = await api.post('/session',
                { email, password }
            )
            const user: User = response.data
            setUser(user)

            await saveUserStore(user)

            api.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
        } catch (error) {
            console.log('Erro ao fazer login! ', error);
        } finally {
            setLoadingAuth(false)
        }
    }

    React.useEffect(() => {
        if (!user.token) {
            handleGetUserSession()
        }
    },[])

    return (
        <AuthContext.Provider
            value={{ 
                isAuthenticated,
                user,
                handleSignIn,
                handleSignOut,
                loading,
                loadingAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}