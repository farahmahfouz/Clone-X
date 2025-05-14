import { useState } from "react";
import Joi from 'joi-browser';
import { useNavigate } from "react-router-dom";
import { signup } from "../utils/userService";
import LogoX from "../icons/LogoX";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dateOfBirth: "",
    errors: {}
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const schema = {
    name: Joi.string().required().label("Name"),
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(8).label("Password"),
    dateOfBirth: Joi.date().required().label("Date of Birth")
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (errors) return;

    try {
      setLoading(true);
      await signup(formData);
      navigate('/login');
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = e => {
    let state = { ...formData };
    state[e.target.name] = e.target.value;
    setFormData(state);
  };

  const validate = () => {
    const errors = {};
    const state = { ...formData };
    delete state.errors;
    const res = Joi.validate(state, schema, { abortEarly: false });

    if (res.error === null) {
      setFormData({ ...formData, errors: {} });
      return null;
    }

    for (let error of res.error.details) {
      errors[error.path] = error.message;
    }

    setFormData({ ...formData, errors });
    return errors;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center">
        <LogoX width={40} height={40} className="fill-white" />
      </div>
      <div className="flex justify-center">
        <div className=" items-center justify-center text-white md:flex-row lg:flex lg:justify-around w-full">

          <div className="lg:flex lg:flex-col  items-center">
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
              {formData.errors.name && <div className="text-red-500 text-[12px]">{formData.errors.name}</div>}

              <input
                onChange={handleChange}
                value={formData.email}
                name="email"
                type="email"
                placeholder="Email"
                className="input w-80 max-w-xs bg-transparent border-white/30 text-sm focus:border-primary"
                disabled={loading}
              />
              {formData.errors.email && <div className="text-red-500 text-[12px]">{formData.errors.email}</div>}

              <input
                onChange={handleChange}
                value={formData.password}
                name="password"
                type="password"
                placeholder="Password"
                className="input w-80 max-w-xs bg-transparent border-white/30 focus:border-primary"
                disabled={loading}
              />
              {formData.errors.password && <div className="text-red-500 text-[12px]">{formData.errors.password}</div>}

              <input
                onChange={handleChange}
                value={formData.dateOfBirth}
                name="dateOfBirth"
                type="date"
                className="input w-80 max-w-xs bg-transparent border-white/30 focus:border-primary"
                disabled={loading}
              />
              {formData.errors.dateOfBirth && <div className="text-red-500 text-[12px]">{formData.errors.dateOfBirth}</div>}

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