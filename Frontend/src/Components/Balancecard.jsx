import { useNavigate } from "react-router-dom";

export function BalanceCard({ data, account }) {
  const navigate = useNavigate();

  return (
    <div className="bg-teal-600 rounded-xl shadow-xl p-6 text-white flex flex-col md:flex-row justify-between items-start md:items-center w-full md:ml-14 mb-6 md:mb-0">
      {/* Balance Info */}
      <div className="mb-4 md:mb-0">
        <h2 className="text-2xl font-semibold">Total {account} Balance</h2>
        <p className="text-5xl font-bold mt-2">${data}</p>
        <p className="text-green-400 text-sm mt-1">+15.8% ↑</p>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2 md:space-x-4 mt-4 md:mt-0">
        <button
          className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
          onClick={() => {
            navigate('/deposite');
          }}
        >
          + Add
        </button>
        <button className="bg-gray-200 hover:bg-gray-300 text-teal-800 py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
          Send
        </button>
        <button className="bg-gray-200 hover:bg-gray-300 text-teal-800 py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
          Request
        </button>
      </div>
    </div>
  );
}
