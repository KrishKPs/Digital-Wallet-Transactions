import { useNavigate } from "react-router-dom";

export function UserCard({ data }) {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("Button clicked, data:", data); // Check if the event is firing
    if (data && data._id) {
      navigate(`/sendmoney/${data._id}`);
    } else {
      console.error("data._id is undefined, cannot navigate");
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm relative z-10">
      {/* Profile Picture with Initials */}
      <div className="flex items-center space-x-4 mb-4">
        <div className="bg-gray-300 flex items-center justify-center rounded-full h-12 w-12 text-xl font-bold text-gray-700">
          {data.username ? data.username.charAt(0) : "U"}
        </div>
        <div>
          <h1 className="text-lg font-bold text-gray-800">
            {data.username || "User Name"}
          </h1>
          <p className="text-gray-500 text-sm">
            {data.email || "user@example.com"}
          </p>
        </div>
      </div>

      {/* Send Money Button */}
      <button
        onClick={handleClick}
        role="button" // Ensure it's recognized as a button
        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 w-full rounded-lg font-semibold transition duration-300"
      >
        Send Money
      </button>
    </div>
  );
}
