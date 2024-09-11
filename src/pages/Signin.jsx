import { useContext, useState } from "react";
import axios from "axios";
import Joi from "joi-browser";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./../auth/Auth";

export default function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    errors: {},
  });

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(8).label("Password"),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    const errors = validate();
    if (errors) return;
    try {
      const response = await axios.post("https://clone-x-by-farah.glitch.me/users/login", {
        email: formData.email,
        password: formData.password,
      });
      console.log(response);
      if (response) {
        const token = response.data.data.token;
        console.log(token);
        login(token);
        navigate("/home");
      } else {
        setErrorMessage(
          response.data.message || "Login failed. Please try again."
        );
      }
    } catch (error) {
      setErrorMessage(
        error.response ? error.response.data.message : error.message
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
      setFormData({ errors: {} });
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
      className="bg-black h-screen grid grid-cols-1"
    >
      <div className="flex justify-center">
        <div className="bg-black items-center justify-center p-10 text-white md:flex-row lg:flex lg:justify-around w-full">
          <div className="flex justify-center">
            <img className="max-w-full" src="logo.jpeg" alt="logo" />
          </div>

          <div className="lg:flex lg:flex-col bg-black items-center">
            <div className="prose lg:prose-xl mb-8 text-center">
              <h5 className="text-4xl font-semibold pt-5">Sign in to X.</h5>
            </div>

            <div className="flex flex-col gap-3 mb-8 w-full md:w-48 lg:w-48">
              <input
                onChange={handleChange}
                value={formData.email}
                name="email"
                type="email"
                placeholder="Email"
                className="input input-bordered w-full max-w-xs bg-transparent border-white focus:border-white"
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
                className="input input-bordered w-full max-w-xs bg-transparent border-white focus:border-white"
              />
              {formData.errors.password && (
                <div className="text-red-500 text-[12px]">
                  {formData.errors.password}
                </div>
              )}
              <hr className="border-t border-gray-500 w-full" />
            </div>
            {errorMessage && (
              <div className="text-red-500 mb-4">{errorMessage}</div>
            )}

            <div className="text-center md:text-left lg:text-left">
              <p className="pb-3">
                Dont have an account?{" "}
                <Link to={"/signup"} className="text-sky-600 text-sm ps-1">
                  Sign Up
                </Link>
              </p>
              <button className="btn rounded-full w-full md:w-48 lg:w-48">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
