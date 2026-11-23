import { cn } from "@/lib/utils";

type ImagePlaceholderProps = {
  width?: number;
  height?: number;
  label?: string;
  className?: string;
  variant?: "portrait" | "landscape" | "square";
};

export function ImagePlaceholder({
  label,
  className,
  variant = "landscape",
}: ImagePlaceholderProps) {
  const variants: Record<NonNullable<ImagePlaceholderProps["variant"]>, { bg: string }> = {
    portrait: { bg: "bg-muted/60" },
    landscape: { bg: "bg-muted/40" },
    square: { bg: "bg-muted/70" },
  };
  const { bg } = variants[variant];

  return (
    <div
      className={cn(
        "flex w-full h-full flex-col items-center justify-center text-center gap-3 p-6",
        bg,
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 shrink-0 text-primary/35"
        aria-hidden="true"
      >
        <path
          d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {label && (
        <p className="text-sm font-medium text-muted-foreground max-w-[220px] leading-snug">
          {label}
        </p>
      )}
    </div>
  );
}
