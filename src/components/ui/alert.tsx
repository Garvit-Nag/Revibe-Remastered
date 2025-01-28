import * as React from "react"
import { AlertCircle, CheckCircle2, Info, XCircle } from "lucide-react"

const variants = {
  default: {
    containerClass: "bg-zinc-900/90 text-zinc-50 border-zinc-800",
    iconComponent: Info,
    iconClass: "text-zinc-50"
  },
  destructive: {
    containerClass: "bg-red-900/90 text-red-50 border-red-800",
    iconComponent: XCircle,
    iconClass: "text-red-400"
  },
  success: {
    containerClass: "bg-green-900/90 text-green-50 border-green-800",
    iconComponent: CheckCircle2,
    iconClass: "text-green-400"
  },
  warning: {
    containerClass: "bg-yellow-900/90 text-yellow-50 border-yellow-800",
    iconComponent: AlertCircle,
    iconClass: "text-yellow-400"
  }
}

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof variants
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const { containerClass, iconComponent: Icon, iconClass } = variants[variant]

    return (
      <div
        ref={ref}
        role="alert"
        className={`relative w-full rounded-lg border p-4 backdrop-blur-sm 
          [&>svg~*]:pl-7 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 
          ${containerClass} 
          ${className}`}
        {...props}
      >
        <Icon className={`h-5 w-5 ${iconClass}`} />
        {children}
      </div>
    )
  }
)
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h5
    ref={ref}
    className={`mb-1 font-medium leading-none tracking-tight ${className}`}
    {...props}
  >
    {children}
  </h5>
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={`text-sm opacity-90 [&_p]:leading-relaxed ${className}`}
    {...props}
  >
    {children}
  </div>
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }