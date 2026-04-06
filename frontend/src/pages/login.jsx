import { useState } from "react";
import { postdata,loginApi } from "../api/postdata";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    if (isLogin) {
      const logindata = { email, password };
      const res = await loginApi(logindata);

      
  if (res.success) {
    localStorage.setItem("token", res.token);
    navigate("/dashboard");
 
  } else {
    setError(res.message || "Login failed");
  }
        


    } else {
      const registerdata = { name, email, password };

      await postdata(registerdata);


      setIsLogin(true);
    }

  } catch (err) {
    setError(err.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">

      <div className="bg-white rounded-2xl shadow-2xl w-[350px] p-6 transition-all duration-500">

   
        <h2 className="text-2xl font-bold text-center mb-4">
          {isLogin ? "Login" : "Register"}
        </h2>


        {error && (
          <p className="bg-red-100 text-red-600 p-2 rounded text-sm mb-3 text-center">
            {error}
          </p>
        )}

        {/*  FORM */}
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>

          {!isLogin && (
            <input
              type="text"
              placeholder="Name"
               value={name}
  onChange={(e) => setName(e.target.value)}
              className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          )}

          {/* 📧 EMAIL WITH ICON */}
          <div className="flex items-center border rounded px-2">
            <span>📧</span>
            <input
              type="email"
              placeholder="Email"
               value={email}
  onChange={(e) => setEmail(e.target.value)}
              className="p-3 w-full outline-none"
            />
          </div>

          {/* 🔒 PASSWORD WITH ICON + TOGGLE */}
          <div className="flex items-center border rounded px-2">
            <span>🔒</span>
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
               value={password}
  onChange={(e) => setPassword(e.target.value)}
              className="p-3 w-full outline-none"
            />
            <span
              onClick={() => setShowPass(!showPass)}
              className="cursor-pointer"
            >
              {showPass ? "🙈" : "👁"}
            </span>
          </div>

          {/*  BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`p-3 rounded text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading
              ? "Please wait..."
              : isLogin
              ? "Login"
              : "Register"}
          </button>
        </form>

        {/*  TOGGLE */}
        <p className="text-center mt-4 text-sm">
          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}

          <span
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
            className="text-blue-600 cursor-pointer ml-2 font-semibold"
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;