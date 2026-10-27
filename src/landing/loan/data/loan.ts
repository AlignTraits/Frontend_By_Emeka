/*
  All copy, links and partner details for the Loan page live here,
  so content can change without touching the layout.
*/

/* Links. Internal paths are real routes in the app. */
export const LINKS = {
  home: '/',
  checkMyChances: '/career-recommedation',
  registerInterest: '#register-interest',
  login: '/login',
  students: '/search',
  community: '/dashboard/community',
} as const;

/* Browser tab title and search description for /finances/loans */
export const PAGE_META = {
  title: 'Student loans | AlignTraits',
  description:
    'Student loans through licensed financing partners are coming to AlignTraits. Register your interest. AlignTraits is not the lender.',
} as const;

/* Hero */
export const HERO = {
  titleStart: 'Money should not be the reason',
  titleLead: 'you',
  titleAccent: 'defer your admission',
  subtitle:
    'Loans through licensed financing partners are coming to AlignTraits, to help cover tuition and upkeep while you study. Repayment is expected to start two years after you graduate, not the day you leave school.',
  noteStrong: 'AlignTraits connects you with licensed financing partners. We are not the lender.',
  noteRest: 'Your parent or guardian confirms the terms before you commit.',
  cta: 'Register interest',
  helper: "Loans are not open yet. Leave your email and we'll tell you first.",
};

/*
  Financing partner card, shown as in the design with its "Placeholder" tag.
  Replace the field values (and remove the tag in WhoProvides.tsx) once a partner is signed.
*/
export const PARTNER = {
  title: 'Our financing partners',
  fields: [
    { label: 'Partner', value: 'Licensed financing partner' },
    { label: 'Regulated by', value: 'Regulator and licence number shown here' },
    { label: 'What they provide', value: 'Loans for tuition and upkeep' },
  ],
};

export const WHO_PROVIDES = {
  title: 'Who provides the loan',
  body: 'AlignTraits refers you. Your financing partner lends, manages the loan and confirms the terms.',
};

/* What the loan can cover */
export const COVERAGE = {
  title: 'What the loan can cover',
  items: [
    { covered: true, text: 'Tuition and school fees.' },
    { covered: true, text: 'Upkeep while you study, such as accommodation, feeding and transport.' },
    { covered: false, text: 'Anything your partner excludes is listed here before you apply.' },
  ],
};

/* What it costs. Values are placeholders until a partner confirms them. */
export const COSTS = {
  title: 'What it costs',
  body: 'Money is part of the match, so the cost comes first. Your partner shows you every figure below before you sign.',
  cardTitle: 'Your loan, in figures',
  rows: [
    { label: 'Amount borrowed', value: '₦ amount' },
    { label: 'Interest', value: 'Rate, and how it is charged, set by your partner' },
    { label: 'Fees', value: '₦ amount for each fee' },
    { label: 'Repayment starts', value: 'Expected two years after you graduate' },
    { label: 'Monthly repayment', value: '₦ amount for a number of months' },
    { label: 'Total you repay', value: '₦ amount' },
  ],
  footnote: 'Every figure is a placeholder until your partner confirms it.',
};

/* How it works */
export const STEPS = {
  title: 'How it works',
  items: [
    {
      title: 'Check your eligibility',
      body: 'A short form tells us what you need covered and what you can realistically repay.',
    },
    {
      title: 'We match you with a financing partner',
      body: 'AlignTraits connects you with the partner that fits your situation. We do not lend directly.',
    },
    {
      title: 'Your partner confirms the terms',
      body: 'Read them with your family before you commit.',
    },
    {
      title: 'Funds are paid',
      body: 'Your partner confirms who receives the money.',
    },
    {
      title: 'Study now, repay later',
      body: 'Repayment is expected to start two years after graduation, on a plan your partner confirms.',
    },
  ],
};

/* Before you apply */
export const PREPARE = {
  title: 'Before you apply',
  body: 'Have these ready and the form takes minutes. If something is missing, you can still start and add it later.',
  cardTitle: 'What to prepare',
  tag: 'Your partner confirms the final list',
  items: [
    'Admission letter or proof of application',
    'A valid means of identification',
    'Bank Verification Number (BVN)',
    "A parent, guardian or guarantor's contact details",
  ],
};

/* For parents and guardians */
export const PARENTS = {
  title: 'For parents and guardians',
  body: 'A loan is a family decision. We write the terms so a family can read them together. Read the repayment plan aloud, and ask your partner about anything that is not clear before you sign.',
  imageAlt: 'A mother and her son reading an application form together at home',
};

/*
  FAQ
  The first answer comes from the approved design.
  Answers marked `draft: true` were written to the brand guide's
  finance voice (careful, precise, plain) and need review before launch.
*/
export const FAQ = {
  title: 'Questions students and parents ask',
  body: 'Straight answers about how loans work, who lends and what happens if plans change.',
  items: [
    {
      q: 'Is AlignTraits the lender?',
      a: 'No. AlignTraits connects you with licensed financing partners who provide and manage the loan. The partner sets and confirms the terms during your application, not AlignTraits.',
      draft: false,
    },
    {
      q: 'When do I start repaying?',
      a: 'Repayment is expected to start two years after you graduate, on a plan your partner confirms. You see the start date and the monthly amount in your terms before you sign.',
      draft: true,
    },
    {
      q: 'Does it cover more than tuition?',
      a: 'It can. Loans can cover tuition and school fees, and upkeep while you study, such as accommodation, feeding and transport. Anything your partner does not cover is listed before you apply.',
      draft: true,
    },
    {
      q: 'What if my admission does not come through?',
      a: 'Your partner sets out what happens in that case, and you see it in your terms before you sign. If anything is unclear, ask them before you commit. You can also check your chances again to see other realistic options.',
      draft: true,
    },
    {
      q: 'Do I need a guarantor?',
      a: 'It depends on your partner. Many ask for a parent, guardian or guarantor, which is why their contact details are on the list of things to prepare. Your partner confirms what they need during your application.',
      draft: true,
    },
    {
      q: 'What if I defer or leave the course?',
      a: 'Tell your partner as early as you can. They set what happens to payments and repayment if your plans change, and this is part of the terms you see before you sign.',
      draft: true,
    },
    {
      q: 'What if I miss a repayment?',
      a: 'Contact your partner before the payment is due if you think you will miss it. Any charge for a late or missed payment is set by your partner and listed in your terms before you sign.',
      draft: true,
    },
    {
      q: 'Can I repay early?',
      a: 'Your partner confirms whether you can repay early and whether any fee applies. Check this in your terms before you sign.',
      draft: true,
    },
    {
      q: 'How do I know an offer is real?',
      a: "A real offer comes from a licensed partner and shows the partner's name, regulator and licence number. AlignTraits will never ask you to pay into a personal account to unlock a loan. If something looks wrong, stop and message us on WhatsApp before you share any details.",
      draft: true,
    },
  ],
};

/* Closing call to action */
export const CTA = {
  titleStart: 'Study now. Repay later, starting',
  titleAccent: 'two years after you graduate',
  note: 'Expected terms. Loans open once a licensed lender signs on with us.',
  button: 'Register interest',
  helper: 'Your parent or guardian confirms the terms before you commit.',
  form: {
    label: 'Your email address',
    placeholder: 'you@example.com',
    invalid: 'Enter a valid email address.',
    success: 'Thank you. We will email you when loans open.',
    duplicate: 'You are already on our list. We will email you when loans open.',
    error: 'We could not save your email. Try again, or message us on WhatsApp.',
  },
};
