import React, { useState } from "react";

export function TransactionsCard({ transactions }) {
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [itemsPerPage] = useState(5); // Number of transactions per page
  const [dateRange, setDateRange] = useState({ from: "", to: "" }); // Date range for filtering

  // Helper function to normalize dates
  const startOfDay = (date) => {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  };

  const endOfDay = (date) => {
    const newDate = new Date(date);
    newDate.setHours(23, 59, 59, 999);
    return newDate;
  };

  // Check if the transaction date is within the selected date range
  const isWithinDateRange = (transactionDate, fromDate, toDate) => {
    if (fromDate && toDate) {
      return transactionDate >= startOfDay(fromDate) && transactionDate <= endOfDay(toDate);
    }
    if (fromDate) {
      return transactionDate >= startOfDay(fromDate);
    }
    if (toDate) {
      return transactionDate <= endOfDay(toDate);
    }
    return true; // If no date range is selected, include all transactions
  };

  // Filter transactions by date range
  const filteredTransactions = transactions
    .filter((transaction) => {
      const transactionDate = new Date(transaction.createAt);
      const fromDate = dateRange.from ? new Date(dateRange.from) : null;
      const toDate = dateRange.to ? new Date(dateRange.to) : null;
      return isWithinDateRange(transactionDate, fromDate, toDate);
    })
    .reverse(); // Show the latest transactions first

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const indexOfLastTransaction = currentPage * itemsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - itemsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-6 mx-auto relative z-10 mt-16">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">Transaction History</h2>

      {/* Date Filter */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-600">From</label>
          <input
            type="date"
            value={dateRange.from}
            onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
            className="p-2 rounded-lg border border-gray-300 w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">To</label>
          <input
            type="date"
            value={dateRange.to}
            onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
            className="p-2 rounded-lg border border-gray-300 w-full"
          />
        </div>
      </div>

      {/* Transaction Items */}
      {currentTransactions.length > 0 ? (
        currentTransactions.map((transaction) => (
          <div
            key={transaction._id}
            className={`flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 p-4 rounded-lg shadow-sm ${
              transaction.mode === "Debit" ? "bg-red-100" : "bg-green-100"
            }`}
          >
            <div className="w-full sm:w-auto">
              <p className="font-bold text-lg text-gray-700">{transaction.type}</p>
              <p className="text-gray-600 text-sm">{new Date(transaction.createAt).toLocaleString()}</p>
              <p className="text-gray-500 text-sm">Account: {transaction.accountnumber}</p>
            </div>

            <div className="text-right w-full sm:w-auto mt-2 sm:mt-0">
              <p
                className={`text-xl font-semibold ${
                  transaction.mode === "Debit" ? "text-red-500" : "text-green-500"
                }`}
              >
                {transaction.mode === "Debit" ? "-" : "+"}${transaction.amount}
              </p>
              <p className="text-gray-500">{transaction.user}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No transactions available for the selected date range.</p>
      )}

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="p-4 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 active:bg-gray-400"
          style={{ minWidth: '80px', zIndex: 10 }}  // Ensure the button is not overlapped
        >
          Previous
        </button>
        <div className="text-gray-700">
          Page {currentPage} of {totalPages}
        </div>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="p-4 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 active:bg-gray-400"
          style={{ minWidth: '80px', zIndex: 10 }}  // Ensure the button is not overlapped
        >
          Next
        </button>
      </div>
    </div>
  );
}
