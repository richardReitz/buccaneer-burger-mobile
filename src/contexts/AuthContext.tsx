import React, { createContext, ReactNode, SetStateAction } from "react";
import { api } from "../services/api";
import { useUserStorage } from "../store/useUserStorage";
import { useToast } from "../hooks/useToast";

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
    handleSignUp: (data: SignUpProps) => Promise<boolean>;
}

type SignInProps = {
    email: string;
    password: string;
}

type SignUpProps = {
    name: string
} & SignInProps

export const AuthContext = createContext({} as AuthContextData);

const initialUserValue: User = {
    id: '',
    name: '',
    email: '',
    token: ''
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const { saveUserStore, getUserStore, removeUserStore } = useUserStorage()
    const { handleUseToast } = useToast()

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
            handleUseToast({ title: 'Error', description: 'Email e/ou senha inválidos.', type: 'error' })
        } finally {
            setLoadingAuth(false)
        }
    }

    const handleSignUp = async ({ name, email, password }: SignUpProps): Promise<boolean> => {
        setLoadingAuth(true)
        try {
            const response = await api.post('/users',
                { name, email, password }
            )
            handleUseToast({
                title: 'Conta criada!',
                description: 'Sua conta foi criada com sucesso.',
                type: 'success'
            })

            return !!response.data
        } catch (error) {
            console.log('error: ', error);
            handleUseToast({
                title: 'Error',
                description: 'Algo deu errado ao criar conta, tente novamente.',
                type: 'error'
            })
            return false
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
                handleSignUp,
                loading,
                loadingAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}