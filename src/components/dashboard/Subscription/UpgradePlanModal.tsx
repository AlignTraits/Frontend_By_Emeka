import React, { useState } from 'react';
import { X, Plus, CreditCard } from 'lucide-react';

interface UpgradePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmUpgrade: () => void;
}

const UpgradePlanModal: React.FC<UpgradePlanModalProps> = ({
  isOpen,
  onClose,
  onConfirmUpgrade
}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('visa-1234');

  const paymentMethods = [
    {
      id: 'visa-1234',
      display: 'Visa •••• •••• •••• 1234 (Default)',
      isDefault: true
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Upgrade Plan</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Warning Message */}
          <p className="text-sm text-gray-600">
            You're about to upgrade to Basic Plan. This change will take effect immediately.
          </p>

          {/* Payment Method Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Payment Method:
            </label>
            <div className="space-y-2">
              {paymentMethods.map((method) => (
                <label key={method.id} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.id}
                    checked={selectedPaymentMethod === method.id}
                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <div className="flex items-center space-x-2">
                    <CreditCard className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700">{method.display}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Add New Payment Method */}
          <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors duration-200">
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">Add New Payment Method</span>
          </button>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirmUpgrade}
            className="px-6 py-2 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors duration-200"
          >
            Confirm Upgrade
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpgradePlanModal;