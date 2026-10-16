export interface PlanDetail {
  id: string;
  planKey: string; // matches the backend PaymentPlan enum / user.payment_plan
  label: string; // "One-time" | "Monthly"
  title: string;
  tier: string; // "Basic" | "Silver" | "Gold"
  nairaPrice: string;
  dollarPrice: string;
  benefits: string[];
  highlighted: boolean;
}

// Single source of truth for plan names, prices and benefits.
// The naira prices MUST match PRICES in the backend (monthlyPaymentService.ts):
// BASIC_ONETIME = 110000 kobo, LOCAL_MONTHLY = 370000 kobo, GLOBAL_MONTHLY = 550000 kobo.
export const PLAN_LIST: PlanDetail[] = [
  {
    id: "basic",
    planKey: "BASIC_ONETIME",
    label: "One-time",
    title: "Basic One-Time Plan",
    tier: "Basic",
    nairaPrice: "₦1,100",
    dollarPrice: "$0.81",
    benefits: [
      "One result only",
      "No future updates",
      "No access to scholarships",
      "No access to loan information",
    ],
    highlighted: false,
  },
  {
    id: "silver",
    planKey: "LOCAL_MONTHLY",
    label: "Monthly",
    title: "Local Access Plan",
    tier: "Silver",
    nairaPrice: "₦3,700",
    dollarPrice: "$2.71",
    benefits: [
      "Unlimited checks within 1 country",
      "Loan information & course access",
      "Editable exam records",
    ],
    highlighted: true,
  },
  {
    id: "gold",
    planKey: "GLOBAL_MONTHLY",
    label: "Monthly",
    title: "Global Access Plan",
    tier: "Gold",
    nairaPrice: "₦5,500",
    dollarPrice: "$4.03",
    benefits: [
      "Access to all country/schools",
      "Loan information & course access",
      "Editable exam records",
      "Scholarships, global support",
      "New school priority access",
    ],
    highlighted: false,
  },
];

export const PLAN_DETAILS: Record<string, PlanDetail> = PLAN_LIST.reduce(
  (acc, plan) => {
    acc[plan.planKey] = plan;
    return acc;
  },
  {} as Record<string, PlanDetail>,
);
