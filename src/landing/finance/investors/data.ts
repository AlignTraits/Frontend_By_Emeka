/*
  Words and links for the For Investors page (/finances/investors).
  General information only: not an offer, and no returns are quoted.

  CONFIRM BEFORE LAUNCH (marked below):
  - the two research figures and their source line
  - the status of each area in "Where we are today"
*/

export const LINKS = {
  /* Opens an email to AlignTraits. Change the address if investor enquiries should go elsewhere. */
  expressInterest: 'mailto:support@aligntraits.com?subject=Investor%20interest%20in%20AlignTraits',
} as const;

export const PAGE_META = {
  title: 'For investors | AlignTraits',
  description:
    'Fund loans, income-share plans or scholarships for Nigerian students checked against current admission rules and a realistic budget. General information, not an offer.',
} as const;

export const HERO = {
  titleStart: 'Back Nigerian students',
  titleAccent: 'from admission to graduation',
  titleEnd: '.',
  subtitle:
    'Investors, foundations and partner organisations can fund loans, income-share plans or scholarships for students on AlignTraits. Every student is checked against current admission rules and a realistic budget first.',
  note: 'This page is general information. It is not an offer, and we do not quote returns.',
  cta: 'Express interest as an investor',
  helper: 'This starts a conversation, not a commitment.',
};

export const ROUTES_TO_BACK = {
  title: 'Three ways to back students',
  cards: [
    {
      title: 'Back the loan programme',
      body: 'Support financing alongside our licensed lending partners, helping cover tuition and upkeep for students who need it.',
      pill: { tone: 'gold' as const, label: 'In pilot' }, // CONFIRM BEFORE LAUNCH
    },
    {
      title: 'Fund income-share plans',
      body: 'Back high-potential students directly, in exchange for a share of their future income over an agreed term. You invest in people, not only institutions.',
      pill: { tone: 'neutral' as const, label: 'Planned' },
    },
    {
      title: 'Sponsor scholarships',
      body: 'Fund awards that students do not repay, given through partner universities or AlignTraits events.',
      pill: { tone: 'success' as const, label: 'Live' }, // CONFIRM BEFORE LAUNCH
    },
  ],
  note: 'Each route has its own structure and terms. We confirm them directly with you, and we do not publish a flat rate.',
};

export const WHY = {
  title: 'Why AlignTraits',
  body: 'Every student we bring forward has been through the same accuracy-first, affordability-aware matching that anchors the platform. So each student you back has a path that was checked against current rules and their budget, not a hopeful guess.',
  /* CONFIRM BEFORE LAUNCH: figures and source must match a study you can share with an investor. */
  stats: [
    {
      figure: '100 of 100',
      text: 'students and admissions staff named accuracy against current admission rules as the one feature that must not fail.',
    },
    {
      figure: '90 of 100',
      text: 'said ability to pay has to shape a recommendation, not only qualify it afterwards.',
    },
  ],
  source: 'Source: AlignTraits research, 100 participants.',
};

export const REPORT = {
  title: 'What we will report to you',
  body: 'You will see who your funding supported and what it made possible, in a report we agree with you.',
  privacy: 'Many students are under 18, so we protect their identities in every report.',
  card: {
    label: 'Funder report',
    title: 'Scholarship fund · First term',
    tag: 'Illustrative example',
    rows: [
      { name: 'Kadijat O, 17', detail: 'Nursing Science, year one tuition funded', status: 'Enrolled' },
      { name: 'Damilare K, 18', detail: 'Civil Engineering, hostel and feeding funded', status: 'Enrolled' },
      { name: 'Oluwatosin A, 17', detail: 'Computer Science, award at Interschool Olympics', status: 'Awarded' },
    ],
    footnote: 'Names replaced with letters to protect students.',
  },
};

export const STEPS = {
  title: 'How it works',
  items: [
    { title: 'Tell us which route fits you', body: 'Loans, income-share plans, scholarships, or a mix.' },
    {
      title: 'We walk you through the terms',
      body: 'The structure differs by route, and we confirm it directly with you.',
    },
    { title: 'You see the outcomes', body: 'We report who you supported and what it made possible.' },
  ],
};

/* CONFIRM BEFORE LAUNCH: each status must match what is true on the day the page goes live. */
export const STAGE = {
  title: 'Where we are today',
  body: 'We say which stage we are at, because honesty about our stage matters more than a big claim.',
  columns: ['Area', 'Status', 'What that means'],
  rows: [
    {
      area: 'Loans through financing partners',
      status: { tone: 'gold' as const, label: 'In pilot' },
      meaning: 'A small group of students is borrowing through our first financing partner while we test the process.',
    },
    {
      area: 'Income-Share Plan',
      status: { tone: 'neutral' as const, label: 'Planned' },
      meaning: 'We are designing the plan and its agreement. No student is funded through it yet.',
    },
    {
      area: 'Scholarships and awards',
      status: { tone: 'success' as const, label: 'Live' },
      meaning: 'Partner universities and sponsors post awards to students in the Community today.',
    },
    {
      area: 'Outcome reporting to funders',
      status: { tone: 'neutral' as const, label: 'Planned' },
      meaning: 'We are agreeing the report format with our first funders.',
    },
  ],
};

export const RISKS = {
  title: 'Risks, said plainly',
  body: 'Funding students carries risk. Some students may repay late, repay less than expected, or not repay at all.',
  strong: 'The full risk statement is confirmed before any commitment.',
};

/*
  FAQ. The first answer comes from the design. Answers marked `draft: true` were written
  for this page and need legal review before launch.
*/
export const FAQ = {
  title: 'Questions funders ask',
  body: 'Plain answers on returns, rules and what expressing interest means.',
  items: [
    {
      q: 'What returns can I expect?',
      a: 'We do not quote returns on this page. What you could receive, and what you could lose, depends on the route and is set out in writing before you commit.',
      draft: false,
    },
    {
      q: 'Is this open to individuals, or only organisations?',
      a: 'Both can start a conversation. Some routes may only be open to organisations, or to investors who meet certain rules, and we tell you which routes apply to you before anything is agreed.',
      draft: true,
    },
    {
      q: 'What happens when I express interest?',
      a: 'We reply to arrange a call, learn what you want to fund and explain how that route works. Nothing is agreed until the terms are written down and signed by both sides.',
      draft: true,
    },
    {
      q: 'Which rules apply, and who approves this?',
      a: 'Loans are made by licensed lending partners under Nigerian rules. Each route is reviewed by our legal advisers before anyone commits, and we tell you which regulator oversees it. Scholarship criteria are agreed with you in writing.',
      draft: true,
    },
    {
      q: 'Can I fund from abroad?',
      a: 'In principle, yes. Money from abroad must come through regulated banking channels, and we confirm the currency, documents and checks needed before you send anything.',
      draft: true,
    },
    {
      q: 'Can I choose which students I support?',
      a: 'You can choose a focus, such as a course, a state or a level of need. Students are then selected against those agreed criteria, so the choice stays fair and their identities stay protected.',
      draft: true,
    },
  ],
};

export const CTA = {
  titleStart: 'Start a conversation about',
  titleAccent: 'backing Nigerian students',
  button: 'Express interest as an investor',
};
