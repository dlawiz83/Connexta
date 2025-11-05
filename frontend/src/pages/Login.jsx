import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthCard from "../components/AuthCard";

function Login() {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { email, password } = loginForm;

  const onChange = (e) => {
    setLoginForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const res = await fetch("https://connexta.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Login failed");

      localStorage.setItem("token", data.token);
      navigate("/"); // redirect after login
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-4 p-5">
      <div>
        <h1 className="font-medium text-[25px] leading-none text-center">
          Connect & Collaborate
        </h1>
        <p className="text-center mt-5 text-gray-600">
          Streamline your workflow with our productivity suite <br /> designed
          for modern teams.
        </p>

        <div className="min-h-screen">
          <AuthCard
            title="Welcome back"
            subTitle="Sign in to your account to continue"
            width="100"
          >
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 text-[13px] font-medium"
            >
              <div className="flex flex-col gap-1">
                <label>Email</label>
                <input
                  className="h-9 w-full bg-gray-100 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#030213]/20"
                  type="email"
                  id="email"
                  value={email}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label>Password</label>
                <input
                  className="h-9 w-full bg-gray-100 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#030213]/20"
                  type="password"
                  id="password"
                  value={password}
                  onChange={onChange}
                  required
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <button
                disabled={loading}
                className="bg-black w-full h-11 rounded-md text-white px-3 py-2 text-center"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>

              <p className="text-center text-[#717182]">
                Don’t have an account?
                <Link
                  to="/signup"
                  className="font-medium text-black hover:underline p-3"
                >
                  Sign Up
                </Link>
              </p>
            </form>
          </AuthCard>
        </div>
      </div>
    </div>
  );
}

export default Login;
