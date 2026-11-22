import { cn } from "@/lib/utils";

type ImagePlaceholderProps = {
  width?: number;
  height?: number;
  label?: string;
  className?: string;
  variant?: "portrait" | "landscape" | "square";
};

export function ImagePlaceholder({
  width = 400,
  height = 300,
  label,
  className,
  variant = "landscape",
}: ImagePlaceholderProps) {
  const variants: Record<string, { bg: string; accent: string }> = {
    portrait: { bg: "bg-stone-100", accent: "bg-primary/20" },
    landscape: { bg: "bg-stone-50", accent: "bg-primary/10" },
    square: { bg: "bg-stone-200", accent: "bg-primary/15" },
  };
  const { bg } = variants[variant];

  return (
    <div
      className={cn("flex items-center justify-center", bg, className)}
      style={{ width, height }}
    >
      <svg
        width={Math.min(width, 120)}
        height={Math.min(height, 120)}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary/30"
      >
        <path
          d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {label && (
        <p className="mt-4 text-sm text-muted-foreground">{label}</p>
      )}
    </div>
  );
}
