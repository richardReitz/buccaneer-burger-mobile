import React from "react"
import {
  useToast as useUiToast,
  Toast,
  ToastTitle,
  ToastDescription,
} from "@/components/ui/toast"
import { InterfaceToastProps } from "@gluestack-ui/toast/lib/types"

type ReturnProps = {
    handleUseToast: (props: UseToast) => void
}

type UseToast = {
    type?: "error" | "warning" | "success" | "info" | "muted"
    title: string
    description: string
} & InterfaceToastProps

export const useToast = (): ReturnProps => {
    const toast = useUiToast()
    const [toastId, setToastId] = React.useState<string>('')
    
    const handleUseToast = (props: UseToast) => {
        if (!toast.isActive(toastId)) {
            showNewToast(props)
        }
    }

    const showNewToast = (props: UseToast) => {
        const newId = Math.random()
        const id = `id-${String(newId)}`

        setToastId(id)
        toast.show({
            id,
            placement: "bottom",
            duration: 3000,
            avoidKeyboard: true,
            ...props,
            render: ({ id }) => {
                const uniqueToastId = "toast-" + id
                return (
                    <Toast nativeID={uniqueToastId} action={props.type} variant="solid">
                        <ToastTitle>{props.title}</ToastTitle>
                        <ToastDescription>
                            {props.description}
                        </ToastDescription>
                    </Toast>
                )
            },
        })
    }

    return { handleUseToast }
}