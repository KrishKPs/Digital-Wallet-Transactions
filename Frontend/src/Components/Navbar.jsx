import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LiaPaypal, LiaCogSolid } from "react-icons/lia";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";

const isAuth = () => {
  const token = localStorage.getItem('token');
  return token ? true : false;
};

export function Navbar() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile menu state

  async function getUser() {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://backend-digital-wallet.vercel.app/banking/singleuser', {
        headers: {
          'Authorization': `${token}`,
        },
      });
      setName(response.data.user.username);
      setEmail(response.data.user.email);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth()) {
      navigate('/login');
    }
  }, [navigate]);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  return (
    <>
      {/* Navbar Container */}
      <div className="bg-gray-800 h-auto md:h-screen text-white flex md:flex-col z-50 fixed w-full md:w-1/4"> {/* Adjusted z-index and fixed position */}
        {/* Hamburger menu button for mobile */}
        <button
          className="md:hidden p-4 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {/* Icon for mobile menu */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Menu (hidden on mobile unless toggled) */}
        <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:block w-full`}>
          {/* Profile Section */}
          <div className="flex flex-col items-center p-6">
            <FaUserCircle className="text-gray-300" size={64} />
            <h2 className="mt-4 text-lg font-semibold">{name || 'Name'}</h2>
            <p className="text-gray-400 text-sm">{email || "email@gmail.com"}</p>
          </div>

          {/* Main Links */}
          <div className="flex-grow">
            <div className="flex items-center p-6">
              <LiaPaypal className="text-green-500" size={34} />
              <h1 className="text-green-500 font-extrabold text-xl ml-4">Paytm Karo</h1>
            </div>

            <div className="mt-6">
              <ul className="space-y-4">
                <li className="ml-6">
                  <a onClick={() => { navigate('/dashboard') }} className="text-gray-300 hover:text-green-400 font-medium text-lg cursor-pointer transition-colors duration-300">Dashboard</a>
                </li>
                <li className="ml-6">
                  <a onClick={() => { navigate('/deposite') }} className="cursor-pointer text-gray-300 hover:text-green-400 font-medium text-lg transition-colors duration-300">Deposite Money</a>
                </li>
                <li className="ml-6">
                  <a onClick={() => { navigate('/transfermoney') }} className=" cursor-pointer text-gray-300 hover:text-green-400 font-medium text-lg transition-colors duration-300">Transfer Money</a>
                </li>
                <li className="ml-6">
                  <a onClick={() => { navigate('/usertransactions') }} className=" cursor-pointer text-gray-300 hover:text-green-400 font-medium text-lg transition-colors duration-300">User Transactions </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section with Settings */}
          <div className="p-6">
            <a
              onClick={toggleSettings}
              className="flex items-center text-gray-400 hover:text-green-400 font-medium text-sm cursor-pointer transition-colors duration-300"
            >
              <LiaCogSolid className="mr-2" size={20} />
              Settings
            </a>
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"> {/* Higher z-index for the modal */}
          <div className="bg-white rounded-lg p-8 w-96">
            <h2 className="text-xl font-bold mb-4">Profile Settings</h2>
            <ul className="space-y-4">
              <li>
                <button className="text-green-500 font-medium" onClick={() => alert('Profile Settings')}>Profile Settings</button>
              </li>
              <li>
                <button className="text-green-500 font-medium" onClick={() => navigate('/createaccount')}>Create Bank Account</button>
              </li>
              <li>
                <button className="text-green-500 font-medium" onClick={() => alert('Other Settings')}>Other Settings</button>
              </li>
            </ul>
            <button
              className="mt-6 text-red-500 font-medium"
              onClick={toggleSettings}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
