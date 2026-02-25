import { Info, AlertTriangle, Lightbulb, type LucideIcon } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const calloutVariants = cva(
  "my-6 flex items-center gap-3 rounded-md border-l-4 px-4 py-2.5",
  {
    variants: {
      variant: {
        info: "border-l-blue-500 bg-blue-500/5 text-blue-200",
        warning: "border-l-amber-500 bg-amber-500/5 text-amber-200",
        tip: "border-l-emerald-500 bg-emerald-500/5 text-emerald-200",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
)

const iconMap: Record<NonNullable<VariantProps<typeof calloutVariants>["variant"]>, LucideIcon> = {
  info: Info,
  warning: AlertTriangle,
  tip: Lightbulb,
}

const labelMap: Record<NonNullable<VariantProps<typeof calloutVariants>["variant"]>, string> = {
  info: "Info",
  warning: "Warning",
  tip: "Tip",
}

function Callout({
  variant = "info",
  children,
  className,
}: {
  variant?: VariantProps<typeof calloutVariants>["variant"]
  children: React.ReactNode
  className?: string
}) {
  const resolvedVariant = variant ?? "info"
  const Icon = iconMap[resolvedVariant]
  const label = labelMap[resolvedVariant]

  return (
    <div
      data-slot="callout"
      className={cn(calloutVariants({ variant: resolvedVariant, className }))}
      role="note"
    >
      <Icon className="size-5 shrink-0" aria-hidden="true" />
      <div className="min-w-0">
        <p className="!mt-0 mb-1 text-sm font-semibold">{label}</p>
        <div className="text-sm [&>p]:!m-0">{children}</div>
      </div>
    </div>
  )
}

export { Callout, calloutVariants }
