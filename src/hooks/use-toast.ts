import { toast as sonnerToast } from "sonner"

type ToastProps = {
    title?: string
    description?: string
    variant?: "default" | "destructive"
}

export function toast(props: ToastProps) {
    return sonnerToast(props.title || "", {
        description: props.description,
        className: props.variant === "destructive" ? "destructive" : ""
    })
}