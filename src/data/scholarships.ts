/**
 * AlignTraits scholarship directory.
 *
 * Outside scholarships (and a few universities' own awards) shown in the
 * "Scholarship Information" tab of every course they apply to.
 *
 * HOW TO UPDATE (no database or backend change needed):
 *  - Edit a row below, or copy a row to add a new scholarship, then commit.
 *  - Dates are written as "YYYY-MM-DD". The status badge (Open now, Opens soon,
 *    Closing soon, Recurring) is worked out from the dates every time the page loads.
 *  - Only use links from the provider's official website.
 *  - To switch the whole feature off, set SCHOLARSHIP_DIRECTORY_ENABLED to false.
 *
 * HOW MATCHING WORKS
 *  - `targets: "ALL"` means every undergraduate course at a Nigerian university.
 *  - Otherwise each target names one of the 11 platform categories, and can narrow it
 *    with `titleIncludes` (the course title must contain one of these words) and
 *    `titleExcludes` (the course title must not contain any of these words).
 *  - `universityIncludes` limits a row to one university (for a university's own award).
 *  - `schoolTypes` limits a row to some school types (for example public universities only).
 */

import { courseCategoryList } from "./courseCategories";

export const SCHOLARSHIP_DIRECTORY_ENABLED = true;

/** When the list below was last checked against the official pages. */
export const SCHOLARSHIPS_LAST_CHECKED = "27 October 2026";

export type SchoolTypeCode = "PRIVATE_UNIVERSITY" | "FEDERAL_UNIVERSITY" | "PUBLIC_UNIVERSITY";

export interface ScholarshipTarget {
  category: string;
  titleIncludes?: string[];
  titleExcludes?: string[];
}

export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  providerType: string;
  summary: string;
  amount: string;
  level: string;
  eligibility: string;
  howToApply: string;
  link: string;
  /** Labels shown as small chips, e.g. "Female students only". */
  tags?: string[];
  /** Current or last known round. "YYYY-MM-DD". */
  opens?: string;
  closes?: string;
  /** Shown when the round is closed, e.g. "Usually opens late April and closes end of May". */
  usualWindow?: string;
  /** A standing university policy with no application round. */
  standing?: boolean;
  targets: "ALL" | ScholarshipTarget[];
  universityIncludes?: string[];
  schoolTypes?: SchoolTypeCode[];
}

/* Reusable keyword lists */
const ENGINEERING_ONLY: ScholarshipTarget = { category: "Engineering", titleIncludes: ["engineer"] };
const AGRIC_DEGREES = ["agricult", "animal", "crop", "soil", "horticulture"];

