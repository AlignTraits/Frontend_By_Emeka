import React from "react";
import { useAuth } from "../../../contexts/useAuth";
import { BeatLoader } from "react-spinners";
import { makePayment } from "../../../services/utils";
import { toast } from "react-toastify";
import { PLAN_LIST } from "../../../data/planData";
import { trackEvent } from "../../../services/analytics";

const AvailablePlans: React.FC = () => {
  const { user } = useAuth();
  const [loadingPlanKey, setLoadingPlanKey] = React.useState<string | null>(null);

  // reduce() throws on an empty array with no starting value, which crashed this
  // page for anyone with zero transactions, so only reduce when there is data.
  const latest =
    user?.transactions && user.transactions.length > 0
      ? user.transactions.reduce((latestTx, currentTx) => {
          return new Date(currentTx.updatedAt) > new Date(latestTx.updatedAt)
            ? currentTx
            : latestTx;
        })
      : undefined;

  const handleSelect = async (planKey: string) => {
    setLoadingPlanKey(planKey);
    trackEvent("select_plan", { plan: planKey });

    try {
      const data = await makePayment({
        paymentPlan: planKey,
        firstname: user?.firstname,
        lastname: user?.lastname,
        email: user?.email,
        schoolLocation: latest?.schoolLocation,
      });

      if (data?.ok) {
        toast.success("Redirecting you to payment...");
        setTimeout(() => {
          window.open(data.data.authorization_url, "_blank");
        }, 2000);
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoadingPlanKey(null);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-2 py-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Choose Your Plan</h2>
        <p className="text-gray-600">Select the plan that best fits your needs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
        {PLAN_LIST.map((plan) => {
          const isCurrentPlan = user?.payment_plan === plan.planKey;
          const isLoading = loadingPlanKey === plan.planKey;
          const dark = plan.highlighted;

          return (
            <div key={plan.planKey} className="relative">
              <p className="absolute -top-7 left-0 text-[18px] font-medium text-[#1C1C1C]">
                {plan.label}
              </p>

              <div
                className={`flex flex-col h-full rounded-3xl border p-6 shadow-md ${
                  dark
                    ? "bg-[#004085] text-white border-[#004085]"
                    : "bg-white text-[#1C1C1C] border-gray-300"
                }`}
              >
                <h3 className="text-center text-[20px] font-bold">{plan.title}</h3>
                <p
                  className={`text-center text-[22px] font-medium mt-6 ${
                    dark ? "text-white" : "text-gray-500"
                  }`}
                >
                  {plan.tier}
                </p>
                <div
                  className={`h-[1px] w-[85%] mx-auto mt-4 ${
                    dark ? "bg-white" : "bg-gray-300"
                  }`}
                />

                <ul className="mt-6 space-y-3 flex-1 list-disc pl-6 text-[15px]">
                  {plan.benefits.map((benefit) => (
                    <li key={benefit}>{benefit}</li>
                  ))}
                </ul>

                <p className="text-center text-[22px] font-semibold mt-8">
                  {plan.nairaPrice} / {plan.dollarPrice}
                </p>

                <button
                  disabled={isCurrentPlan || isLoading}
                  onClick={() => handleSelect(plan.planKey)}
                  className={`mt-6 w-full h-[48px] rounded-lg font-semibold ${
                    isCurrentPlan
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : dark
                        ? "bg-[#F6C648] text-[#1C1C1C]"
                        : "bg-[#004085] text-white"
                  }`}
                >
                  {isLoading ? <BeatLoader size={8} /> : isCurrentPlan ? "Current Plan" : "Select"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AvailablePlans;
