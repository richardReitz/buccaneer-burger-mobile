import React, { useContext } from 'react';
import { Image } from 'react-native';
import { Button, ButtonText } from '@/components/ui/button';
import { FormControl,
    FormControlErrorText,
    FormControlLabelText 
} from '@/components/ui/form-control';
import { Input,
    InputField } from '@/components/ui/input';
import { VStack } from '@/components/ui/vstack';
import { Controller, useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '@/src/contexts/AuthContext';
import { FormButton } from '@/components/FormButton';
import { Text } from '@/components/ui/text';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { StackParamList } from '../routes/types';

type FormSchema = { email: string; password: string }

export const SignInScreen: React.FC = (): JSX.Element => {
    const { navigate } = useNavigation<NativeStackNavigationProp<StackParamList>>();
    const { handleSignIn, loading } = useContext(AuthContext)
    
    const { control, handleSubmit, formState: { errors } } = useForm<FormSchema>();

    const onSubmit = async (values: FormSchema): Promise<void> => {
        try {
            await handleSignIn({ 
                email: values.email,
                password: values.password
            })
        } catch (error) {
            throw error
        }
    }

    const navigateToSignUp = () => navigate("SignUp")

    return (
        <VStack className="flex-1 w-full px-12 justify-center gap-1 bg-background-900">
            <Image
                className='w-80 self-center'
                source={require('../../assets/images/buccaneerburger-logo.png')}
                resizeMode='contain'
            />
            <Controller 
                control={control}
                name="email"
                rules={{
                    required: "Digite um email válido",
                    pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: "Formato de email inválido"
                    }
                }}
                render={({ field }) => (
                    <FormControl size="md" isInvalid={!!errors.email}>
                        <FormControlLabelText className='text-secondary-0'>
                            Email
                        </FormControlLabelText>
                        
                        <Input className="bg-background-700 border-0" size="lg">
                            <InputField
                                {...field}
                                value={field.value || ""}
                                onChangeText={field.onChange}
                                placeholder="Digite seu email"
                                keyboardType="email-address"
                                className='text-secondary-0'
                            />
                        </Input>

                        {!!errors.email?.message && (
                            <FormControlErrorText>{errors.email.message as string}</FormControlErrorText>
                        )}
                    </FormControl>
                )}
            />

            <Controller 
                control={control}
                name="password"
                rules={{
                    required: "Senha é obrigatória",
                    minLength: { value: 6, message: "A senha deve ter pelo menos 6 caracteres" }
                }}
                render={({ field }) => (
                    <FormControl size="md" isInvalid={!!errors.password}>
                         <FormControlLabelText className='text-secondary-0'>
                            Senha
                        </FormControlLabelText>
                        
                        <Input className="bg-background-700 border-0" size="lg">
                            <InputField
                                {...field}
                                value={field.value || ""}
                                onChangeText={field.onChange}
                                type="password"
                                placeholder="Digite sua senha"
                                className='text-secondary-0'
                            />
                        </Input>

                        {!!errors.password?.message && (
                            <FormControlErrorText>{errors.password.message as string}</FormControlErrorText>
                        )}
                    </FormControl>
                )}
            />

            <FormButton
                label='Entrar'
                loading={loading}
                onPress={handleSubmit(onSubmit)}
                className='mt-2'
            />

            <Button variant='link' onPress={navigateToSignUp}>
                <Text className='text-secondary-0'>Não possui uma conta?
                    <ButtonText className='text-tertiary-500'>
                        {' '}Cadastre-se
                    </ButtonText>
                </Text>
            </Button>
        </VStack>
    );
};