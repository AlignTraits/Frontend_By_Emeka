/*
  Words and links for the AlignTraits Income-Share Plan page (/finances/income-share-plan).
  Terms are illustrative only. The table uses neutral placeholders ("A set percentage",
  "A set number of years") until real figures are approved by legal counsel.
*/

export const LINKS = {
  seeIfIQualify: '#register-interest',
} as const;

export const PAGE_META = {
  title: 'Income-Share Plan | AlignTraits',
  description:
    'Study now and share part of your income once you are earning. A selective plan for students with a strong academic record. Illustrative terms only.',
} as const;

export const HERO = {
  eyebrow: 'AlignTraits Income-Share Plan',
  titleStart: 'Study now.',
  titleAccent: 'Share part of your income',
  titleEnd: ' once you are earning.',
  subtitle:
    'For students with a strong academic record, the plan means nothing to repay while you study. Once you are earning, you share part of your income for an agreed time.',
  note: 'Illustrative terms only. Your agreement sets the exact figures before you sign anything.',
  cta: 'See if I qualify',
  helper: 'The plan is selective, so not every student qualifies.',
};

export const STEPS = {
  title: 'How it works',
  items: [
    {
      title: 'Apply with your academic record',
      body: 'The plan is selective. It is built for students with a strong academic record, and it is not open to everyone.',
    },
    {
      title: 'We review and set your terms',
      body: 'Your percentage and length of time are agreed with you, based on your programme and profile. They are never a flat rate for everyone.',
    },
    { title: 'You study', body: 'There is nothing to repay while you are in school.' },
    {
      title: 'You share income once you are earning',
      body: 'You pay the agreed percentage for the agreed length of time. When the term ends, you owe nothing more.',
    },
    {
      title: 'We stay in touch',
      body: 'You share regular updates on where you have landed, and we offer guidance during your studies and after.',
    },
  ],
};

export const EXAMPLE = {
  title: 'An illustrative example',
  body: 'Your own percentage and length of time are set for you, in writing, before you sign. They may be higher or lower than this example.',
  cardTitle: 'How a plan could look',
  tag: 'Illustrative only. These are examples, not an offer.',
  rows: [
    { label: 'Your programme', value: 'Programme and university' },
    { label: 'Share of your income', value: 'A set percentage' },
    { label: 'Length of time', value: 'A set number of years' },
    { label: 'Repayment while you study', value: 'None' },
    { label: 'Payments begin', value: 'Once you are earning above a minimum income' },
    { label: 'Most you could pay in total', value: 'Cap, if there is one' },
  ],
};

export const BENEFITS = {
  title: 'What you get beyond the funding',
  cards: [
    { title: 'Guidance throughout', body: 'Mentorship and support during your studies, not only a payment.' },
    {
      title: 'A relationship that continues',
      body: 'You share career and life updates as part of the agreement. We care where you land, not only whether you graduate.',
    },
  ],
};

export const WHO_FOR = {
  tag: 'Selective',
  title: 'Who it is for',
  body: 'Students with a strong, demonstrable academic record who either cannot get a traditional loan or would rather not take on a fixed debt. This is a selective programme, not a general financing option.',
};

export const PROVIDER = {
  title: 'Who provides the funding',
  tag: 'Placeholder',
  body: 'The legal entity that provides the funding, and any partner or regulator, is named here before this page goes live.',
};

/*
  FAQ. The first answer is adapted from the design (the table no longer shows figures).
  Answers marked `draft: true` were written for this page and need legal review before launch.
*/
export const FAQ = {
  title: 'Ask these before you sign',
  body: 'Your agreement should answer each question below in writing. Read it with your family.',
  items: [
    {
      q: 'Are these the actual figures?',
      a: 'No. The table shows how a plan is set out, not real figures. Your percentage and length of time are set for you, based on your programme and academic profile, and written in your agreement before you commit.',
      draft: false,
    },
    {
      q: 'What if I do not earn much?',
      a: 'You only pay when you earn above the minimum income set in your agreement. If your income falls below it, your payments pause. Your agreement says whether those months count towards your agreed time.',
      draft: true,
    },
    {
      q: 'Is this a loan?',
      a: 'No. With a loan you owe a fixed amount plus interest. With this plan you share an agreed percentage of your income for an agreed time, and you owe nothing more when that time ends. Your agreement says if there is a cap on the total.',
      draft: true,
    },
    {
      q: 'Is any interest or fee charged?',
      a: 'There is no interest, because you do not owe a fixed balance. Any fee is listed in your agreement before you sign, so check it there.',
      draft: true,
    },
    {
      q: 'How is my income checked?',
      a: 'You share proof of income, such as payslips or a tax record, at the times set out in your agreement. It also explains what is checked, how often, and how your information is kept safe.',
      draft: true,
    },
    {
      q: 'What if I work outside Nigeria?',
      a: 'Your agreement covers income you earn abroad too. It says how that income is converted to naira and how you pay, so read this part carefully if you plan to work outside Nigeria.',
      draft: true,
    },
    {
      q: 'What if I pause or leave my studies, or want to end the plan early?',
      a: 'Your agreement sets out what happens in each case, including whether you can end the plan early by paying an agreed amount. Ask about all three before you sign.',
      draft: true,
    },
    {
      q: 'Do my parents need to sign?',
      a: 'If you are under 18, a parent or guardian must sign with you. If you are 18 or older, you sign for yourself, but we encourage you to read the agreement with your family first.',
      draft: true,
    },
  ],
};

export const CTA = {
  titleStart: 'Study now. Share part of your income later, on',
  titleAccent: 'terms you have read',
  note: 'The plan is not open yet. Leave your email and we will tell you when you can apply.',
  button: 'Register interest',
  helper: 'Illustrative terms only. Your agreement sets the exact figures before you commit to anything.',
  form: {
    label: 'Your email address',
    placeholder: 'you@example.com',
    invalid: 'Enter a valid email address.',
    success: 'Thank you. We will email you when the plan opens.',
    duplicate: 'You are already on our list. We will email you when the plan opens.',
    error: 'We could not save your email. Try again, or message us on WhatsApp.',
  },
};
