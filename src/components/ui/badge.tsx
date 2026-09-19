import { cn } from "@/lib/utils";

interface BadgeProps {
  variant?: "default" | "success" | "warning" | "muted";
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = "default", children, className }: BadgeProps) {
  const variants = {
    default: "bg-accent/10 text-accent-foreground border-accent/20",
    success: "bg-success/10 text-green-400 border-success/20",
    warning: "bg-warning/10 text-yellow-400 border-warning/20",
    muted: "bg-muted text-muted-foreground border-border",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium font-mono",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
