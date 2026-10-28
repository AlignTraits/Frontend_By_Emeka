/*
  Words for the For Universities page (/institutions/universities), from the Institution design.
  CONFIRM BEFORE LAUNCH: the stage of each item in "Where we are today".
*/
import { ROUTES } from '../../data/routes';

export const LINKS = {
  scholarships: ROUTES.scholarships,
} as const;

export const PAGE_META = {
  title: 'For universities | AlignTraits',
  description:
    'Reach more qualified applicants. Every student AlignTraits sends meets your current admission rules and has a stated budget that covers your fees. Start with a free pilot.',
} as const;

export const HERO = {
  titleStart: 'Reach more',
  titleAccent: 'qualified applicants.',
  subtitle:
    'AlignTraits shows your programmes to students who are choosing their next step right now. Every student we send meets your current rules and has a stated budget that covers your fees.',
  audience: 'For registrars, admissions officers and enrolment teams.',
  cta: 'Start your free pilot',
  helper: 'Test our quality with a pilot before any wider commitment.',
  imageAlt: 'An admissions team looking at an application on a computer screen together',
};

export const PROBLEM = {
  title: 'Admissions teams do not need more enquiries. They need fewer, better-matched ones.',
  body: 'Staff time disappears into applications that were never going to qualify, such as the wrong subject combination or a score below the departmental cut-off. Others qualify on paper and stall the moment fees come up. None of this shows up as low volume. It shows up as wasted follow-up, false hope for families and conversion numbers that look worse than your real demand.',
  cards: [
    { title: 'Wrong subjects or a score below the cut-off', body: 'Never going to qualify, yet each one still takes follow-up.' },
    { title: 'Qualified on paper, stalled on fees', body: 'Meets the rules, then goes quiet the moment fees come up.' },
  ],
};

export const GET = {
  title: 'What partner universities get',
  cards: [
    {
      title: 'More applications for your precise courses',
      body: 'Your programmes appear to students whose score, subjects and goals genuinely match, at the moment they are choosing, not through a generic advert. That means more applications for the courses you want to fill, and fewer that were never going to qualify.',
    },
    {
      title: 'Screening for fit and affordability, together',
      body: 'Each student we surface has been checked against your current admission rules and has a stated budget that covers your fees. ‘Qualified’ means both, not only on paper.',
    },
    {
      title: 'A requirements check on every application',
      body: 'Your team sees which requirements the applicant meets, and by what percentage. The working is shown: subject fit and score against your cut-off.',
    },
    {
      title: 'A second option for students you cannot admit',
      body: 'When a course is full or the cut-off is too high, we show the open courses that fit the student, so your team can recommend one. The student decides.',
    },
    {
      title: 'A fuller picture of each applicant',
      body: 'With the student’s consent, you see geographic and psychometric details. You can plan for the students who will thrive on your campus, and support them from the first week.',
    },
    {
      title: 'A space for your scholarships and discounts',
      body: 'Show courses that carry a discount, a scholarship or a university-sponsored award to the right audience. Share programme updates in the AlignTraits Community, before students have applied anywhere.',
    },
  ],
};

export const REQUIREMENTS = {
  title: 'Every application, with the requirements it meets',
  body: 'For every application submitted through AlignTraits, you see which of your requirements the applicant meets, and by what percentage. Your team starts with the applicants who qualify, not with a pile to sort.',
  quote:
    'The percentage always comes with the list behind it, so your team can check it in minutes. You decide who is admitted. AlignTraits shows the check and never makes the decision.',
  card: {
    title: 'Pharmacy applications · Sample University A',
    tag: 'Illustrative example',
    columns: ['Applicant', 'Requirements met', 'Percentage', 'Still to confirm'],
    rows: [
      { name: 'Applicant A', met: '6 of 6', pct: '100%', full: true, todo: 'Nothing' },
      { name: 'Applicant B', met: '5 of 6', pct: '83%', full: false, todo: 'O’Level English at credit level' },
      { name: 'Applicant C', met: '4 of 6', pct: '67%', full: false, todo: 'Physics and the cut-off score' },
    ],
    footnote: 'Sample University A and all figures are invented.',
  },
};

