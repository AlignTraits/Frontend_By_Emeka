import React from 'react';
import { Plus, Edit, Trash2, CreditCard } from 'lucide-react';

interface PaymentMethod {
  id: string;
  type: 'Visa' | 'Mastercard';
  lastFour: string;
  expiryDate: string;
  cardholderName: string;
  isDefault: boolean;
}

const ResponsivePaymentMethods: React.FC = () => {
  const paymentMethods: PaymentMethod[] = [
    {
      id: '1',
      type: 'Visa',
      lastFour: '1234',
      expiryDate: '12/26',
      cardholderName: 'John Samuel',
      isDefault: true
    },
    {
      id: '2',
      type: 'Mastercard',
      lastFour: '3678',
      expiryDate: '12/26',
      cardholderName: 'John Samuel',
      isDefault: false
    }
  ];

  const getCardIcon = () => {
    return <CreditCard className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />;
  };

  const maskCardNumber = (type: string, lastFour: string) => {
    return `${type} •••• •••• •••• ${lastFour}`;
  };

  return (
    <div className="w-full mx-auto bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-gray-200 flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Payment Methods</h2>
          <p className="text-gray-600 text-sm mt-1">Manage your payment methods and billing information</p>
        </div>
        <button className="inline-flex items-center justify-center space-x-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 w-full sm:w-auto">
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">Add Payment Method</span>
        </button>
      </div>

      {/* Payment Methods List */}
      <div className="p-4 sm:p-6 space-y-4">
        {paymentMethods.map((method) => (
          <div key={method.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 space-y-4 sm:space-y-0">
            {/* Left Section - Card Info */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="flex-shrink-0">
                {getCardIcon()}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center space-x-2 flex-wrap">
                  <span className="font-medium text-gray-900 text-sm sm:text-base">
                    {maskCardNumber(method.type, method.lastFour)}
                  </span>
                  {method.isDefault && (
                    <span className="inline-flex px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full flex-shrink-0">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Expires {method.expiryDate} • {method.cardholderName}
                </p>
              </div>
            </div>

            {/* Right Section - Actions */}
            <div className="flex items-center justify-between sm:justify-end space-x-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
              {!method.isDefault && (
                <button className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200 px-2 py-1">
                  Set as Default
                </button>
              )}
              <div className="flex items-center space-x-1">
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResponsivePaymentMethods;