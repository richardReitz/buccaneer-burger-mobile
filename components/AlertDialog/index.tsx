import React from "react";
import {
  AlertDialog as AlertDialogView,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogBody,
  AlertDialogBackdrop
} from "@/components/ui/alert-dialog";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import type { IAlertDialogProps } from "@gluestack-ui/alert-dialog/lib/types";
	
type Props = { 
    title: string
    description: string
    handleClose: VoidFunction
    handleConfirm: VoidFunction
} & IAlertDialogProps

export const AlertDialog: React.FC<Props> = ({ title, description, handleClose, handleConfirm, ...rest }) => {
    return (
        <AlertDialogView
            size="md"
            {...rest}
        >
            <AlertDialogBackdrop />
            <AlertDialogContent>
                <AlertDialogHeader>
                <Text className="text-typography-950 font-semibold" size="md">
                    {title}
                </Text>
                </AlertDialogHeader>
                <AlertDialogBody className="mt-3 mb-4">
                <Text size="sm">
                    {description}
                </Text>
                </AlertDialogBody>
                <AlertDialogFooter className="mt-2">
                    <Button
                        variant="outline"
                        action="secondary"
                        onPress={handleClose}
                        size="sm"
                    >
                        <ButtonText>Cancelar</ButtonText>
                    </Button>
                    <Button size="sm" onPress={handleConfirm}>
                        <ButtonText>Confirmar</ButtonText>
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialogView>
    );
}