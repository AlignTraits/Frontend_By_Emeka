import React, { useState, ChangeEvent } from 'react';

interface FormData {
  cardholderName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
  rememberCard: boolean;
}

const CreditCardForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    cardholderName: 'JOSEPH SAMUEL',
    cardNumber: '0000 2435 0000 8973',
    expiry: '03/25',
    cvc: '321',
    rememberCard: false
  });

  const handleInputChange = (field: keyof FormData, value: string | boolean): void => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatCardNumber = (value: string): string => {
    // Remove all non-digits
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    // Add spaces every 4 digits
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts: string[] = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string): string => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleCardNumberChange = (e: ChangeEvent<HTMLInputElement>): void => {
    handleInputChange('cardNumber', formatCardNumber(e.target.value));
  };

  const handleExpiryChange = (e: ChangeEvent<HTMLInputElement>): void => {
    handleInputChange('expiry', formatExpiry(e.target.value));
  };

  const handleCvcChange = (e: ChangeEvent<HTMLInputElement>): void => {
    handleInputChange('cvc', e.target.value.replace(/\D/g, ''));
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>): void => {
    handleInputChange('rememberCard', e.target.checked);
  };

  const handleSubmit = (): void => {
    console.log('Form submitted:', formData);
  };


  return (
    <div className="w-full p-5">
      <div className="space-y-4 flex gap-x-[20px] flex-col">
        {/* Cardholder's Name */}
        <div>
          <label 
            htmlFor="cardholderName"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Cardholder's Name
          </label>
          <input
            id="cardholderName"
            type="text"
            value={formData.cardholderName}
            onChange={(e) => handleInputChange('cardholderName', e.target.value)}
            className="w-full px-3 py-3 border-[1px] border-[#004085] shadow-lg rounded-md focus:outline-none focus:border-blue-500 text-[#004085] font-medium transition-colors duration-200"
            placeholder="Enter cardholder name"
            required
          />
        </div>

        {/* Card Number */}
        <div>
          <label 
            htmlFor="cardNumber"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Card Number
          </label>
          <div className="relative">
            <input
              id="cardNumber"
              type="text"
              value={formData.cardNumber}
              onChange={handleCardNumberChange}
              className="w-full px-3 py-3 pl-12 bg-gray-50 border-[1px] border-[#004085] shadow-lg rounded-md focus:outline-none focus:border-blue-400 text-[#004085] font-mono transition-colors duration-200"
              placeholder="0000 0000 0000 0000"
              maxLength={19}
              required
            />
            {/* Mastercard Logo */}
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <div className="flex">
                <div className="w-4 h-4 bg-red-500 rounded-full opacity-90"></div>
                <div className="w-4 h-4 bg-orange-400 rounded-full -ml-2 opacity-90"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Expiry and CVC */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <label 
              htmlFor="expiry"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Expiry
            </label>
            <input
              id="expiry"
              type="text"
              value={formData.expiry}
              onChange={handleExpiryChange}
              className="w-full px-3 py-3 bg-gray-50 border-[1px] border-[#004085] shadow-lg rounded-md focus:outline-none focus:border-blue-400 text-[#004085] font-mono transition-colors duration-200"
              placeholder="MM/YY"
              maxLength={5}
              required
            />
          </div>
          <div className="flex-1">
            <label 
              htmlFor="cvc"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              CVC
            </label>
            <input
              id="cvc"
              type="text"
              value={formData.cvc}
              onChange={handleCvcChange}
              className="w-full px-3 py-3 bg-gray-50 border-[1px] border-[#004085] shadow-lg rounded-md focus:outline-none focus:border-blue-400 text-[#004085] font-mono transition-colors duration-200"
              placeholder="123"
              maxLength={4}
              required
            />
          </div>
        </div>

        {/* Remember Bank Card */}
        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            id="rememberCard"
            checked={formData.rememberCard}
            onChange={handleCheckboxChange}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          />
          <label htmlFor="rememberCard" className="ml-2 text-sm font-medium text-gray-700">
            Remember bank card
          </label>
        </div>

        {/* Submit Button */}
        <button 
          type="button"
          onClick={handleSubmit}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Pay $16.9
        </button>
      </div>
    </div>
  );
};

export default CreditCardForm;