export const SCHOLARSHIPS: Scholarship[] = [
  {
    id: "chevron-jv-standard",
    name: "NNPC Ltd/Chevron JV National University Scholarship",
    provider: "Chevron Nigeria Limited (NNPC Ltd/CNL Joint Venture)",
    providerType: "Oil and gas company",
    summary:
      "For strong 200 level students in listed courses at any accredited Nigerian university. It pays a yearly grant until graduation.",
    amount: "Yearly grant until graduation (amount not published)",
    level: "200 level only",
    eligibility:
      "Minimum CGPA of 3.5 out of 5.0, six O'Level credits in one sitting, not on another oil and gas scholarship. You cannot apply for this and the Agbami scholarship together.",
    howToApply: "Apply online on Scholastica. Shortlisted students sit a computer-based test.",
    link: "https://candidate.scholastica.ng/schemes/2026CNLawards",
    closes: "2026-06-30",
    usualWindow: "Usually runs in the middle of the year. The 2026 round closed on 30 June.",
    targets: [
      { category: "Business and Management", titleIncludes: ["account", "business admin", "business management"], titleExcludes: ["education", "agri"] },
      { category: "Social Sciences", titleIncludes: ["economics"], titleExcludes: ["agric", "agricut", "home", "consumer", "education"] },
      { category: "IT & Computer Science", titleIncludes: ["computer science", "computer engineering", "electronics/computer", "electronics & computer", "surveying", "geoinformatics", "geo-informatics"], titleExcludes: ["education", "curriculum"] },
      ENGINEERING_ONLY,
      { category: "Health and Medical Sciences", titleIncludes: ["dentistry", "dental surgery", "pharmacy", "medicine and surgery", "medicine & surgery", "mbbs", "bachelor of medicine"], titleExcludes: ["veterinary", "herbal", "clinical pharmacy and pharmacy management"] },
      { category: "Law and Legal Studies" },
      { category: "Communication and Media Studies", titleIncludes: ["mass comm", "journalism", "broadcast"] },
      { category: "Agriculture and Environmental Studies", titleIncludes: ["agricult"] },
      { category: "Architecture and Design", titleIncludes: ["architecture", "urban", "regional planning"] },
    ],
  },
  {
    id: "chevron-jv-visually-impaired",
    name: "NNPC Ltd/Chevron JV Scholarship for Blind or Visually Impaired Students",
    provider: "Chevron Nigeria Limited (NNPC Ltd/CNL Joint Venture)",
    providerType: "Oil and gas company",
    summary:
      "For blind or visually impaired 200 level students in any course at any accredited Nigerian university. It pays a yearly grant.",
    amount: "Yearly grant (amount not published)",
    level: "200 level only",
    eligibility:
      "Medical certificate of visual impairment from a recognised or government hospital, minimum CGPA of 2.5 out of 5.0 and five O'Level credits.",
    howToApply: "Apply online on Scholastica. Shortlisted students sit a computer-based test.",
    link: "https://candidate.scholastica.ng/schemes/2026CNLawards",
    tags: ["Blind or visually impaired students"],
    closes: "2026-06-30",
    usualWindow: "Usually runs in the middle of the year. The 2026 round closed on 30 June.",
    targets: "ALL",
  },
  {
    id: "renaissance-jv-national",
    name: "NNPC/Renaissance JV University Scholarship (National Merit Award)",
    provider: "Renaissance Africa Energy Company (formerly the Shell SPDC Joint Venture)",
    providerType: "Oil and gas company",
    summary:
      "For 200 level students from any state at any accredited Nigerian university. It pays a yearly grant to the end of the degree.",
    amount: "Yearly grant until graduation (amount not published)",
    level: "200 level",
    eligibility: "Nigerian citizen, full-time student, not on another oil and gas scholarship. Applying is free.",
    howToApply: "Apply online on Scholastica. Shortlisted students sit a supervised computer-based test.",
    link: "https://candidate.scholastica.ng/schemes/NNPCRENAISSANCEJV2026",
    opens: "2026-04-30",
    closes: "2026-05-31",
    usualWindow: "Usually opens in late April and closes at the end of May.",
    targets: "ALL",
  },
  {
    id: "renaissance-jv-host",
    name: "NNPC/Renaissance JV University Scholarship (Areas of Operation Award)",
    provider: "Renaissance Africa Energy Company",
    providerType: "Oil and gas company",
    summary:
      "For 200 level students from Renaissance host areas in Bayelsa, Delta, Imo and Rivers States. It pays a yearly grant.",
    amount: "Yearly grant (amount not published)",
    level: "200 level",
    eligibility:
      "Indigene of an operational area, with letters from the Paramount Ruler and the Community Development Committee Chairman.",
    howToApply: "Apply online on Scholastica, then sit a computer-based test.",
    link: "https://candidate.scholastica.ng/schemes/NNPCRENAISSANCEJV2026",
    tags: ["Host communities in Bayelsa, Delta, Imo and Rivers"],
    opens: "2026-04-30",
    closes: "2026-05-31",
    usualWindow: "Usually opens in late April and closes at the end of May.",
    targets: "ALL",
  },
  {
    id: "oando-jv-national",
    name: "NEPL/OERNL JV Tertiary Scholarship (National Merit Award)",
    provider: "Oando Energy Resources Nigeria Ltd (formerly the NNPC/NAOC Joint Venture)",
    providerType: "Oil and gas company",
    summary:
      "For 100 level students in engineering, geology, geosciences or agriculture who are not from host communities. It pays a yearly scholarship.",
    amount: "Yearly scholarship (amount not published)",
    level: "100 level only",
    eligibility:
      "Not on a similar scholarship and not a dependant of Oando staff. You must score at least 50% in the online aptitude test.",
    howToApply: "Apply online on Scholastica, then sit an online aptitude test.",
    link: "https://candidate.scholastica.ng/schemes/oandoscholarship2026",
    opens: "2026-03-03",
    closes: "2026-04-01",
    usualWindow: "Usually opens in March and closes in early April.",
    targets: [
      ENGINEERING_ONLY,
      { category: "IT & Computer Science", titleIncludes: ["computer engineering", "electronics/computer", "electronics & computer"] },
      { category: "Agriculture and Environmental Studies", titleIncludes: [...AGRIC_DEGREES, "earth and environmental"], titleExcludes: ["biology"] },
    ],
  },
  {
    id: "oando-jv-host",
    name: "NEPL/OERNL JV Tertiary Scholarship (Host and Transit Communities Award)",
    provider: "Oando Energy Resources Nigeria Ltd",
    providerType: "Oil and gas company",
    summary:
      "For 100 level students from Oando host or transit communities in Rivers, Bayelsa, Delta and Imo States. It pays a yearly scholarship.",
    amount: "Yearly scholarship (amount not published)",
    level: "100 level only",
    eligibility: "Letters from the Paramount Ruler and the Community Development Committee Chairman, and an aptitude test.",
    howToApply: "Apply online on Scholastica, then sit an aptitude test.",
    link: "https://candidate.scholastica.ng/schemes/oandoscholarship2026",
    tags: ["Host communities in Rivers, Bayelsa, Delta and Imo"],
    opens: "2026-03-03",
    closes: "2026-04-01",
    usualWindow: "Usually opens in March and closes in early April.",
    targets: "ALL",
  },
  {
    id: "waaw-foundation",
    name: "WAAW Foundation Undergraduate Scholarship",
    provider: "WAAW Foundation",
    providerType: "Foundation or NGO",
    summary:
      "For female STEM undergraduates of African origin studying in Africa who need financial help. It gives a one-off award with mentoring.",
    amount: "US$500 one-off award, paid in naira, plus mentoring and leadership training",
    level: "First or second year of a 4-year course, or third year of a 5-year course",
    eligibility: "Female, under 32, first degree, financial need, strong grades and some volunteering.",
    howToApply: "Apply online on the WAAW Foundation website.",
    link: "https://waawfoundation.org/waaw-foundation-2025-2026-undergraduate-scholarship/",
    tags: ["Female students only"],
    usualWindow: "Usually opens in late October or November. The 2026/27 round is expected soon.",
    targets: [
      { category: "IT & Computer Science", titleExcludes: ["library", "education", "curriculum", "peace", "community health", "media", "archival", "communication"] },
      ENGINEERING_ONLY,
      { category: "Health and Medical Sciences", titleIncludes: ["pharmacy", "pharmaceut", "medical laboratory", "medical lab", "anatomy", "physiology", "biochemistry"], titleExcludes: ["veterinary", "morbid", "management", "administration"] },
      { category: "Agriculture and Environmental Studies", titleIncludes: ["environmental science", "earth and environmental", "chemistry", "biology"] },
    ],
  },
  {
    id: "seg-scholarship",
    name: "SEG Scholarships",
    provider: "Society of Exploration Geophysicists (SEG)",
    providerType: "Professional body",
    summary:
      "For undergraduates anywhere in the world, including Nigeria, who plan a career in applied geophysics.",
    amount: "Award amount varies (see official page)",
    level: "Any year of undergraduate study",
    eligibility: "Above-average grades and a course that leads to a career in applied geophysics.",
    howToApply: "Apply online on the SEG website.",
    link: "https://seg.org/programs/student-programs/scholarships/",
    opens: "2026-11-01",
    usualWindow: "Opens on 1 November each year.",
    targets: [{ category: "Agriculture and Environmental Studies", titleIncludes: ["earth and environmental"] }],
  },
  {
    id: "jim-ovia-foundation",
    name: "Jim Ovia Foundation Scholarship",
    provider: "Jim Ovia Foundation",
    providerType: "Foundation or NGO",
    summary:
      "For admitted Nigerian undergraduates in any course. It pays a yearly award that can be renewed to the end of the degree.",
    amount: "₦250,000 a year, renewable",
    level: "Admitted undergraduates (proof of admission needed)",
    eligibility:
      "Nigerian, at least 16 years old, five O'Level credits and a letter from your Head of Department. No agents and no fees.",
    howToApply: "Apply online on the foundation's website only.",
    link: "https://jimoviafoundation.org/FAQ/",
    opens: "2025-11-26",
    closes: "2025-11-28",
    usualWindow: "Usually a very short window in late November. Check the website often from mid-November.",
    targets: "ALL",
  },
  {
    id: "lagos-state-scholarship",
    name: "Lagos State Scholarship Award (Undergraduate)",
    provider: "Lagos State Scholarship Board",
    providerType: "State Government",
    summary: "A merit award for Lagos State indigenes studying for a first degree at universities across Nigeria.",
    amount: "Yearly award (amount not published)",
    level: "Undergraduate",
    eligibility: "Lagos State indigene with strong grades. Confirm on the board's portal that private university students qualify.",
    howToApply: "Apply online on the Lagos State Scholarship Board portal.",
    link: "https://www.lagosscholarship.org/",
    tags: ["Lagos State indigenes"],
    opens: "2026-01-19",
    closes: "2026-02-27",
    usualWindow: "Usually opens in January and closes in February or March.",
    targets: "ALL",
  },
  {
    id: "lagos-state-bursary",
    name: "Lagos State Bursary Award",
    provider: "Lagos State Scholarship Board",
    providerType: "State Government",
    summary: "Yearly bursary support for Lagos State indigenes in tertiary institutions.",
    amount: "Yearly bursary (amount not published)",
    level: "Undergraduate",
    eligibility: "Lagos State indigene. Confirm on the board's portal that private university students qualify.",
    howToApply: "Apply online on the Lagos State Scholarship Board portal.",
    link: "https://www.lagosscholarship.org/",
    tags: ["Lagos State indigenes"],
    opens: "2026-01-19",
    closes: "2026-02-27",
    usualWindow: "Usually opens in January and closes in February or March.",
    targets: "ALL",
  },
  {
    id: "pau-tuition-aid",
    name: "Pan-Atlantic University Tuition Fee Aid",
    provider: "Pan-Atlantic University",
    providerType: "University's own scholarship",
    summary:
      "For PAU students with strong grades who need financial help. About 15% of students receive aid, some of it almost full tuition.",
    amount: "Almost full scholarships for about 5% of students, partial scholarships for about 10%",
    level: "New and current undergraduates",
    eligibility: "High grades before and during university, plus proven financial need.",
    howToApply: "Apply through the PAU financial aid process when you apply for admission.",
    link: "https://pau.edu.ng/admissions/undergrad-2/aid/",
    opens: "2026-05-23",
    closes: "2026-06-23",
    usualWindow: "Usually opens in late May and closes in late June.",
    targets: "ALL",
    universityIncludes: ["pan-atlantic", "pan atlantic"],
  },
  {
    id: "pau-sibling",
    name: "Pan-Atlantic University Sibling Discount",
    provider: "Pan-Atlantic University",
    providerType: "University's own scholarship",
    summary: "A tuition discount when brothers or sisters study at PAU at the same time.",
    amount: "Tuition discount (ask the bursary for current rates)",
    level: "All levels",
    eligibility: "Two or more siblings enrolled at PAU at the same time.",
    howToApply: "Ask the PAU bursary.",
    link: "https://pau.edu.ng/admissions/undergrad-2/aid/",
    standing: true,
    targets: "ALL",
    universityIncludes: ["pan-atlantic", "pan atlantic"],
  },
  {
    id: "abuad-agriculture",
    name: "ABUAD Agriculture Tuition Reduction",
    provider: "Afe Babalola University, Ado-Ekiti",
    providerType: "University's own scholarship",
    summary: "Half tuition for all five years for B.Agric students, plus a cash fund at graduation.",
    amount: "50% off tuition for 5 years, plus a ₦250,000 empowerment fund at graduation",
    level: "100 to 500 level",
    eligibility: "Enrolled on the B.Agric programme.",
    howToApply: "Applied when you are admitted to B.Agric.",
    link: "https://www.abuad.edu.ng/abuad-special-privileges-for-parents-and-staff/",
    standing: true,
    targets: [{ category: "Agriculture and Environmental Studies", titleIncludes: AGRIC_DEGREES, titleExcludes: ["biology"] }],
    universityIncludes: ["afe babalola", "abuad"],
  },
  {
    id: "abuad-top-admission",
    name: "ABUAD Top Admission Result Award",
    provider: "Afe Babalola University, Ado-Ekiti",
    providerType: "University's own scholarship",
    summary: "A tuition cut for the student with the highest admission result in the first session.",
    amount: "10% off tuition",
    level: "100 level entry",
    eligibility: "Highest admission result.",
    howToApply: "Given automatically from admission results.",
    link: "https://www.abuad.edu.ng/abuad-special-privileges-for-parents-and-staff/",
    standing: true,
    targets: "ALL",
    universityIncludes: ["afe babalola", "abuad"],
  },
  {
    id: "abuad-indigent",
    name: "ABUAD Award for Outstanding Indigent Students",
    provider: "Afe Babalola University, Ado-Ekiti",
    providerType: "University's own scholarship",
    summary: "A tuition cut for the most outstanding candidate who is proven to be poor before admission. It lasts the whole programme.",
    amount: "10% off tuition",
    level: "Whole programme",
    eligibility: "Proven financial need before admission, and a CGPA of 4.50 or above to keep it.",
    howToApply: "Contact the ABUAD admissions office.",
    link: "https://www.abuad.edu.ng/abuad-special-privileges-for-parents-and-staff/",
    standing: true,
    targets: "ALL",
    universityIncludes: ["afe babalola", "abuad"],
  },
  {
    id: "abuad-sibling",
    name: "ABUAD Sibling Tuition Reduction",
    provider: "Afe Babalola University, Ado-Ekiti",
    providerType: "University's own scholarship",
    summary: "A tuition cut for families with two or more children at ABUAD.",
    amount: "10% off for one child when two are registered, 10% off for two children when four are registered",
    level: "All levels",
    eligibility: "Siblings registered at ABUAD at the same time.",
    howToApply: "Ask the ABUAD bursary.",
    link: "https://www.abuad.edu.ng/abuad-special-privileges-for-parents-and-staff/",
    standing: true,
    targets: "ALL",
    universityIncludes: ["afe babalola", "abuad"],
  },
];

