import { Loader2 } from "lucide-react";

interface SpinnerProps {
  size?: number;
  className?: string;
  inline?: boolean;
}

export default function Spinner({
  size = 10,
  className = "",
  inline = false,
}: SpinnerProps) {
  const spinnerElement = (
    <Loader2
      className={`w-${size} h-${size} animate-spin text-primary ${className}`}
    />
  );

  if (inline) {
    return spinnerElement;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      {spinnerElement}
    </div>
  );
}
