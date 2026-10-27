import { useMemo } from "react";
import { Course } from "../../../types/course.types";
import {
  getScholarshipsForCourse,
  SCHOLARSHIPS_LAST_CHECKED,
  ScholarshipStatusCode,
} from "../../../data/scholarships";

interface Props {
  courseItem: Course | null;
}

const STATUS_STYLE: Record<ScholarshipStatusCode, string> = {
  open: "bg-[#E8F5EE] text-[#1B7F4D]",
  "closing-soon": "bg-[#FDECEC] text-[#C23B3B]",
  "opens-soon": "bg-[#FEF4DA] text-[#7A5800]",
  standing: "bg-[#E6F2FF] text-[#0062CC]",
  recurring: "bg-[#F2F5F9] text-[#33669D]",
};

/**
 * Outside scholarships (and the university's own awards) that fit this course.
 * The list comes from src/data/scholarships.ts. If nothing matches, it renders nothing.
 */
const ScholarshipDirectory = ({ courseItem }: Props) => {
  const items = useMemo(() => getScholarshipsForCourse(courseItem), [courseItem]);

  if (items.length === 0) return null;

  const current = items.filter((i) => i.status.code !== "recurring");
  const later = items.filter((i) => i.status.code === "recurring");

  const renderCard = ({ scholarship: s, status }: (typeof items)[number]) => (
    <li key={s.id} className="border border-[#DBE4EE] rounded-xl p-4 bg-white">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-semibold text-[#004085] leading-snug">{s.name}</p>
          <p className="text-[12px] text-[#666666] mt-0.5">
            {s.provider} · {s.providerType}
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-[12px] font-semibold ${STATUS_STYLE[status.code]}`}
        >
          {status.label}
        </span>
      </div>

      <p className="text-[14px] text-gray-700 mt-2">{s.summary}</p>

      <div className="flex flex-wrap gap-1.5 mt-2.5">
        <span className="rounded-md bg-[#E6F2FF] text-[#0062CC] text-[12px] font-medium px-2 py-1">{s.amount}</span>
        <span className="rounded-md bg-[#F2F5F9] text-[#33669D] text-[12px] font-medium px-2 py-1">{s.level}</span>
        {(s.tags ?? []).map((t) => (
          <span key={t} className="rounded-md bg-[#FEF4DA] text-[#7A5800] text-[12px] font-medium px-2 py-1">
            {t}
          </span>
        ))}
      </div>

      <p className="text-[13px] text-gray-600 mt-2.5">
        <span className="font-semibold text-gray-800">Who can apply: </span>
        {s.eligibility}
      </p>
      <p className="text-[13px] text-gray-600 mt-1">
        <span className="font-semibold text-gray-800">Dates: </span>
        {status.dateLine}
      </p>
      <p className="text-[13px] text-gray-600 mt-1">
        <span className="font-semibold text-gray-800">How to apply: </span>
        {s.howToApply}
      </p>

      {s.link && (
        <a
          href={s.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 mt-3 text-[14px] font-semibold text-[#0071ED] hover:underline"
        >
          Visit the official page
          <span aria-hidden="true">↗</span>
        </a>
      )}
    </li>
  );

  return (
    <div className="mt-2">
      <h2 className="text-lg font-bold text-gray-900 mb-1">Scholarships you can apply for</h2>
      <p className="text-[13px] text-[#33669D] mb-4">
        {items.length} {items.length === 1 ? "scholarship fits" : "scholarships fit"} this course. Always apply on
        the official page. Genuine scholarships never ask you to pay a fee.
      </p>

      {current.length > 0 && <ul className="flex flex-col gap-3">{current.map(renderCard)}</ul>}

      {later.length > 0 && (
        <details className="mt-3 group" open={current.length === 0}>
          <summary className="cursor-pointer select-none text-[14px] font-semibold text-[#004085] py-2">
            {current.length > 0 ? `${later.length} more` : later.length}{" "}
            {later.length === 1 ? "scholarship opens" : "scholarships open"} again later
          </summary>
          <ul className="flex flex-col gap-3 mt-1">{later.map(renderCard)}</ul>
        </details>
      )}

      <p className="text-[12px] text-[#999999] mt-3">Last checked {SCHOLARSHIPS_LAST_CHECKED}. Dates can change, so confirm on the official page.</p>
    </div>
  );
};

export default ScholarshipDirectory;