/* ------------------------------------------------------------------ */
/* Matching                                                            */
/* ------------------------------------------------------------------ */

/** The parts of a course the matcher needs. Works with the app's Course type. */
export interface ScholarshipCourseInput {
  title?: string | null;
  categoryId?: number | null;
  programLevel?: string | null;
  university?: { name?: string | null; country?: string | null; schoolType?: string | null } | null;
}

const norm = (s?: string | null) => (s ?? "").toLowerCase().replace(/\s+/g, " ").trim();

export function categoryNameForId(categoryId?: number | null): string | null {
  if (categoryId === null || categoryId === undefined) return null;
  const found = courseCategoryList.find((c) => c.id === categoryId);
  return found ? found.name : null;
}

function isUndergraduate(programLevel?: string | null): boolean {
  const level = norm(programLevel);
  if (!level) return true;
  return !/(master|msc|m\.sc|mba|pgd|postgrad|post graduate|phd|doctor)/.test(level);
}

function inNigeria(country?: string | null): boolean {
  const c = norm(country);
  return !c || c.includes("nigeria");
}

function targetMatches(target: ScholarshipTarget, title: string, category: string | null): boolean {
  if (category !== null && norm(target.category) !== norm(category)) return false;
  // Without a category we only trust targets that also name title keywords.
  if (category === null && !target.titleIncludes) return false;
  if (target.titleIncludes && !target.titleIncludes.some((w) => title.includes(norm(w)))) return false;
  if (target.titleExcludes && target.titleExcludes.some((w) => title.includes(norm(w)))) return false;
  return true;
}

