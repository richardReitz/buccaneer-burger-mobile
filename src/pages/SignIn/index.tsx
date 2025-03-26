import React from 'react';
import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button';
import { FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlHelper, FormControlHelperText, FormControlLabel, FormControlLabelText } from '@/components/ui/form-control';
import { Input, InputField } from '@/components/ui/input';
import { VStack } from '@/components/ui/vstack';

type Props = {

};

export const SignInScreen: React.FC<Props> = ({

}): JSX.Element => {
    return (
        <VStack className="w-full max-w-[300px] rounded-md border border-background-200 p-4">
            <FormControl
                size="md"
            >
                <FormControlLabel>
                <FormControlLabelText>Password</FormControlLabelText>
                </FormControlLabel>
                <Input className="my-1" size="md">
                    <InputField
                        type="password"
                        placeholder="password"
                        value={'inputValue'}
                        onChangeText={(text) => {}}
                    />
                </Input>
                <FormControlHelper>
                    <FormControlHelperText>
                        Must be atleast 6 characters.
                    </FormControlHelperText>
                </FormControlHelper>
                <FormControlError>
                    <FormControlErrorIcon  />
                    <FormControlErrorText>
                        Atleast 6 characters are required.
                    </FormControlErrorText>
                </FormControlError>
            </FormControl>
            <Button className="w-fit self-end mt-4" size="sm" onPress={()=>{}}>
                <ButtonText>Submit</ButtonText>
            </Button>
        </VStack>
    );
};