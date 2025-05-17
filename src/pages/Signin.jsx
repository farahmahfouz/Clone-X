import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./../auth/Auth";
import { login as userLogin } from '../utils/userService';
import LogoX from "../icons/LogoX";

export default function Signin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  
  const { loading, error, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? "" : "Invalid email format";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 8) return "Password must be at least 8 characters long";
    if (password.length > 16) return "Password must be at most 16 characters long";
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,20}$/;
    return passwordRegex.test(password) 
      ? "" 
      : "Password must contain at least one uppercase letter, one lowercase letter, one number";
  };

  const validate = () => {
    const newErrors = {};
    
    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;
    
    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    
    const isValid = validate();
    if (!isValid) return;

    try {
      const response = await userLogin({
        email: formData.email,
        password: formData.password,
      });
      
      const token =  response?.data?.accessToken;

      if (token) {
        login(token);
        navigate("/home", { replace: true });
      } else {
        setErrorMessage("No token received from server.");
      }
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center">
        <LogoX />
      </div>
      <h5 className="text-4xl font-semibold py-6 text-center text-white">Sign in to X.</h5>
      <div className="flex justify-center">
        <div className="items-center justify-center text-white">
          <div className="items-center">
            <div className="flex mb-4 flex-col gap-3 items-center">
              <input
                onChange={handleChange}
                value={formData.email}
                name="email"
                type="email"
                placeholder="Email"
                className="input w-80 max-w-xs bg-transparent border-white/30 focus:border-primary"
                disabled={loading}
              />
              {errors.email && (
                <div className="text-red-500 text-[12px]">
                  {errors.email}
                </div>
              )}
              <input
                onChange={handleChange}
                value={formData.password}
                name="password"
                type="password"
                placeholder="Password"
                className="input w-80 max-w-xs bg-transparent border-white/30 focus:border-primary"
                disabled={loading}
              />
              {errors.password && (
                <div className="text-red-500 text-[12px]">
                  {errors.password}
                </div>
              )}
              <hr className="border-t border-white/30 w-80" />
            </div>

            {(errorMessage || error) && (
              <div className="text-red-500 mb-4 text-center">
                {errorMessage || error}
              </div>
            )}

            <div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="btn w-full md:w-48 lg:w-80 rounded-full border-white/30 text-primary bg-transparent hover:bg-sky-950 font-bold"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="loading loading-spinner loading-sm"></span>
                      Signing in...
                    </span>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </div>
              <p className="text-sm py-2 text-white/70 text-center">
                Dont have an account?{" "}
                <span className="text-primary">Sign Up</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}