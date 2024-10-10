import { useState } from "react";
import axios from "axios";

export function DepositMoneyCard() {
  const [depositAmount, setDepositAmount] = useState(50); // Default deposit amount
  const [accountType, setAccountType] = useState("Checking"); // Account type selection
  const [message, setMessage] = useState(""); // Success or error messages

  const handleDepositMoney = async () => {
    try {
      const response = await axios.post(
        'https://backend-digital-wallet.vercel.app/banking/deposite',
        { amount: depositAmount, accounttype: accountType },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      setMessage(`Successfully deposited $${depositAmount} to your ${accountType} account!`);
    } catch (error) {
      console.error("Error depositing money:", error);
      setMessage("An error occurred while depositing money.");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-700">Deposit Money</h2>
        <img
          src="https://via.placeholder.com/40"
          alt="User Avatar"
          className="w-10 h-10 rounded-full"
        />
      </div>

      {/* Account Details */}
      <div className="bg-green-100 p-4 rounded-lg text-center mb-4">
        <p className="text-lg font-medium text-gray-800">Minimum Deposite Required</p>
        <p className="text-4xl font-bold text-gray-800 mt-2">
          $50
        </p>
      </div>

      {/* Deposit Amount Input */}
      <div className="mb-6">
        <label className="block text-md font-medium text-gray-600 mb-2">Deposit Amount</label>
        <input
          type="number"
          value={depositAmount}
          onChange={(e) => setDepositAmount(Number(e.target.value))} // Handle input changes
          className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg text-lg text-gray-800 focus:ring-2 focus:ring-green-300"
          placeholder="Enter amount to deposit"
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

      {/* Submit Button */}
      <button
        onClick={handleDepositMoney}
        className="w-full bg-green-400 hover:bg-green-500 text-white py-3 rounded-lg font-semibold transition duration-300"
      >
        Deposit Money
      </button>

      {/* Message Display */}
      {message && (
        <div className="mt-4 text-center text-green-500 font-semibold">
          {message}
        </div>
      )}
    </div>
  );
}
