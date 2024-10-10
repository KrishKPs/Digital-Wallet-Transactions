import { useState } from "react";
import axios from "axios";

export function CreateBankAccount() {
  const [accountType, setAccountType] = useState("Checking"); // Default account type
  const [initialDeposit, setInitialDeposit] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCreateAccount = async () => {
    if (!initialDeposit || initialDeposit <= 0) {
      setErrorMessage("Please enter a valid initial deposit amount.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://backend-digital-wallet.vercel.app/banking/createaccount",
        { accountType, initialDeposit },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      setSuccessMessage(`Account created successfully with ${response.data.accountType} account.`);
      setErrorMessage("");
      setInitialDeposit(""); // Clear input fields
    } catch (error) {
      setErrorMessage("Failed to create the account. Please try again.");
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">Create a New Account</h2>

      {/* Account Type */}
      <div className="mb-4">
        <label className="block text-gray-600 font-medium mb-2">Account Type</label>
        <select
          value={accountType}
          onChange={(e) => setAccountType(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="Checking">Checking</option>
          <option value="Savings">Savings</option>
        </select>
      </div>

      {/* Initial Deposit */}
      <div className="mb-4">
        <label className="block text-gray-600 font-medium mb-2">Initial Deposit Amount</label>
        <input
          type="number"
          value={initialDeposit}
          onChange={(e) => setInitialDeposit(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Enter initial deposit amount"
        />
      </div>

      {/* Create Account Button */}
      <button
        onClick={handleCreateAccount}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Create Account
      </button>

      {/* Error and Success Messages */}
      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
    </div>
  );
}
