import { useContext, useState } from "react";
import Joi from "joi-browser";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./../auth/Auth";
import { login as userLogin } from '../utils/userService'
import LogoX from "../icons/LogoX";

export default function Signin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    errors: {},
  });

  const { loading, error, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(8).label("Password"),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (errors) return;

    try {
      const response = await userLogin({
        email: formData.email,
        password: formData.password,
      });
      const token = response.token || response.data?.token || response.data?.accessToken;

      if (token) {
        login(token);
        navigate("/home");
      } else {
        setErrorMessage("No token received from server.");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  const handleChange = (e) => {
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
    setFormData((prevState) => ({ ...prevState, errors }));
    return errors;
  };

  return (
    <form
      onSubmit={handleSubmit}
    >
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
              {formData.errors.email && (
                <div className="text-red-500 text-[12px]">
                  {formData.errors.email}
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
              {formData.errors.password && (
                <div className="text-red-500 text-[12px]">
                  {formData.errors.password}
                </div>
              )}
              <hr className="border-t border-white/30 w-80" />
            </div>

            {(errorMessage || error) && (
              <div className="text-red-500 mb-4 text-center">
                {errorMessage || error}
              </div>
            )}

            <div className="">
              <div className="flex justify-center">
                <button
                  className="btn w-full md:w-48 lg:w-80 rounded-full border-white/30 text-primary bg-transparent hover:bg-sky-950 font-bold"
                  onClick={() => document.getElementById('signin_modal').showModal()}
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
