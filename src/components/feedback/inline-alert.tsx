import React from "react";
import { cn } from "@/lib/utils";
import { Info, AlertTriangle, AlertCircle, CheckCircle, X } from "lucide-react";

export type AlertVariant = "info" | "warning" | "error" | "success";

export interface InlineAlertProps {
  variant: AlertVariant;
  title?: string;
  children: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

const variantConfig = {
  info: {
    icon: Info,
    containerClass:
      "border-blue-200 bg-blue-50 dark:border-blue-900/50 dark:bg-blue-950/30",
    iconClass: "text-blue-600 dark:text-blue-400",
    titleClass: "text-blue-900 dark:text-blue-200",
    textClass: "text-blue-800 dark:text-blue-300",
  },
  warning: {
    icon: AlertTriangle,
    containerClass:
      "border-amber-200 bg-amber-50 dark:border-amber-900/50 dark:bg-amber-950/30",
    iconClass: "text-amber-600 dark:text-amber-400",
    titleClass: "text-amber-900 dark:text-amber-200",
    textClass: "text-amber-800 dark:text-amber-300",
  },
  error: {
    icon: AlertCircle,
    containerClass:
      "border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-950/30",
    iconClass: "text-red-600 dark:text-red-400",
    titleClass: "text-red-900 dark:text-red-200",
    textClass: "text-red-800 dark:text-red-300",
  },
  success: {
    icon: CheckCircle,
    containerClass:
      "border-emerald-200 bg-emerald-50 dark:border-emerald-900/50 dark:bg-emerald-950/30",
    iconClass: "text-emerald-600 dark:text-emerald-400",
    titleClass: "text-emerald-900 dark:text-emerald-200",
    textClass: "text-emerald-800 dark:text-emerald-300",
  },
};

export function InlineAlert({
  variant,
  title,
  children,
  dismissible = false,
  onDismiss,
  icon,
  action,
  className,
}: InlineAlertProps) {
  const config = variantConfig[variant];
  const IconComponent = config.icon;

  return (
    <div
      className={cn(
        "flex gap-3 rounded-lg border p-4",
        config.containerClass,
        className
      )}
      role="alert"
    >
      <div className="shrink-0 mt-0.5">
        {icon || <IconComponent className={cn("h-4 w-4", config.iconClass)} />}
      </div>
      <div className="min-w-0 flex-1">
        {title && (
          <p className={cn("text-sm font-semibold", config.titleClass)}>
            {title}
          </p>
        )}
        <div className={cn("text-sm", config.textClass, title && "mt-1")}>
          {children}
        </div>
        {action && <div className="mt-3">{action}</div>}
      </div>
      {dismissible && (
        <button
          onClick={onDismiss}
          className={cn(
            "shrink-0 rounded-md p-1 transition-colors hover:bg-black/5 dark:hover:bg-white/5",
            config.iconClass
          )}
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