export function scholarshipMatchesCourse(s: Scholarship, course: ScholarshipCourseInput): boolean {
  if (!isUndergraduate(course.programLevel)) return false;
  if (!inNigeria(course.university?.country)) return false;

  if (s.schoolTypes && course.university?.schoolType) {
    if (!s.schoolTypes.includes(course.university.schoolType as SchoolTypeCode)) return false;
  }
  if (s.universityIncludes) {
    const uni = norm(course.university?.name);
    if (!s.universityIncludes.some((w) => uni.includes(norm(w)))) return false;
  }
  if (s.targets === "ALL") return true;

  const title = norm(course.title);
  const category = categoryNameForId(course.categoryId);
  return s.targets.some((t) => targetMatches(t, title, category));
}

/* ------------------------------------------------------------------ */
/* Status                                                              */
/* ------------------------------------------------------------------ */

export type ScholarshipStatusCode = "open" | "closing-soon" | "opens-soon" | "recurring" | "standing";

export interface ScholarshipStatus {
  code: ScholarshipStatusCode;
  label: string;
  /** One plain line about dates, e.g. "Closes 30 November 2026". */
  dateLine: string;
}

const DAY = 24 * 60 * 60 * 1000;

/** "YYYY-MM-DD" to a local date, at the start of the day or at the end of it. */
function parseDate(d?: string, endOfDay = false): Date | null {
  if (!d) return null;
  const [y, m, day] = d.split("-").map(Number);
  if (!y || !m || !day) return null;
  return endOfDay ? new Date(y, m - 1, day, 23, 59, 59) : new Date(y, m - 1, day, 0, 0, 0);
}

