import axios from "axios";
import { TransactionsCard } from "../Components/Transactions";
import { useEffect, useState } from "react";
import { Navbar } from "../Components/Navbar";

export function UserTransactions() {
  const [data, setData] = useState([]);

  const getUserTransactions = async () => {
    const token = localStorage.getItem("token");

    const response = await axios.get("https://backend-digital-wallet.vercel.app/banking/usertransactions", {
      headers: {
        Authorization: `${token}`,
      },
    });

    const datas = response.data;
    console.log(datas);
    setData(datas.transactions);
  };

  useEffect(() => {
    getUserTransactions();
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Navbar */}
      <div className="w-full md:w-1/4 h-auto md:h-screen bg-gray-800 z-50">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="w-full md:w-3/4 p-4 md:p-10 bg-gray-100">
        <TransactionsCard transactions={data} />
      </div>
    </div>
  );
}
