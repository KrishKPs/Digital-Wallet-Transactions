import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export function TransferUser() {
  const [amount, setAmount] = useState("");
  const [accountType, setAccountType] = useState(""); // Added account type state
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { id } = useParams(); // Get user ID from the URL

  const handleTransfer = async () => {
    if (!accountType || !amount) {
      setErrorMessage("Please select an account type and enter a valid amount.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `https://backend-digital-wallet.vercel.app/banking/transfer/${id}`,
        { amount, accounttype: accountType }, // Include account type in request
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      setSuccessMessage(`Successfully transferred $${amount} from your ${accountType} account.`);
      setErrorMessage("");
      setAmount(""); // Clear amount after successful transfer
      setAccountType(""); // Clear account type after successful transfer
    } catch (error) {
      setErrorMessage("Failed to transfer money. Please try again.");
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">Transfer Money</h2>

      {/* Account Type Dropdown */}
      <div className="mb-4">
        <label className="block text-gray-600 font-medium mb-2">Select Account Type</label>
        <select
          value={accountType}
          onChange={(e) => setAccountType(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="" disabled>
            -- Select Account Type --
          </option>
          <option value="Checking">Checking</option>
          <option value="Savings">Savings</option>
        </select>
      </div>

      {/* Amount Input */}
      <div className="mb-4">
        <label className="block text-gray-600 font-medium mb-2">Enter Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Enter amount"
        />
      </div>

      {/* Transfer Button */}
      <button
        onClick={handleTransfer}
        className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
      >
        Transfer Money
      </button>

      {/* Error and Success Messages */}
      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
    </div>
  );
}
