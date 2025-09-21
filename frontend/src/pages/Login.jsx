import { useState } from "react";
import AuthCard from "../components/AuthCard";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { email, password } = loginForm;

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const onChange = (e) => {
    setLoginForm((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  return (
    <div className="flex flex-col  justify-center items-center mt-4 p-5">
      <div>
        <h1 className="font-medium  text-[25px] leading-none text-center">
          Connect & Collaborate
        </h1>
        <p className="text-center mt-5 text-gray-600">
          Streamline your workflow with our productivity suite <br /> designed
          for modern teams.
        </p>
        <div className="min-h-screen ">
          <AuthCard
            title="Welcome back"
            subTitle="Sign in to your account to continue"
            width="100"
          >
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 text-[13px] font-medium "
            >
              <div className="flex flex-col gap-1">
                <label>Email </label>
                <input
                  className="h-9 w-full bg-gray-100 rounded-md text-gray-900 focus:outline-none px-3 py-2 border border-transparent  focus:border-gray-300 focus:ring-2 focus:ring-[#030213]/20 "
                  type="email"
                  id="email"
                  value={email}
                  placeholder="Enter your email"
                  onChange={onChange}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label>Password</label>
                <input
                  className="h-9 w-full bg-gray-100 rounded-md text-gray-900 focus:outline-none px-3 py-2 border border-transparent  focus:border-gray-300 focus:ring-2 focus:ring-[#030213]/20 "
                  type="password"
                  id="password"
                  value={password}
                  placeholder="Create a password"
                  onChange={onChange}
                  required
                />
              </div>

              <button className="bg-black w-full h-11 rounded-md text-white px-3 py-2 text-center">
                Sign In
              </button>
              <p className=" text-center text-[#717182] ">
                Don't have an account?
                <Link
                  className="font-medium text-black hover:underline p-3"
                  to="/signup"
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
