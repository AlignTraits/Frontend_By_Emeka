import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, CreditCard, Loader2 } from 'lucide-react';
import { useAuth } from '../../../contexts/useAuth';
import { getUserDetails } from "../../../services/auth.service";
import { deleteCard } from '../../../services/utils';
import { toast } from 'react-toastify';

const ResponsivePaymentMethods: React.FC = () => {
  const { user, token, setUser } = useAuth();
  const [isLoading, setIsloading] = useState(false)
  const navigate = useNavigate()

  async function handleDeleteCard(authId: string) {
    if (token) {
      let response;
      setIsloading(true)
      try {
        deleteCard(authId, token)
        response = await getUserDetails(token as string);
        localStorage.setItem("user", JSON.stringify(response.data))
        setUser(response.data)

      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setIsloading(false)
      }
    } else {
      toast.error("Session ended. Please login!");
      setTimeout(() => {
        navigate("/login");
      }, 1500)
    }
  }
  
  const getCardIcon = () => {
    return <CreditCard className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />;
  };

  const maskCardNumber = (brand: string, last4: string) => {
    const brandName = brand.charAt(0).toUpperCase() + brand.slice(1);
    return `${brandName} •••• •••• •••• ${last4}`;
  };

  const formatExpiryDate = (month: string, year: string) => {
    return `${month}/${year.slice(-2)}`;
  };

  console.log("user: ", user);

  return (
    <>
      <div className="w-full mx-auto bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-200 flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Payment Methods</h2>
            <p className="text-gray-600 text-sm mt-1">Manage your payment methods and billing information</p>
          </div>
          <button className="inline-flex items-center justify-center space-x-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 w-full sm:w-auto">
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">Add Cards</span>
          </button>
        </div>

        {/* Payment Methods List */}
        <div className="p-4 sm:p-6 space-y-4">
          {user?.userCards && user?.userCards.map((method) => (
            <div key={method.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 space-y-4 sm:space-y-0">
              {/* Left Section - Card Info */}
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="flex-shrink-0">
                  {getCardIcon()}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center space-x-2 flex-wrap">
                    <span className="font-medium text-gray-900 text-sm sm:text-base">
                      {maskCardNumber(method.brand, method.last4)}
                    </span>
                    {method.reusable && (
                      <span className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full flex-shrink-0">
                        Reusable
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Expires {formatExpiryDate(method.exp_month, method.exp_year)}
                  </p>
                  {method.subscription_status && (
                    <p className={`text-xs text-gray-400 mt-1 ${method.subscription_status === "INACTIVE" ? 'text-red-400' : 'text-green-400'}`}>
                      <span className='text-gray-400'>Subscription:</span> {method.subscription_status}
                    </p>
                  )}
                </div>
              </div>

              {/* Right Section - Actions */}
              <div className="flex items-center justify-between sm:justify-end space-x-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                <div className="flex items-center space-x-1">
                  <button 
                    onClick={() => handleDeleteCard(method.authorization_code)} 
                    disabled={isLoading}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Loading Modal */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-xl shadow-2xl p-8 max-w-sm mx-4 text-center">
            <div className="flex flex-col items-center space-y-4">
              {/* Spinning loader */}
              <div className="relative">
                <Loader2 className="w-12 h-12 text-gray-600 animate-spin" />
              </div>
              
              {/* Loading text */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Deleting Card
                </h3>
                <p className="text-sm text-gray-600">
                  Please wait while we remove your payment method...
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResponsivePaymentMethods;