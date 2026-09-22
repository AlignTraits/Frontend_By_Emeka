import React from "react";
import { useAuth } from "../../../contexts/useAuth";
import { BeatLoader } from "react-spinners";
import { makePayment } from "../../../services/utils";
import { toast } from "react-toastify";
import { PLAN_DETAILS } from "../../../data/planData";

const AvailablePlans: React.FC = () => {
  const { user } = useAuth();
  const [loadingPlanId, setLoadingPlanId] = React.useState<string | null>(null);

  // Guard against an empty/undefined transactions array - reduce() throws
  // on an empty array with no initial value, which crashed this page for
  // any user with zero transactions.
  const latest =
    user?.transactions && user.transactions.length > 0
      ? user.transactions.reduce((latestTx, currentTx) => {
          return new Date(currentTx.updatedAt) > new Date(latestTx.updatedAt)
            ? currentTx
            : latestTx;
        })
      : undefined;

  const handleClick = async (planKey: string) => {
    setLoadingPlanId(planKey);

    try {
      let data = await makePayment({
        paymentPlan: planKey,
        firstname: user?.firstname,
        lastname: user?.lastname,
        email: user?.email,
        schoolLocation: latest?.schoolLocation,
      });

      if (data?.ok) {
        toast.success(`Redirecting you to payment...`);
        setTimeout(() => {
          window.open(data.data.authorization_url, "_blank");
        }, 2000);
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoadingPlanId(null);
    }
  };

  const splitString = (text: any) => {
    if (typeof text === "string") {
      return text.replace(/_/g, " ");
    }
    return text;
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Choose Your Plan
        </h2>
        <p className="text-gray-600">
          Select the plan that best fits your needs
        </p>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.values(PLAN_DETAILS).map((plan) => {
          const isCurrentPlan = user?.payment_plan === plan.buttonText;
          const isLoading = loadingPlanId === plan.id;

          return (
            <div
              key={plan.id}
              className={`relative bg-white rounded-xl border ${isCurrentPlan ? "border-green-400 border-2" : "border-gray-200"} p-6 shadow-sm`}
            >
              {/* Current Plan Badge */}
              {isCurrentPlan && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Current Plan
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-6">
                <div className="flex justify-center mb-3">{plan.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <div className="mb-1">
                  <span className="text-2xl font-bold text-gray-900">
                    {plan.nairaPrice}
                  </span>
                </div>
                <p className="text-gray-500 text-sm">{plan.billing}</p>
              </div>

              {/* Features List */}
              <div className="space-y-3 mb-6">
                {plan.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <span className="text-[#17B26A]">✓</span>
                    <span className="text-sm text-gray-600 leading-relaxed">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <button
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${isCurrentPlan ? "bg-blue-400 text-white" : "bg-gray-800 text-white"}`}
                disabled={isCurrentPlan || isLoading}
                onClick={() => handleClick(plan.buttonText)}
              >
                {isLoading ? <BeatLoader /> : isCurrentPlan ? "Current Plan" : splitString(plan.buttonText)}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AvailablePlans;
