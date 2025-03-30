import React from 'react';
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
import { FormButton } from '@/components/FormButton';
import { Text } from '@/components/ui/text';

type FormSchema = { name: string; email: string; password: string }

export const SignUpnScreen: React.FC = ({}): JSX.Element => {
    const { goBack } = useNavigation();
    const { control, handleSubmit, formState: { errors } } = useForm<FormSchema>();
    
    const [loading, setLoading] = React.useState<boolean>(false);

    const onSubmit = async (values: FormSchema): Promise<void> => {
        setLoading(true)
        console.log('values: ', values);

        try {
            
        } catch (error) {
            console.log('error: ', error);
        } finally {
            setLoading(false)
        }
    }

    return (
        <VStack className="flex-1 w-full px-12 justify-center gap-1 bg-background-900">
            <Text className='text-center font-bold text-3xl mb-4 text-secondary-0'>
                Criar conta
            </Text>
            
            <Controller 
                control={control}
                name="name"
                rules={{
                    required: "Digite um name válido"                 
                }}
                render={({ field }) => (
                    <FormControl size="md" isInvalid={!!errors.name}>
                        <FormControlLabelText className='text-secondary-0'>
                            Nome
                        </FormControlLabelText>
                        
                        <Input className="bg-background-700 border-0" size="lg">
                            <InputField
                                {...field}
                                value={field.value || ""}
                                onChangeText={field.onChange}
                                placeholder="Digite seu nome"
                                className='text-secondary-0'
                            />
                        </Input>

                        {!!errors.name?.message && (
                            <FormControlErrorText>{errors.name.message as string}</FormControlErrorText>
                        )}
                    </FormControl>
                )}
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
                label='Criar'
                loading={loading}
                onPress={handleSubmit(onSubmit)}
                className='mt-2'
            />
            
            <Button variant='link' onPress={goBack}>
                <Text className='text-secondary-0'>Já possui uma conta?
                    <ButtonText className='text-tertiary-500'>
                        {' '}Entrar
                    </ButtonText>
                </Text>
            </Button>
        </VStack>
    );
};