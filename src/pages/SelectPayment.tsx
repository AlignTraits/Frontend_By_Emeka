import { useState, useEffect } from "react";
import Header from "../components/Header";
import PricingCard  from "../components/Payment/PricingCard";


export default function SelectPayment() {

  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds

  const [selectedPlan, setSelectedPlan] = useState<number>(1); // Default to Silver plan (index 1)

  const handleSelect = (planIndex: number) => {
    setSelectedPlan(planIndex);

    localStorage.setItem("selectedPlan", JSON.stringify(planIndex))
  };

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')} : ${String(secs).padStart(2, '0')}`;
  };

  const plans = [
    {
      title: 'Basic One-Time Plan',
      subtitle: 'Basic',
      billing: 'One-time',
      price: '$3.99',
      features: [
        'One result only',
        'No future updates',
        'No access to scholarships',
        'No access to loan information'
      ],
      isActive: false
    },
    {
      title: 'Local Access Plan',
      subtitle: 'Silver',
      billing: 'Monthly',
      price: '$8.99',
      features: [
        'Unlimited checks within 1 country',
        'Loan information & course access',
        'Editable exam records'
      ],
      isActive: true
    },
    {
      title: 'Global Access Plan',
      subtitle: 'Gold',
      billing: 'Monthly',
      price: '$14.99',
      features: [
        'Access to all country/schools',
        'Loan information & course access',
        'Editable exam records',
        'Scholarships, global support',
        'New school priority access'
      ],
      isActive: false
    }
  ];

return (
  <div className="relative min-h-screen w-full bg-gradient-to-b from-white via-[#e9eff7] to-[#CCE0F5]">
    <Header />

    <div className="h-[80px] w-[90%] bg-[#004085] rounded-[20px] mx-auto mt-6 flex flex-col sm:flex-row justify-between items-center px-4 sm:px-10 py-4 sm:py-0">
      <p className="font-semibold text-[16px] sm:text-[20px] text-white mb-2 sm:mb-0">Result expires in:</p>
      <p className="font-semibold text-[16px] sm:text-[20px] text-white">{formatTime(timeLeft)}</p>
    </div>

    <div className="mt-8 flex flex-col items-center space-y-6 px-2">
      <p className="text-[#101828] font-bold text-[20px] sm:text-[25px] text-center">Get Instant Access to Your Results!</p>

      <div className="flex flex-col sm:flex-row gap-y-8 sm:gap-y-0 sm:gap-x-[40px] w-full justify-center items-center">
        {plans.map((plan, index) => (
          <PricingCard
            key={index}
            title={plan.title}
            plan={plan.subtitle}
            price={plan.price}
            features={plan.features}
            type={plan.billing}
            isActive={selectedPlan === index}
            onSelect={() => handleSelect(index)}
          />
        ))}
      </div>
    </div>

    <div className="h-[40px] w-full" />
  </div>
);
} 