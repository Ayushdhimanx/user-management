import { useNavigate } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 text-center">

      {/* BIG 404 */}
      <h1 className="text-7xl md:text-9xl font-bold text-blue-600">404</h1>

      {/* MESSAGE */}
      <h2 className="text-xl md:text-2xl font-semibold mt-4">
        Oops! Page not found
      </h2>

      <p className="text-gray-500 mt-2 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>

      {/* BUTTONS */}
      <div className="flex gap-3 mt-6 flex-wrap justify-center">
        
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
        >
          <ArrowLeft size={16} />
          Go Back
        </button>

        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          <Home size={16} />
          Go Home
        </button>

      </div>

    </div>
  );
}

export default NotFound;