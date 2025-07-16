import React from 'react';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import { makePayment } from '../../services/utils';
import { BeatLoader } from 'react-spinners';

interface PricingCardProps {
  title: string;
  plan: string;
  price: string;
  features: string[];
  type: string;
  isActive?: boolean;
  onSelect: () => number;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  plan,
  price,
  features,
  type,
  isActive = false,
  onSelect
}) => {

  const [isLoading, setIsLoading] = React.useState(false);
  const temp = localStorage.getItem("eligibility-data")
  const tempData = temp ? JSON.parse(temp) : null;


  const handleInnerClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // 🛑 stops the click from bubbling up
    let selectNumber = onSelect()

    console.log("selectNumber: ", selectNumber)

    try {
      setIsLoading(true)
      let data = await makePayment({
        "paymentPlan": selectNumber === 0 ? "BASIC_ONETIME" : selectNumber === 1 ? "LOCAL_MONTHLY" : "GLOBAL_MONTHLY",
        "firstname": tempData?.firstName,
        "lastname": tempData?.lastName, 
        "email": tempData?.email,
        "schoolLocation": tempData?.schoolLocation,
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
      setIsLoading(false)
    }

  };

  return (
    <div
      onClick={onSelect}
      className={classNames(
        // Responsive width, padding, and height
        'relative cursor-pointer flex flex-col p-4 sm:p-6 rounded-2xl shadow-md w-full max-w-[320px] min-w-[220px] h-[420px] sm:w-[300px] sm:h-[450px] transition-all duration-300',
        {
          'bg-white': !isActive,
          'bg-blue-900 text-white': isActive,
        }
      )}
    >
      <div className="absolute top-[-18px] right-[0px] text-[#000] font-medium text-xs sm:text-sm text-center mb-2">{type}</div>
      <h3 className="text-lg sm:text-xl font-semibold text-center mb-1">{title}</h3>
      <div className={classNames('text-center mb-4 font-medium mt-6 sm:mt-10', { 'text-gray-400': !isActive })}>
        {plan}
      </div>
      {/* Divider */}
      <div className={`w-full h-px mb-6 ${isActive ? 'bg-blue-400' : 'bg-gray-200'}`} />
      <ul className="flex-1 mb-6 space-y-2 text-xs sm:text-sm list-disc list-inside">
        {features.map((feature, idx) => (
          <li key={idx}>{feature}</li>
        ))}
      </ul>
      <div className="text-xl sm:text-2xl font-bold text-center mb-4">{price}</div>
      <button
        onClick={handleInnerClick}
        className={classNames(
          'w-full py-2 rounded font-semibold transition text-sm sm:text-base',
          {
            'bg-yellow-400 text-black hover:bg-yellow-500': isActive,
            'bg-blue-900 text-white hover:bg-blue-800': !isActive,
          }
        )}
      >
        {isLoading ? <BeatLoader /> : "Select Plan"}
      </button>
    </div>
  );
};

export default PricingCard;