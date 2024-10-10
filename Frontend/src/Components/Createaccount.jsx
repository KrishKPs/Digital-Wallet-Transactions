import axios from "axios";
import { useState } from "react";

export function CreateBankAccount() {
  const [deposit, setDeposit] = useState(100);
  const [accountType, setAccountType] = useState("Checking");

  const handleCreateAccount = async () => {
    const response = await axios.post(
      'https://backend-digital-wallet.vercel.app/banking/createaccount',
      { deposite: deposit, accounttype: accountType },
      {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      }
    );
    alert(response.data.msg);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 w-1/2 h-auto"> {/* Adjusted width to half */}
      {/* Title Section */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-700">New Bank Account</h2>
        <img src="https://via.placeholder.com/40" alt="User Avatar" className="w-10 h-10 rounded-full" />
      </div>

      {/* Balance and Details */}
      <div className="bg-green-100 p-4 rounded-lg text-center mb-4">
        <p className="text-lg font-medium text-gray-800">New Account Bonus</p>
        <p className="text-4xl font-bold text-gray-800 mt-2">$100</p>
        <p className="text-sm text-gray-500 mt-1">Deposite Limit: $12,000</p>
      </div>

      {/* Deposit Input */}
      <div className="mb-6">
        <label className="block text-md font-medium text-gray-600 mb-2">Deposit Amount</label>
        <input
          type="number"
          value={deposit}
          onChange={(e) => setDeposit(Number(e.target.value))}
          className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg text-lg text-gray-800 focus:ring-2 focus:ring-green-300"
          placeholder="Enter deposit amount"
        />
      </div>

      {/* Account Type Dropdown */}
      <div className="mb-6">
        <label className="block text-md font-medium text-gray-600 mb-2">Account Type</label>
        <select
          value={accountType}
          onChange={(e) => setAccountType(e.target.value)}
          className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg text-lg text-gray-800 focus:ring-2 focus:ring-green-300"
        >
          <option value="Checking">Checking</option>
          <option value="Savings">Savings</option>
        </select>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <button
          onClick={handleCreateAccount}
          className="w-full bg-green-400 hover:bg-green-500 text-white py-3 rounded-lg font-semibold transition duration-300"
        >
          Create Account
        </button>
      </div>
    </div>
  );
}
