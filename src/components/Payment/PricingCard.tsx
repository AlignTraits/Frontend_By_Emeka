import React from 'react';
import classNames from 'classnames';

interface PricingCardProps {
  title: string;
  plan: string;
  price: string;
  features: string[];
  type: string;
  isActive?: boolean;
  onSelect?: () => void;
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
  return (
    <div
      className={classNames(
        'relative flex flex-col p-6 rounded-2xl shadow-md w-[300px] max-w-sm transition-all duration-300',
        {
          'bg-white': !isActive,
          'bg-blue-900 text-white': isActive,
        }
      )}
    >
      <div className="absolute top-[-20px] right-[0px] text-[#000] font-medium text-sm text-center mb-2">{type}</div>
      <h3 className="text-xl font-semibold text-center mb-1">{title}</h3>
      <div className={classNames('text-center mb-4 font-medium mt-10', { 'text-gray-400': !isActive })}>
        {plan}
      </div>
           {/* Divider */}
      <div className={`w-full h-px mb-6 ${
        isActive ? 'bg-blue-400' : 'bg-gray-200'
      }`} />
      <ul className="flex-1 mb-6 space-y-2 text-sm list-disc list-inside">
        {features.map((feature, idx) => (
          <li key={idx}>{feature}</li>
        ))}
      </ul>
      <div className="text-2xl font-bold text-center mb-4">{price}</div>
      <button
        onClick={onSelect}
        className={classNames(
          'w-full py-2 rounded font-semibold transition',
          {
            'bg-yellow-400 text-black hover:bg-yellow-500': isActive,
            'bg-blue-900 text-white hover:bg-blue-800': !isActive,
          }
        )}
      >
        Select
      </button>
    </div>
  );
};

export default PricingCard;