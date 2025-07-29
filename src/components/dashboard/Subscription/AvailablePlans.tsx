import React, { useState } from 'react';
import { Crown } from 'lucide-react';
import { FaRegStar } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import { useAuth } from '../../../contexts/useAuth';
import { BeatLoader } from 'react-spinners';
import { makePayment } from '../../../services/utils';
import { toast } from 'react-toastify';

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  icon: React.ReactNode;
  nairaPrice: string;
  dollarPrice: string;
  billing: string;
  features: PlanFeature[];
  buttonText: string;
  buttonStyle: string;
  isCurrentPlan: boolean;
  cardStyle: string;
  loading: boolean,
}

  const plans: Plan[] = [
    {
      id: 'basic',
      name: 'Basic Plan',
      icon: <FaRegCheckCircle className="w-6 h-6 text-green-500" />,
      nairaPrice: '₦2,000',
      dollarPrice: '$3.99',
      billing: 'One-time',
      features: [
        { text: 'One result only', included: true },
        { text: 'No future updates', included: true },
        { text: 'No access to scholarships/loans information', included: true }
      ],
      buttonText: 'BASIC_ONETIME',
      buttonStyle: 'bg-gray-800 text-white hover:bg-gray-700',
      isCurrentPlan: true,
      cardStyle: 'border-gray-200',
      loading: false,
    },
    {
      id: 'silver',
      name: 'Silver Plan',
      icon: <FaRegStar className="w-6 h-6 text-green-500" />,
      nairaPrice: '₦5,500',
      dollarPrice: '$8.99',
      billing: 'per month',
      features: [
        { text: 'Unlimited checks within one country', included: true },
        { text: 'Loan information and course access', included: true },
        { text: 'Editable exam records', included: true }
      ],
      buttonText: 'LOCAL_MONTHLY',
      buttonStyle: 'bg-blue-400 text-white cursor-default',
      isCurrentPlan: false,
      cardStyle: 'border-green-400 border-2',
      loading: false,
    },
    {
      id: 'gold',
      name: 'Gold Plan',
      icon: <Crown className="w-6 h-6 text-yellow-500" />,
      nairaPrice: '₦9,500',
      dollarPrice: '$14.99',
      billing: 'per month',
      features: [
        { text: 'Access to all countries/schools', included: true },
        { text: 'Loan information and course access', included: true },
        { text: 'Editable exam records', included: true },
        { text: 'Scholarships & global support', included: true },
        { text: 'New school priority access', included: true }
      ],
      buttonText: 'GLOBAL_MONTHLY',
      buttonStyle: 'bg-gray-800 text-white hover:bg-gray-700',
      isCurrentPlan: false,
      cardStyle: 'border-gray-200',
      loading: false,
    }
  ];

  // "BASIC_ONETIME" : selectNumber === 1 ? "LOCAL_MONTHLY" : "GLOBAL_MONTHLY",


const plansKey:any = {
  'basic': 'BASIC_ONETIME',
  'silver': 'LOCAL_MONTHLY',
  'gold': 'GLOBAL_MONTHLY'
}

const AvailablePlans: React.FC = () => {

  const [statePlans, setStatePlans] = useState<Plan[]>([...plans])

  const {user} = useAuth()

  const handleClick = async (id:string) => {
    let tempState = statePlans.map((elem: Plan) => {
      if (elem.id === id) {
        return {...elem, isCurrentPlan: true, loading: true}
      }
      return {...elem, isCurrentPlan: false, loading: false}
    })
    setStatePlans([...tempState])

    try {
      // setIsLoading(true)
      let data = await makePayment({
        "paymentPlan": plansKey[id],
        "firstname": user?.firstname,
        "lastname": user?.lastname, 
        "email": user?.email,
        "schoolLocation":  latest?.schoolLocation,
      }); 

      // console.log("Payment data: ", data);
      if (data?.ok) {
        toast.success(`Redirecting you to payment...`)
        setTimeout(() => {
          window.open(data.data.authorization_url, '_blank');
        }, 2000);
      }
    } catch(err:any) {
      toast.error(err.message)
    } finally {
      let tempState = statePlans.map((elem: Plan) => {
        return {...elem, isCurrentPlan: false, loading: false}
      })
      setStatePlans([...tempState])
      }
  }

  const latest = user?.transactions &&  user?.transactions.reduce((latestTx, currentTx) => {
    return new Date(currentTx.updatedAt) > new Date(latestTx.updatedAt)
      ? currentTx
      : latestTx;
  });

    const splitString = (text: any) => {
    if (typeof text === 'string') {
      return text.replace(/_/g, ' ');
    } 
    return text
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Plan</h2>
        <p className="text-gray-600">Select the plan that best fits your needs</p>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statePlans.map((plan) => (
          <div key={plan.id} className={`relative bg-white rounded-xl border ${user?.payment_plan === plan.buttonText ? "border-green-400 border-2" : "border-gray-200"} p-6 shadow-sm`}>
            {/* Current Plan Badge */}
            {user?.payment_plan === plan.buttonText && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Current Plan
                </span>
              </div>
            )}

            {/* Plan Header */}
            <div className="text-center mb-6">
              <div className="flex justify-center mb-3">
                {plan.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
              <div className="mb-1">
                <span className="text-2xl font-bold text-gray-900">{plan.nairaPrice}</span>
                <span className="text-gray-600 ml-1">/ {plan.dollarPrice}</span>
              </div>
              <p className="text-gray-500 text-sm">{plan.billing}</p>
            </div>

            {/* Features List */}
            <div className="space-y-3 mb-6">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <FaRegCheckCircle className="text-[#17B26A]" />
                  <span className="text-sm text-gray-600 leading-relaxed">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Action Button */}
            <button 
              className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${plan.isCurrentPlan ? "bg-blue-400 text-white" : "bg-gray-800 text-white"}`}
              disabled={plan.isCurrentPlan}
              onClick={() => handleClick(plan.id)}
            >
              {plan.loading ? <BeatLoader /> : splitString(plan.buttonText)}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailablePlans;