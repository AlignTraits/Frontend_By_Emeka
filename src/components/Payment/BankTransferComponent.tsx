import React, { useState, useEffect } from 'react';
import { Copy, Clock } from 'lucide-react';

interface BankTransferData {
  bankName: string;
  accountNumber: string;
  totalPayment: string;
  expiresInMinutes: number;
}

const BankTransferComponent: React.FC = () => {
  const [transferData] = useState<BankTransferData>({
    bankName: 'Paystack-Titan',
    accountNumber: '0003543212000',
    totalPayment: '$3.99',
    expiresInMinutes: 29
  });

  const [timeRemaining, setTimeRemaining] = useState<number>(transferData.expiresInMinutes);
  const [seconds, setSeconds] = useState<number>(59);
  const [transferConfirmed, setTransferConfirmed] = useState<boolean>(false);
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => {
        if (prev === 0) {
          if (timeRemaining > 0) {
            setTimeRemaining(time => time - 1);
            return 59;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  const handleCopyAccountNumber = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(transferData.accountNumber);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy account number:', err);
    }
  };

  const handleTransferConfirmation = (): void => {
    setTransferConfirmed(true);
  };

  const handleRedirect = (): void => {
    setIsRedirecting(true);
    // Simulate redirect process
    setTimeout(() => {
      console.log('Redirecting to success page...');
      setIsRedirecting(false);
    }, 3000);
  };

  const formatTime = (minutes: number, seconds: number): string => {
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full px-5 pt-2 transition-all duration-300 flex flex-col space-y-3">
      <div>
        {/* Header */}
        <div className="flex justify-between items-center mb-1">
          <h2 className="font-medium text-[#757575] text-[14px]">Payment Details</h2>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-1" />
            <span>Expires in {formatTime(timeRemaining, seconds)} minutes</span>
          </div>
        </div>


        {/* Bank Details */}
        <div className="bg-[#EAF2FB] rounded-lg p-4 mb-1 border border-[#004085] shadow-md">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h3 className="font-semibold text-[#004085] text-lg mb-1">
                {transferData.bankName}
              </h3>
              <p className="text-2xl font-mono font-bold text-[#004085] tracking-wider">
                {transferData.accountNumber}
              </p>
            </div>
            <button
              onClick={handleCopyAccountNumber}
              className="flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-white border border-blue-200 rounded-md hover:bg-blue-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Copy className="w-4 h-4 mr-1" />
              {copySuccess ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="mb-1">
        <p className="text-sm text-gray-600 leading-relaxed">
          Transfer to this account number, then click "I have made the transfer" 
          below and we will confirm your transfer.
        </p>
      </div>

      {/* Confirmation Button */}
      {!transferConfirmed ? (
        <button
          onClick={handleTransferConfirmation}
          className="w-[250px] h-[40px] rounded-2xl text-[#004085] text-[16px] font-semibold border border-[#004085] shadow-md"
        >
          I have made the transfer
        </button>
      ) : (
        <div className="w-[250px] mb-1 p-3 bg-green-50 border border-green-200 rounded-md">
          <p className="text-sm text-green-800 font-medium">
            ✓ Transfer confirmation received
          </p>
        </div>
      )}

      {/* Total Payment */}
      <div className="flex justify-between items-center py-3 mb-1">
        <span className="text-sm font-medium text-gray-700">Total payment</span>
        <span className="text-lg font-bold text-gray-900">{transferData.totalPayment}</span>
      </div>

      {/* Redirect Button */}
      <button
        onClick={handleRedirect}
        disabled={!transferConfirmed || isRedirecting}
        className={`w-full py-3 px-4 rounded-md font-semibold text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          !transferConfirmed
            ? 'bg-gray-400 cursor-not-allowed'
            : isRedirecting
            ? 'bg-blue-500 cursor-wait'
            : 'bg-[#004085] hover:bg-blue-700 focus:ring-blue-500'
        }`}
      >
        {isRedirecting ? (
          <div className="flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            Redirecting...
          </div>
        ) : (
          'Continue'
        )}
      </button>

      {/* Status Messages */}
      {/* {copySuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
          <p className="text-sm text-green-800">
            Account number copied to clipboard!
          </p>
        </div>
      )} */}

      {timeRemaining === 0 && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-800 font-medium">
            Payment session expired. Please start a new transaction.
          </p>
        </div>
      )}
      
    </div>
  );
};

export default BankTransferComponent;