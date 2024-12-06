import {useState} from 'react'
import Header from "../../../components/Settings/Header";
import BasicPlan from '../../../assets/dashboard/icons/basic-plan.svg'
import PremiumPlan from "../../../assets/dashboard/icons/premium-plan.svg";
import ExclusivePlan from "../../../assets/dashboard/icons/exclusive-plan.svg";
import CheckBox from "../../../assets/dashboard/icons/checkbox.png";
import CheckMark from "../../../assets/dashboard/icons/checkmark.png";
import AddIcon from '../../../assets/dashboard/icons/addIcon.png'
import VisaIcon from '../../../assets/dashboard/icons/visaIcon.png'
import MasterCardIcon from "../../../assets/dashboard/icons/mastercardIcon.png";





interface Subscriptions {
 title: string;
 icon: string;
 color: string;
 price: string;
 description: string;
}

interface BankCards {
  type: string;
  cardNumber: string;
  expiry: string;

}

export default function Payment() {
const [plan, setPlan] = useState('basic')
  const handleClick = ()=> {
    console.log('click')
  }

const subscriptions: Subscriptions[] = [
  {
    title: "basic",
    icon: BasicPlan,
    color: "#007BFF",
    price: "$0.13",
    description:
      "It includes essential features such as a Personality Survey Test.",
  },
  {
    title: "premium",
    icon: PremiumPlan,
    color: "#004085",
    price: "$0.81",
    description: "It includes essential features such as exclusive courses.",
  },
  {
    title: "exclusive",
    icon: ExclusivePlan,
    color: "#F6C648",
    price: "$1.31",
    description:
      "It includes essential features such as Internships in companies after learning.",
  },
];

const bankCards: BankCards[] = [
  {
    type: "visa",
    cardNumber: "2749",
    expiry: "september 2027",
  },
  {
    type: "mastercard",
    cardNumber: "2740",
    expiry: "september 2027",
  },
];

  return (
    <div className="">
      <Header
        heading="Payment / Bills"
        text="Manage bills and payment details"
        buttonText="Save Changes"
        handleClick={handleClick}
      />

      <div className="space-y-6 border-b-[1px] border-[#E0E0E0] py-5">
        <h3 className="text-[#000000] font-medium text-[20px] ">
          Subscription plans
        </h3>
        <ul className="space-y-8 w-[80%]">
          {subscriptions.map((subscription, index) => (
            <li
              key={subscription.title + index}
              className="border-[0.8px] border-[#004085] rounded-lg"
            >
              <div className="flex border-b-[0.4px] border-[#004085] p-3 py-2">
                <div className="flex gap-2 capitalize   w-full">
                  <img src={subscription.icon} alt="" />
                  <span className="text-[#000000] text-[18px] font-[500] my-auto">
                    {subscription.title}
                  </span>
                </div>
                <div onClick={() => setPlan(subscription.title)}>
                  <img
                    src={plan == subscription.title ? CheckMark : CheckBox}
                    alt=""
                  />
                </div>
              </div>
              <div className="p-3 pb-2 pt-5 space-y-4  ">
                <p className="text-[#000000] text-[20px] font-[500]">
                  <span
                    className={`text-[${subscription.color}] text-[33.33px] font-bold`}
                  >
                    {subscription.price}
                  </span>{" "}
                  per month
                </p>
                <p className="text-[#212121] text-[14px] font-medium">
                  {subscription.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="py-10 space-y-8">
        <h3 className="text-[#000000] font-[500] text-[18px] ">
          Saved Payments
        </h3>
        <ul className="flex w-full gap-5">
          {bankCards?.map((card, index) => (
            <li
              key={card.cardNumber + index}
              className="border-[0.4px] border-[#004085] rounded-md p-5 space-y-4"
            >
              <div className="flex gap-2">
                <img
                  src={card.type === "visa" ? VisaIcon : MasterCardIcon}
                  alt=""
                />
                <p className="my-auto font-bold text-[16px]">
                  {card.type === "visa"
                    ? "VisaCard****" + card.cardNumber
                    : "MasterCard****" + card.cardNumber}
                </p>
              </div>
              <p className="text-[#212121] text-[14px]">Expires {card.expiry}</p>
              <div className="flex gap-2">
                <button className="border-[0.79px] border-[#757575] text-[#212121] text-[16px] rounded-md w-[200px] py-2">
                  Remove
                </button>
                <button className="border-[0.79px] border-[#757575] text-[#212121] text-[16px] rounded-md w-[200px] py-2">
                  Edit
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
