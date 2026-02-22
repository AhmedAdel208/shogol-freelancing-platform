import { CopyrightProps } from "@/types/copyright";

export default function Copyright({
  companyName = "Shogl Platform",
  startYear = 2021,
  developer = "lun startup studio",
  developerUrl = "#",
  className = "",
}: CopyrightProps) {
  const currentYear = new Date().getFullYear();

  const yearRange =
    startYear === currentYear
      ? `${startYear}`
      : `${startYear} - ${currentYear}`;

  return (
    <div className={`relative z-10 border-t border-white/10 py-6 ${className}`}>
      <div className="container-hd">
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 text-center">
          {/* Copyright text */}
          <p className="text-light-white text-lg">
            Copyright ©{yearRange} All rights reserved | {companyName} by{" "}
            <a
              href={developerUrl}
              rel="noopener noreferrer"
              className="text-primary hover:text-accent transition-colors duration-200"
            >
              {developer}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
