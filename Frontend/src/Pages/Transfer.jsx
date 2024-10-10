import axios from "axios";
import { UserCard } from "../Components/UsersCard";
import { useEffect, useState } from "react";
import { Navbar } from "../Components/Navbar";

export function Transfer() {
  const [data, setData] = useState([]);

  const Users = async () => {
    const token = localStorage.getItem('token');

    const response = await axios.get('https://backend-digital-wallet.vercel.app/banking/users', {
      headers: {
        Authorization: `${token}`,
      },
    });

    console.log(response.data.users);
    setData(response.data.users);
  };

  useEffect(() => {
    Users();
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Navbar */}
      <div className="w-full md:w-1/4 h-auto md:h-screen bg-gray-800 ">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="w-full  mt-10 md:w-3/4 p-4 md:p-10 bg-gray-100 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((user, index) => (
            <UserCard key={index} data={user} />
          ))}
        </div>

        {/* Test Button */}
       
      </div>
    </div>
  );
}