export const SECOND = {
  title: 'A second option for students you cannot admit',
  body: 'Some students will miss out because a course is full or the cut-off is too high. Instead of a closed door, they can be offered another option. For each of these students, we show the courses you still have open that fit their subjects, score and budget. Your team can recommend one, and the student decides.',
  card: {
    tag: 'Illustrative example',
    appliedLabel: 'Applied for',
    applied: 'Pharmacy',
    result: 'Result: below this year’s cut-off.',
    openLabel: 'Open courses that fit',
    courses: ['Biochemistry', 'Microbiology'],
    fits: ['Subjects fit', 'Budget fits'],
    nextLabel: 'Next step',
    next: 'Your team recommends one. The student decides.',
    footnote: 'Sample University A and all figures are invented.',
  },
};

export const KNOW = {
  title: 'Know who is joining before they arrive',
  p1: 'With each student’s consent, you see where your applicants come from, and how they like to learn and work. These are geographic and psychometric details.',
  p2: 'Fit works in both directions. Students get a realistic picture of life at your university, and you get a clearer view of who is likely to thrive there. Add the budget a student has stated, and you can see who can carry the fees through to graduation.',
  p3: 'The aim is fewer students who leave in their first year. We share this to help you support students, not to screen anyone out.',
  badge: 'Shared only with the student’s consent',
  imageAlt: 'Three university students walking and laughing on a tree-lined campus path',
};

export const OFFERS = {
  title: 'A space for your scholarships and discounts',
  p1: 'List the courses that carry a discount, a scholarship or a university-sponsored award, and show them to the students they are meant for. Students see your offer when it fits their score, subjects and goals.',
  p2: 'Offers are labelled as offers and kept apart from fit-based matches. A scholarship never changes where a course ranks for a student.',
  link: 'See how students find scholarships',
  card: {
    type: 'Scholarship',
    tag: 'Illustrative example',
    uni: 'Sample University A',
    course: 'B.Sc. Microbiology',
    award: 'First-year tuition award of 25%',
    rows: [
      { label: 'Shown to', value: 'Students whose score, subjects and goals fit' },
      { label: 'Label', value: 'Offer, kept apart from matches' },
    ],
    footnote: 'Sample University A and all figures are invented.',
  },
};

export const ACCURACY = {
  title: 'Why accuracy comes first',
  stat: '100 of 100',
  p1: 'We asked students and admissions staff what a matching platform must get right. 100 of 100 named accuracy against current admission rules, ahead of dashboards, AI or anything else.',
  p2: 'So accuracy is the one promise we never trade away. An unqualified applicant is not a small miss. It is the reason a tool gets ignored.',
  source: 'Source: AlignTraits research, 100 participants.',
};

export const NEUTRAL = {
  title: 'Neutral by design',
  body: 'Matches are ranked by fit, never by who pays us. If a university is ever shown as a sponsored option, it is clearly labelled and kept apart from fit-based matches. That protects your brand as well as the student.',
  strong: 'A recommendation students trust is worth more to your enrolment than one they doubt.',
};

export const STEPS = {
  title: 'How it works',
  items: [
    {
      title: 'Share your current criteria',
      body: 'Cut-offs, subject combinations and O’Level requirements, by programme. Your admissions office signs them off.',
    },
    {
      title: 'We screen automatically',
      body: 'Academic fit and affordability, together, using the same engine students use to check their own chances.',
    },
    { title: 'Start with a pilot', body: 'Test the quality of matched students before any wider commitment.' },
    {
      title: 'Review explainable matches',
      body: 'Each application arrives with the requirements it meets, the percentage and the reasoning, so your team can verify fit in minutes.',
    },
    {
      title: 'Recommend and reach',
      body: 'Suggest another open course to students you cannot admit, and post scholarships, discounts and updates for the right audience.',
    },
  ],
};

