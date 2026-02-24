interface DropdownArrowProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function DropdownArrow({
  className = "w-3 h-3 text-slate-400",
  width = 12,
  height = 8,
}: DropdownArrowProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M10.5 1.5L6 6L1.5 1.5"
        stroke="#475569"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
