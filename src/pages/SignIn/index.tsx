import React, { useContext } from 'react';
import { Image, Text } from 'react-native';
import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button';
import { FormControl,
    FormControlErrorText,
    FormControlLabel,
    FormControlLabelText 
} from '@/components/ui/form-control';
import { Input,
    InputField } from '@/components/ui/input';
import { VStack } from '@/components/ui/vstack';
import { Controller, useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '@/src/contexts/AuthContext';

type FormSchema = { email: string; password: string }

export const SignInScreen: React.FC = ({}): JSX.Element => {
    const { navigate } = useNavigation();
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
        <VStack className="flex-1 w-full px-12 justify-center">
            <Image
                className='size-60 self-center'
                source={require('../../assets/images/bccburger-black-vetor.png')}
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
                        <FormControlLabel className='mb-0'>
                            <FormControlLabelText>Email</FormControlLabelText>
                        </FormControlLabel>
                        
                        <Input className="my-1" size="md">
                            <InputField
                                {...field}
                                value={field.value || ""}
                                onChangeText={field.onChange}
                                placeholder="Digite seu email"
                                keyboardType="email-address"
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
                    <FormControl size="md" className='mt-2' isInvalid={!!errors.password}>
                        <FormControlLabel className='mb-0'>
                            <FormControlLabelText>Senha</FormControlLabelText>
                        </FormControlLabel>
                        
                        <Input className="my-1" size="md">
                            <InputField
                                {...field}
                                value={field.value || ""}
                                onChangeText={field.onChange}
                                type="password"
                                placeholder="Digite sua senha"
                            />
                        </Input>

                        {!!errors.password?.message && (
                            <FormControlErrorText>{errors.password.message as string}</FormControlErrorText>
                        )}
                    </FormControl>
                )}
            />

            <Button 
                className="bg-tertiary-500 mt-3"
                size="md"
                disabled={loading}
                onPress={handleSubmit(onSubmit)}
            >
                {loading ?
                    <ButtonSpinner className='text-white' />
                :
                    <ButtonText>Entrar</ButtonText>
                }
            </Button>

            <Button variant='link' onPress={navigateToSignUp}>
                <Text>Não possui uma conta?
                    <ButtonText className='text-tertiary-500'>
                        {' '}Cadastre-se
                    </ButtonText>
                </Text>
            </Button>
        </VStack>
    );
};