import axios from "axios";
import { UserCard } from "../Components/UsersCard";
import { useEffect, useState } from "react";
import { Navbar } from "../Components/Navbar";

export function TransferMoneyCard() {
  const [data, setData] = useState([]);

  const Users = async () => {
    const token = localStorage.getItem('token');

    const response = await axios.get('https://backend-digital-wallet.vercel.app/banking/users', {
      headers: {
        Authorization: `${token}`,
      },
    });

    setData(response.data.users);
  };

  useEffect(() => {
    Users();
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen overflow-x-hidden">
      <div className="w-full md:w-1/4 fixed top-0 left-0 h-screen">
        <Navbar />
      </div>

      <div className="w-full md:ml-auto p-4 md:p-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-auto max-h-screen">
          {data.map((user, index) => (
            <UserCard key={index} data={user} />
          ))}
        </div>
      </div>
    </div>
  );
}
