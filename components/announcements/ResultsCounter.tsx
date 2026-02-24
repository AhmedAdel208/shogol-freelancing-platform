import { ResultsCounterProps } from "@/types/announcements";

export default function ResultsCounter({
  currentCount,
  totalCount,
  label = "مشروع",
}: ResultsCounterProps) {
  return (
    <div>
      <p className="text-dark ">
        عرض <span className="font-bold text-dark">{currentCount}</span> من{" "}
        <span className="font-bold text-dark">{totalCount}</span> {label}
      </p>
    </div>
  );
}
