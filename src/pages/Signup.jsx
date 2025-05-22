import { useState } from "react";
import { signup } from "../utils/userService";
import LogoX from "../icons/LogoX";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dateOfBirth: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const validateName = (name) => {
    if (!name) {
    return "Name is required";
  }
  if (name.length < 10) {
    return "Name must be at least 10 characters";
  }
  if (name.length > 15) {
    return "Name must be at most 15 characters";
  }
  return ""; 
  };

  const validateEmail = (email) => {
    if (!email) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? "" : "Invalid email format";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 8) return "Pass must be at least 8 characters";
    return "";
  };

  const validateDateOfBirth = (date) => {
    if (!date) return "Date of Birth is required";
    const selectedDate = new Date(date);
    const today = new Date();
    
    if (isNaN(selectedDate.getTime())) return "Invalid date";
    if (selectedDate > today) return "Date of Birth cannot be in the future";
    
    return "";
  };

  const validate = () => {
    const newErrors = {};
    
    const nameError = validateName(formData.name);
    if (nameError) newErrors.name = nameError;
    
    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;
    
    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;
    
    const dateOfBirthError = validateDateOfBirth(formData.dateOfBirth);
    if (dateOfBirthError) newErrors.dateOfBirth = dateOfBirthError;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    
    const isValid = validate();
    if (!isValid) return;

    try {
      setLoading(true);
      await signup(formData);
      document.getElementById('signin_modal').showModal();
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
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
        <LogoX width={40} height={40} className="fill-white" />
      </div>
      <div className="flex justify-center">
        <div className="items-center justify-center text-white md:flex-row lg:flex lg:justify-around w-full">

          <div className="lg:flex lg:flex-col items-center">
            <div className="prose lg:prose-xl mb-8 text-center">
              <h5 className="text-4xl font-semibold text-start py-4">Create your account.</h5>
            </div>

            <div className="flex flex-col items-center m-auto gap-3 mb-8 w-full md:w-48 lg:w-48">
              <input
                onChange={handleChange}
                value={formData.name}
                name="name"
                type="text"
                placeholder="Name"
                className="input w-80 max-w-xs bg-transparent border-white/30 text-sm focus:border-primary"
                disabled={loading}
              />
              {errors.name && <div className="text-red-500 text-[11px] w-full">{errors.name}</div>}

              <input
                onChange={handleChange}
                value={formData.email}
                name="email"
                type="email"
                placeholder="Email"
                className="input w-80 max-w-xs bg-transparent border-white/30 text-sm focus:border-primary"
                disabled={loading}
              />
              {errors.email && <div className="text-red-500 text-[12px]">{errors.email}</div>}

              <input
                onChange={handleChange}
                value={formData.password}
                name="password"
                type="password"
                placeholder="Password"
                className="input w-80 max-w-xs bg-transparent border-white/30 focus:border-primary"
                disabled={loading}
              />
              {errors.password && <div className="text-red-500 text-[12px]">{errors.password}</div>}

              <input
                onChange={handleChange}
                value={formData.dateOfBirth}
                name="dateOfBirth"
                type="date"
                className="input w-80 max-w-xs bg-transparent border-white/30 focus:border-primary"
                disabled={loading}
              />
              {errors.dateOfBirth && <div className="text-red-500 text-[12px]">{errors.dateOfBirth}</div>}

              <hr className="border-t border-white/30 w-80" />
            </div>

            {errorMessage && (
              <div className="text-red-500 mb-4 text-center">{errorMessage}</div>
            )}

            <div className="text-center md:text-left lg:text-left">
              <p className="pb-3 flex justify-center">
                Already have account?

                <span className="text-sky-600 text-sm ps-1">Login</span>
              </p>
              <div className="flex justify-center">
                <button
                  className="btn rounded-full w-full md:w-48 lg:w-80"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Next"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}