import { Navbar } from "../Components/Navbar";
import { TransferUser } from "../Components/Transferuser";

export function TransfertoUser() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen overflow-hidden">
      {/* Navbar */}
      <div className="w-full md:w-1/6 h-screen bg-gray-800 fixed top-0 left-0 z-50">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="w-full md:ml-[16.67%] p-4 md:p-10 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <TransferUser />
        </div>
      </div>
    </div>
  );
}
