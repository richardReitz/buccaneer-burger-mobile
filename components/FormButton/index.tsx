import { Button, ButtonSpinner, ButtonText } from '../ui/button';
import { TouchableOpacityProps } from 'react-native';

type Props = { label: string; loading?: boolean } & TouchableOpacityProps

export const FormButton: React.FC<Props> = ({ loading, label, className, ...rest }): JSX.Element => {
   return (
        <Button 
            {...rest}
            size="md"
            className={
                `${className} bg-tertiary-${loading ? '300' : '500'}
                data-[active=true]:bg-tertiary-300`
            }
        >
            {loading ?
                <ButtonSpinner className='text-white' />
            :
                <ButtonText>{label}</ButtonText>
            }
        </Button>
   );
};