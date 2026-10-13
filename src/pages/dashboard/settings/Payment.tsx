import { useEffect, useState } from "react";
import Header from "../../../components/Settings/Header";
import BasicPlan from "../../../assets/dashboard/icons/basic-plan.svg";
import PremiumPlan from "../../../assets/dashboard/icons/premium-plan.svg";
import ExclusivePlan from "../../../assets/dashboard/icons/exclusive-plan.svg";
import CheckBox from "../../../assets/dashboard/icons/checkbox.png";
import CheckMark from "../../../assets/dashboard/icons/checkmark.png";
import AddIcon from "../../../assets/dashboard/icons/addIcon.png";
import VisaIcon from "../../../assets/dashboard/icons/visaIcon.png";
import MasterCardIcon from "../../../assets/dashboard/icons/mastercardIcon.png";
import { useAuth } from "../../../contexts/useAuth";
import { getSavedCards, removeSavedCard } from "../../../services/utils";
import { PLAN_LIST } from "../../../data/planData";
import { toast } from "react-toastify";

interface SavedCard {
  authorization_code: string;
  brand: string;
  last4: string;
  exp_month: string;
  exp_year: string;
}

const PLAN_ICONS: Record<string, string> = {
  basic: BasicPlan,
  silver: PremiumPlan,
  gold: ExclusivePlan,
};

const PLAN_COLORS: Record<string, string> = {
  basic: "#007BFF",
  silver: "#004085",
  gold: "#F6C648",
};

export default function Payment() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState<SavedCard[]>([]);
  const [cardsLoading, setCardsLoading] = useState(true);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    setCardsLoading(true);
    try {
      const response = await getSavedCards();
      if (response?.ok) {
        setCards(response.data || []);
      }
    } catch (err: any) {
      console.log("error fetching saved cards: ", err);
    } finally {
      setCardsLoading(false);
    }
  };

  const handleRemoveCard = async (authorization_code: string) => {
    try {
      const response = await removeSavedCard(authorization_code);
      if (response?.ok) {
        toast.success("Card removed");
        setCards((prev) =>
          prev.filter((c) => c.authorization_code !== authorization_code),
        );
      }
    } catch (err: any) {
      console.log("error removing card: ", err);
    }
  };

  const handleClick = () => {
    setIsLoading(false);
  };

  return (
    <div className="w-full">
      <Header
        heading="Payment / Bills"
        text="Manage bills and payment details"
        buttonText="Save Changes"
        handleClick={handleClick}
        isLoading={isLoading}
      />

      <div className="space-y-6 border-b-[1px] border-[#E0E0E0] py-5">
        <h3 className="text-[#000000] font-medium text-[20px] ">
          Subscription plans
        </h3>
        <ul className="space-y-8 w-[80%]">
          {PLAN_LIST.map((plan) => {
            const isCurrent = user?.payment_plan === plan.planKey;
            return (
              <li
                key={plan.planKey}
                className="border-[0.8px] border-[#004085] rounded-lg"
              >
                <div className="flex border-b-[0.4px] border-[#004085] p-3 py-2">
                  <div className="flex gap-2 w-full">
                    <img src={PLAN_ICONS[plan.id]} alt="" />
                    <span className="text-[#000000] text-[18px] font-[500] my-auto">
                      {plan.title}
                    </span>
                    <span className="text-[#757575] text-[14px] my-auto">
                      ({plan.tier})
                    </span>
                  </div>
                  <div>
                    <img src={isCurrent ? CheckMark : CheckBox} alt="" />
                  </div>
                </div>
                <div className="p-3 pb-2 pt-5 space-y-4">
                  <p className="text-[#000000] text-[20px] font-[500]">
                    <span
                      style={{ color: PLAN_COLORS[plan.id] }}
                      className="text-[28px] font-bold"
                    >
                      {plan.nairaPrice} / {plan.dollarPrice}
                    </span>{" "}
                    {plan.label === "One-time" ? "one-time" : "per month"}
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    {plan.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="text-[#212121] text-[14px] font-medium"
                      >
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="py-10 space-y-8">
        <h3 className="text-[#000000] font-[500] text-[18px] ">Saved Payments</h3>
        <ul className="flex w-full gap-5">
          {!cardsLoading && cards.length === 0 && (
            <p className="text-[#757575] text-[14px]">No saved cards yet.</p>
          )}
          {cards.map((card) => (
            <li
              key={card.authorization_code}
              className="border-[0.4px] border-[#004085] rounded-md p-5 space-y-4"
            >
              <div className="flex gap-2">
                <img
                  src={card.brand?.toLowerCase() === "visa" ? VisaIcon : MasterCardIcon}
                  alt=""
                />
                <p className="my-auto font-bold text-[16px] capitalize">
                  {card.brand}****{card.last4}
                </p>
              </div>
              <p className="text-[#212121] text-[14px]">
                Expires {card.exp_month}/{card.exp_year}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleRemoveCard(card.authorization_code)}
                  className="border-[0.79px] border-[#757575] text-[#212121] text-[16px] rounded-md w-[200px] py-2"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
          <div className="my-auto">
            <img src={AddIcon} alt="" />
          </div>
        </ul>
      </div>
    </div>
  );
}
