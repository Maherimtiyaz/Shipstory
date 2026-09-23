import { cn } from "@/lib/utils";

interface BadgeProps {
  variant?: "default" | "secondary" | "outline" | "success" | "warning" | "muted" | "destructive";
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = "default", children, className }: BadgeProps) {
  const variants = {
    default: "bg-accent/10 text-accent-foreground border-accent/20",
    secondary: "bg-secondary/10 text-secondary-foreground border-secondary/20",
    outline: "bg-transparent border-border text-foreground",
    success: "bg-success/10 text-green-400 border-success/20",
    warning: "bg-warning/10 text-yellow-400 border-warning/20",
    muted: "bg-muted text-muted-foreground border-border",
    destructive: "bg-destructive/10 text-red-400 border-destructive/20",
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
