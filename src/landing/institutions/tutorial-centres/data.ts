/*
  Words for the Tutorial centres page (/institutions/tutorial-centres), from the Tutorial center design.
*/

export const PAGE_META = {
  title: 'For tutorial centres | AlignTraits',
  description:
    'AlignTraits checks each student’s score, subjects and budget against current admission rules, so the advice your tutors give still holds up when the admission list comes out.',
} as const;

export const HERO = {
  titleStart: 'Advice that',
  titleAccent: 'still holds up',
  titleEnd: ' when the admission list comes out.',
  subtitle:
    'AlignTraits checks each student’s score, subjects and budget against current admission rules. Every result shows its reasoning, so you can answer with confidence.',
  audience:
    'For people who run a tutorial centre or counsel students through the Joint Admissions and Matriculation Board (JAMB).',
  cta: 'Partner with AlignTraits',
  helper: 'Your tutors keep the conversation.',
  imageAlt: 'A tutor leaning over a desk to help two students with their work in a classroom',
};

export const QUESTIONS = {
  title: 'The same three questions, every year',
  body: 'You answer from experience, and you are often right. But cut-offs move and requirements change. A wrong answer costs the student a year, and it costs your centre their trust.',
  questions: ['Is this subject combination even correct?', 'Is my score enough for this course?', 'Can the family afford it?'],
  research:
    'In our research, nearly everyone could describe someone denied admission despite a solid JAMB score. A wrong subject combination, a shifted cut-off or a change after the UTME was almost always the reason.',
  source: 'Source: AlignTraits research, 100 participants.',
};

export const GETS = {
  title: 'What your centre gets',
  cards: [
    {
      title: 'A course check for every student you advise',
      body: 'Each student sees a reach, a realistic match and a safety net, checked against current admission rules, with the cost beside each. Use it in class, or let students run it on their phones.',
    },
    {
      title: 'Reports a family can read together',
      body: 'Every report shows its reasoning and the full cost, so parents can check it for themselves. It backs up your advice. It does not replace it.',
    },
    {
      title: 'Priority access to community opportunities',
      body: 'Your students hear first about scholarships, Interschool Olympics entries, conferences and events.',
    },
    {
      title: 'Subsidised pricing for your students',
      body: 'Students from your centre pay less for AlignTraits products, including the Match Report.',
    },
  ],
};

export const SEE = {
  title: 'What your tutors see',
  body: 'We say plainly when something is a stretch, and we always show a way forward.',
  card: {
    title: 'Medicine & Surgery · Sample University A',
    tag: 'Illustrative example',
    resultLabel: 'Result',
    result: 'This one is a stretch.',
    resultPill: 'Stretch',
    whyLabel: 'Why',
    why: 'The student’s score is 12 marks under last year’s cut-off.',
    nextLabel: 'Next step',
    next: 'Here are two options that fit better, with the cost beside each.',
    options: [
      { level: 'Realistic match', kind: 'realistic' as const, name: 'Biochemistry', uni: 'Sample University A', cost: '₦310,000 a year · within budget' },
      { level: 'Safety net', kind: 'safety' as const, name: 'Microbiology', uni: 'Sample University B', cost: '₦265,000 a year · within budget' },
    ],
    footnote: 'Sample universities, the student and all figures are invented.',
  },
};

export const STEPS = {
  title: 'How it works',
  items: [
    { title: 'Talk to us', body: 'A short conversation about your centre, your classes and how you advise students.' },
    { title: 'We set up your students', body: 'They get the course check and community access under your partnership.' },
    { title: 'Students check where they stand', body: 'Each one gets a reach, a realistic match and a safety net.' },
    { title: 'You review and advise', body: 'Use each report as the starting point for your conversation with the student and the family.' },
  ],
};

export const YOURS = {
  title: 'Your students stay yours',
  body: 'We work through your centre.',
};

export const PILOT = {
  title: 'Start with a pilot',
  body: 'Not sure yet? Start with one class. We run a pilot with real students, you review the results, and we share what we measured and how.',
  button: 'Request a pilot',
  imageAlt: 'A tutor and a parent going through results on a tablet with a student in class',
};

export const SAFE = {
  strong: 'Safe for students.',
  body: 'Many students at a tutorial centre are under 18. We never publish a student’s full name with their face without written consent from a parent or guardian.',
};

/* The first answer comes from the design. Answers marked `draft: true` need your review before launch. */
export const FAQ = {
  title: 'Questions centre owners and tutors ask',
  body: 'Straight answers for the people who run centres and advise JAMB candidates.',
  items: [
    {
      q: 'Does this replace our tutors?',
      a: 'No. Every result shows its reasoning so a tutor can review it with the student. The tool gives everyone the same starting point. You still give the advice.',
      draft: false,
    },
    {
      q: 'What does it cost the centre?',
      a: 'We agree the terms with each centre before anything starts, and a pilot with one class comes with no obligation. Students from partner centres pay less for AlignTraits products, including the Match Report.',
      draft: true,
    },
    {
      q: 'Can students who are re-sitting an exam use it?',
      a: 'Yes. A student can check courses with their current results, then check again after the re-sit to see how their options change.',
      draft: true,
    },
    {
      q: 'How current are the rules?',
      a: 'We check cut-offs, subject combinations and requirements against each university’s latest published rules, and we update them as they change. Every result shows its reasoning, so a tutor can see what it was checked against.',
      draft: true,
    },
    {
      q: 'Will you contact our students directly?',
      a: 'No. We work through your centre. Your students use AlignTraits under your partnership, and we do not market to them separately.',
      draft: true,
    },
  ],
};

export const CTA = {
  titleStart: 'Back your advice with',
  titleAccent: 'current admission rules',
  button: 'Partner with AlignTraits',
  secondary: 'Request a pilot',
  helper: 'Your tutors keep the conversation.',
};
