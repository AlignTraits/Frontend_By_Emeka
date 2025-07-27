import React from 'react';
import { useAuth } from '../../../contexts/useAuth';
import { Download, CheckCircle, XCircle, } from 'lucide-react';
import { Transaction } from '../../../types/auth.types';
import { RiProgress2Line } from "react-icons/ri";



const BillingHistory: React.FC = () => {
  const {user} = useAuth()
  console.log("user: ", user?.transactions)

  const getStatusIcon = (status: string) => {
    return status === 'SUCCESS' ? (
      <CheckCircle className="w-4 h-4 text-green-500" />
    )  : status === 'PENDING' ?  (
      <RiProgress2Line className="w-4 h-4 text-yellow-500" />
    ): (
      <XCircle className="w-4 h-4 text-red-500" />
    );
  };

  function formatDateToMMDDYYYY(isoDateString:string) {
  const date = new Date(isoDateString);

  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();

  return `${month}-${day}-${year}`;
}


  const getStatusStyle = (status: string) => {
    return status === 'SUCCESS' 
      ? 'bg-green-100 text-green-800' : status === 'PENDING' ? 'bg-yellow-100 text-yellow-800'
      : 'bg-red-100 text-red-800';
  };

  return (
    <div className="w-full mx-auto bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-[#757575]">Billing History</h2>
        <p className="text-gray-600 text-sm mt-1">View and download your transaction history</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="hidden lg:block px-3 lg:px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-3 lg:px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Plan
              </th>
              <th className="hidden lg:block px-3 lg:px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-3 lg:px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-3 lg:px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {user?.transactions.map((transaction: Transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="hidden lg:block px-3 lg:px-6 py-4 whitespace-nowrap text-sm font-semibold text-[#757575]">
                  {formatDateToMMDDYYYY(transaction.createdAt)}
                </td>
                <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm font-semibold text-[#757575]">
                  {transaction.paymentPlan}
                </td>
                <td className="hidden lg:block px-3 lg:px-6 py-4 whitespace-nowrap text-sm font-semibold text-[#757575]">
                  {transaction.currency}{transaction.amount}
                </td>
                <td className="px-3 lg:px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <div className='hidden lg:block '>{getStatusIcon(transaction.status)}</div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold font-medium rounded-full ${getStatusStyle(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </div>
                </td>
                <td className="px-3 lg:px-6 py-4 whitespace-nowrap">
                  <button className="hidden lg:flex border-[1px] shadow-sm px-[10px] py-[4px] rounded-md border-[#1018280D] items-center space-x-1 font-semibold text-gray-600 hover:text-gray-800 transition-colors duration-200">
                    <Download className="w-4 h-4" />
                    <span className="text-sm">Download</span>
                  </button>
                  <button className='lg:hidden flex flex-col items-center'>
                     {transaction.amount}
                     <Download className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BillingHistory;