/* CONFIRM BEFORE LAUNCH: each stage must be true on the day the page goes live. */
export const STAGE = {
  title: 'Where we are today',
  body: 'We say which stage we are at.',
  columns: ['What partner universities get', 'Stage'],
  rows: [
    { item: 'Screening against your admission criteria', stage: { tone: 'success' as const, label: 'Live' } },
    { item: 'Affordability check against a student’s stated budget', stage: { tone: 'gold' as const, label: 'In pilot' } },
    { item: 'Explainable match view, with the requirements percentage', stage: { tone: 'gold' as const, label: 'In pilot' } },
    { item: 'Open-course suggestions for students you cannot admit', stage: { tone: 'neutral' as const, label: 'Planned' } },
    { item: 'Geographic and psychometric insight, with the student’s consent', stage: { tone: 'neutral' as const, label: 'Planned' } },
    { item: 'Scholarship and discount space, and updates in the Community', stage: { tone: 'neutral' as const, label: 'Planned' } },
  ],
};

/* The first answer comes from the design. Answers marked `draft: true` need your review before launch. */
export const FAQ = {
  title: 'Questions admissions teams ask',
  body: 'Straight answers for registrars, admissions officers and enrolment teams.',
  items: [
    {
      q: 'How is this different from buying leads?',
      a: 'Every match is screened against your actual, current admission rules first, not just contact details and a vague interest flag. Your team can see the reasoning behind each one, so you are not taking our word for ‘qualified’.',
      draft: false,
    },
    {
      q: 'Does ‘ability to pay’ mean you screen by wealth?',
      a: 'No. Students tell us their own budget, and we use it to show them courses they can afford. We never rank students by wealth. A student with a smaller budget is shown the courses and funding that fit, including scholarships.',
      draft: true,
    },
    {
      q: 'Can we start small?',
      a: 'Yes. Start with a pilot on one programme. You share its criteria, review the matched applicants and the reasoning behind each one, then decide whether to go further. There is no obligation.',
      draft: true,
    },
    {
      q: 'Do you share student details with us?',
      a: 'Only the details a student agrees to share when they apply through AlignTraits. Nothing is shared before they agree.',
      draft: true,
    },
    {
      q: 'Can we promote scholarships and discounts through AlignTraits?',
      a: 'Yes. List the courses that carry a scholarship, a discount or a university-sponsored award, and students see the offer when it fits their score, subjects and goals. Offers are labelled as offers, and they never change where a course ranks.',
      draft: true,
    },
    {
      q: 'How is the percentage worked out?',
      a: 'It is the share of your stated requirements for that programme that the applicant meets, such as the subject combination, O’Level grades and the cut-off score. The list behind it shows which requirements are met and which are still to confirm.',
      draft: true,
    },
    {
      q: 'Do you decide who we admit?',
      a: 'No. AlignTraits shows the check and the reasoning. Your admissions team makes every decision.',
      draft: true,
    },
    {
      q: 'What happens to students we cannot admit?',
      a: 'If a course is full or the cut-off is too high, we show the student your other open courses that fit their subjects, score and budget. Your team can recommend one, and the student decides.',
      draft: true,
    },
    {
      q: 'What are the geographic and psychometric details, and do students agree to share them?',
      a: 'Geographic details are where a student is applying from. Psychometric details describe how they like to learn and work. Students choose whether to share them, and they are used to help you support students, not to screen anyone out.',
      draft: true,
    },
  ],
};

export const CTA = {
  titleStart: 'Start with a pilot. See the quality of the match',
  titleAccent: 'before you commit',
  button: 'Partner with AlignTraits as a university',
  secondary: 'Request a pilot',
};
