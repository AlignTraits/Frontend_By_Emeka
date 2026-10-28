/*
  Words for the For Schools page (/institutions/schools), from the School design.
  CONFIRM BEFORE LAUNCH: the event names, dates, host states and seats.
*/

export const PAGE_META = {
  title: 'For schools | AlignTraits',
  description:
    'Partner schools join AlignTraits interstate conferences and retreats, and get the AlignTraits course check for their SS students. Partnership is free.',
} as const;

export const HERO = {
  titleStart: 'Help',
  titleAccent: 'shape',
  titleEnd: ' how Nigeria’s schools support students.',
  subtitle:
    'Partner schools join our interstate conferences and retreats. School leaders from different states meet. They discuss how we can support students better, and how the academic system can improve for the students of tomorrow.',
  points: ['Partner schools also get the AlignTraits course check for their SS students, against current admission rules.'],
  audience: 'For principals, proprietors, heads of guidance and counsellors at partner schools.',
  cta: 'Partner with AlignTraits as a school',
  helper: 'Access is for partner schools.',
  imageAlt: 'School leaders from different states talking around a conference table',
  pins: ['Lagos', 'Abuja', 'Edo', 'Oyo'],
};

export const WHY = {
  title: 'Why we bring schools together',
  body: 'Schools in different states face many of the same questions.',
  questions: ['How do we guide students well?', 'How do we keep up as admission rules change?', 'How do we help families plan?'],
  textStart: 'Most schools want to guide their students well, and few have time to compare notes with schools in other states.',
  textStrong: 'The conferences and retreats make that time.',
};

export const CONVERSATIONS = {
  title: 'Two conversations',
  cards: [
    {
      title: 'How we can support students',
      body: 'Practical ideas for guiding students through course choice, admission and funding, and for working with their families.',
    },
    {
      title: 'How we can improve the academic system',
      body: 'What schools, universities and partners can do together, so the system works better for the students of tomorrow.',
    },
  ],
};

export const WHO = {
  title: 'Who comes?',
  body: 'Principals, proprietors, heads of guidance, counsellors and teachers from partner schools, with the AlignTraits team.',
  chips: ['Principals', 'Proprietors', 'Heads of guidance', 'Counsellors', 'Teachers'],
  team: 'AlignTraits team',
};

export const DO_THERE = {
  title: 'What you do there',
  cards: ['Compare notes with schools in other states.', 'Hear what is changing in admission and funding.', 'Help shape how AlignTraits supports students.'],
};

export const EVENTS = {
  title: 'Upcoming events',
  columns: ['Event', 'Date', 'Host state', 'Seats per school', 'Cost to a partner school'],
  rows: [
    { name: 'Interstate School Leaders Retreat', date: '12 to 13 July 2027', state: 'Lagos', seats: '3', cost: 'Shared when announced' },
    { name: 'Guidance and Counselling Conference', date: '18 October 2027', state: 'Abuja', seats: '2', cost: 'Shared when announced' },
  ],
  status: 'Pending',
  note: 'We’ll send you an invite as soon as events are confirmed.',
};

export const STEPS = {
  title: 'How to take part',
  items: [
    { title: 'Partner with AlignTraits as a school', body: 'Partnership is free.' },
    { title: 'Register your school’s team', body: 'Sign up your leaders and counsellors.' },
    { title: 'Attend', body: 'Bring your school leaders and counsellors.' },
  ],
  after: 'After each event, we share what we discussed and what happens next with partner schools.',
};

export const NOT_YET = {
  title: 'Not a partner yet?',
  body: 'Start with a pilot. Run AlignTraits with one SS class, review the results, then decide.',
  button: 'Request a pilot',
};

/* The first answer comes from the design. Answers marked `draft: true` need your review before launch. */
export const FAQ = {
  title: 'Questions school leaders ask',
  body: 'Straight answers for principals, proprietors and heads of guidance.',
  items: [
    { q: 'Who can attend?', a: 'Partner schools.', draft: false },
    {
      q: 'What will be discussed?',
      a: 'Two things: how schools can guide students through course choice, admission and funding, and what schools, universities and partners can do together so the system works better. Each event shares its agenda before it starts.',
      draft: true,
    },
    {
      q: 'Is it only about AlignTraits?',
      a: 'No. The events are about how schools support students. AlignTraits hosts them and shares what is changing in admission and funding, and most of the time is for schools to compare notes with each other.',
      draft: true,
    },
    {
      q: 'Does it cost anything?',
      a: 'Partnership is free. Any cost for an event, such as travel or accommodation, is shared when the event is announced, before your school registers.',
      draft: true,
    },
    {
      q: 'Can a school in a pilot attend?',
      a: 'Yes. A school running a pilot is invited as a partner school for as long as the pilot runs.',
      draft: true,
    },
    {
      q: 'Where and when?',
      a: 'The events move between states. The table above shows the dates and host states we are planning, and partner schools get an invite as soon as each event is confirmed.',
      draft: true,
    },
    {
      q: 'Do you share what was discussed?',
      a: 'Yes. After each event, every partner school gets a short summary of what was discussed and what happens next, including schools that could not attend.',
      draft: true,
    },
  ],
};

export const CTA = {
  titleStart: 'Join the schools shaping',
  titleAccent: 'what comes next',
  button: 'Partner with AlignTraits as a school',
  secondary: 'Request a pilot',
  helper: 'Access is for partner schools.',
};
