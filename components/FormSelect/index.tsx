import { 
    Select,
    SelectContent,
    SelectDragIndicator,
    SelectDragIndicatorWrapper,
    SelectIcon,
    SelectInput,
    SelectItem,
    SelectPortal,
    SelectTrigger,
} from '@/components/ui/select';
import { ChevronDownIcon } from 'lucide-react-native';
import { Spinner } from '../ui/spinner';
import type { ISelectItemProps, ISelectProps } from '@gluestack-ui/select/lib/types';

type Props = { 
    className?: string
    items: ISelectItemProps[]
    loading?: boolean
} & ISelectProps

export const FormSelect: React.FC<Props> = ({ items, className, loading = false, ...rest }): JSX.Element => {
    return (
        <Select {...rest}>
            <SelectTrigger
                variant="outline"
                size="lg"
                className={
                    `${className} justify-between border-0 bg-background-700 w-full pr-3`
                }
            >
                <SelectInput placeholder="Selecione uma opçao" className='text-white font-semibold mt-2'/>
                <SelectIcon className="text-white" as={loading ? Spinner : ChevronDownIcon} size="xl" />
            </SelectTrigger>

            {/* bottom sheet options */}
            {!loading &&
                <SelectPortal>
                    <SelectContent>
                        <SelectDragIndicatorWrapper>
                            <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        {items.map(( rest ) =>
                            <SelectItem key={rest.value} {...rest} />
                        )}
                    </SelectContent>
                </SelectPortal>
            }
        </Select>
   );
};