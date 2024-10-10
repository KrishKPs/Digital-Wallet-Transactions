import { CreateBankAccount } from "../Components/Createaccount";
import { DepositMoneyCard } from "../Components/Depositemoneycard";
import { Navbar } from "../Components/Navbar";

export function AccountCreate() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen overflow-x-hidden">
      {/* Navbar */}
      <div className="w-full md:w-1/4 h-auto md:h-screen fixed md:static top-0 left-0">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="w-full md:w-3/4 ml-0 md:ml-auto p-4 md:p-10 mt-36">
        <DepositMoneyCard />
      </div>
    </div>
  );
}
