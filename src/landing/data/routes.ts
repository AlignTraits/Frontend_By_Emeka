/**
 * Link destinations used across the landing page.
 *
 * Destinations that already exist in the app point at their route (internal paths start with
 * "/" and render as react-router <Link>). "#" marks a link with no page behind it yet: replace
 * it with the route, or with a mailto: or absolute URL, when the page exists.
 */
export const ROUTES = {
  home: '/',
  students: '/search',
  /* The public Community page. The signed-in Community feed stays at /dashboard/community. */
  community: '/community',
  login: '/login',
  checkChances: '/career-recommedation',
  freeSnapshot: '/career-recommedation',
  matchReport: '#',
  fundingOptions: '#',
  forSchools: '#',
  forUniversities: '#',
  tutorialCenters: '#',
  requestPilot: '#',
  loans: '/finances/loans',
  incomeSharePlan: '/finances/income-share-plan',
  scholarships: '/finances/scholarships',
  forInvestors: '/finances/investors',
  partnerWithAlignTraits: '#',
} as const;