export function formatDate(d?: string): string {
  const date = parseDate(d);
  if (!date) return "";
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export function getScholarshipStatus(s: Scholarship, today: Date = new Date()): ScholarshipStatus {
  if (s.standing) {
    return { code: "standing", label: "Available", dateLine: "No deadline. This is a standing university policy." };
  }
  const opens = parseDate(s.opens);
  const closes = parseDate(s.closes, true);
  const now = today.getTime();

  if (opens && now < opens.getTime() && opens.getTime() - now <= 60 * DAY) {
    return {
      code: "opens-soon",
      label: "Opens soon",
      dateLine: `Opens ${formatDate(s.opens)}${s.closes ? `. Closes ${formatDate(s.closes)}` : ""}.`,
    };
  }

  const started = !opens || now >= opens.getTime();
  if (closes && started && now <= closes.getTime()) {
    const daysLeft = Math.ceil((closes.getTime() - now) / DAY);
    if (daysLeft <= 14) {
      return { code: "closing-soon", label: "Closing soon", dateLine: `Closes ${formatDate(s.closes)}. Apply now.` };
    }
    return { code: "open", label: "Open now", dateLine: `Closes ${formatDate(s.closes)}.` };
  }
  // Opened recently with no deadline published yet.
  if (!closes && opens && now >= opens.getTime() && now - opens.getTime() <= 120 * DAY) {
    return { code: "open", label: "Open now", dateLine: `Opened ${formatDate(s.opens)}. See the official page for the deadline.` };
  }

  const last =
    s.opens && s.closes
      ? ` Last round: ${formatDate(s.opens)} to ${formatDate(s.closes)}.`
      : s.closes
        ? ` Last round closed ${formatDate(s.closes)}.`
        : "";
  return { code: "recurring", label: "Not open now", dateLine: `${s.usualWindow ?? "Check the official page for the next round."}${last}` };
}

const STATUS_ORDER: Record<ScholarshipStatusCode, number> = {
  "closing-soon": 0,
  open: 1,
  "opens-soon": 2,
  standing: 3,
  recurring: 4,
};

/** Scholarships for one course, open ones first. Never throws. */
export function getScholarshipsForCourse(
  course: ScholarshipCourseInput | null | undefined,
  today: Date = new Date(),
): Array<{ scholarship: Scholarship; status: ScholarshipStatus }> {
  if (!SCHOLARSHIP_DIRECTORY_ENABLED || !course) return [];
  try {
    return SCHOLARSHIPS.filter((s) => scholarshipMatchesCourse(s, course))
      .map((s) => ({ scholarship: s, status: getScholarshipStatus(s, today) }))
      .sort((a, b) => STATUS_ORDER[a.status.code] - STATUS_ORDER[b.status.code]);
  } catch (err) {
    console.error("Scholarship directory error", err);
    return [];
  }
}
