import React from "react";
import { Crown } from "lucide-react";
import { FaRegStar } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";

export interface PlanDetail {
  id: string;
  name: string;
  icon: React.ReactNode;
  nairaPrice: string;
  dollarPrice: string;
  billing: string;
  benefits: string[];
  buttonText: string;
}

// Single source of truth for plan pricing/benefits, keyed by the backend's
// PaymentPlan enum value (user.payment_plan). Both AvailablePlans.tsx and
// PlanOverview.tsx read from this so they can't drift out of sync again.
export const PLAN_DETAILS: Record<string, PlanDetail> = {
  BASIC_ONETIME: {
    id: "basic",
    name: "Basic Plan",
    icon: <FaRegCheckCircle className="w-6 h-6 text-green-500" />,
    nairaPrice: "₦2,000",
    dollarPrice: "$3.99",
    billing: "One-time",
    benefits: [
      "One result only",
      "No future updates",
      "No access to scholarships/loans information",
    ],
    buttonText: "BASIC_ONETIME",
  },
  LOCAL_MONTHLY: {
    id: "silver",
    name: "Silver Plan",
    icon: <FaRegStar className="w-6 h-6 text-green-500" />,
    nairaPrice: "₦5,500",
    dollarPrice: "$8.99",
    billing: "per month",
    benefits: [
      "Unlimited checks within one country",
      "Loan information and course access",
      "Editable exam records",
    ],
    buttonText: "LOCAL_MONTHLY",
  },
  GLOBAL_MONTHLY: {
    id: "gold",
    name: "Gold Plan",
    icon: <Crown className="w-6 h-6 text-yellow-500" />,
    nairaPrice: "₦9,500",
    dollarPrice: "$14.99",
    billing: "per month",
    benefits: [
      "Access to all countries/schools",
      "Loan information and course access",
      "Editable exam records",
      "Scholarships & global support",
      "New school priority access",
    ],
    buttonText: "GLOBAL_MONTHLY",
  },
};
