import { useEffect, useState } from "react";
import { BalanceCard } from "../Components/Balancecard";
import { Navbar } from "../Components/Navbar";
import axios from "axios";
import { CreateBankAccount } from "../Components/Createaccount";

export function DashBoard() {
  const [savings, setSavings] = useState(0);
  const [current, setCurrent] = useState(0);
  const [showS, setShowS] = useState(false);
  const [showC, setShowC] = useState(false);

  const createacc = !showC && !showS;  

  const getBalance = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.get('https://backend-digital-wallet.vercel.app/banking/getaccount', {
        headers: {
          Authorization: `${token}`,
        },
      });

      const data = response.data;

      if (data.Savings) {
        setSavings(data.Savings.balance);
        setShowS(true);
      }

      if (data.Current) {
        setCurrent(data.Current.balance);
        setShowC(true);
      }
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  useEffect(() => {
    getBalance();
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <div className="bg-gray-800 w-full md:w-1/4 h-auto">
        <Navbar />
      </div>



     { createacc && (
        <div className="w-full md:w-3/4 ml-auto p-10">
        <CreateBankAccount/> 
        </div>  
     )}

      {/* Main Content */}
      <div className="flex flex-col items-center justify-start w-96 md:w-3/4 p-10 space-y-10">
        {/* Cards */}
        {showS && (
          <div className="w-full md:w-2/3">
            <BalanceCard data={savings} account={"Savings"} />
          </div>
        )}
        {showC && (
          <div className="w-full md:w-2/3">
            <BalanceCard data={current} account={"Checking"} />
          </div>
        )}
      </div>
    </div>
  );
}
