import { Link } from "react-router-dom";

export default function Logout() {
  return (
    <div className="bg-black grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 ">
      <div className="flex justify-center bg-black md:h-screen">
        <div className=" bg-black items-center justify-center p-10  text-white md:flex-row lg:flex lg:justify-between w-10/12">
          <div>
            <img className="max-w-full" src="logo.jpeg" alt="logo" />
          </div>

          <div className="lg:flex lg:flex-col  bg-black items-center">
            <div className="prose lg:prose-xl mb-8 text-center ">
              <h1 className="text-6xl font-bold">Happening now</h1>
              <h5 className="text-4xl font-semibold pt-5">Join today.</h5>
            </div>

            <div className="flex flex-col gap-3 mb-8 w-full md:w-48 lg:w-48">
              <button className="btn rounded-full w-full md:w-48 lg:w-48">
                Sign up with Google
              </button>
              <button className="btn rounded-full w-full md:w-48 lg:w-48">
                Sign up with Apple
              </button>
              <hr className="border-t border-gray-500 w-full" />
              <Link
                to="/signup"
                className="btn w-full md:w-48 lg:w-48 rounded-full border-none text-white bg-sky-500 hover:bg-sky-600 font-bold"
              >
                Create account
              </Link>
            </div>

            <div className="text-center">
              <p className="pb-7 text-sm">
                By signing up, you agree to the
                <Link to="#" className="text-sky-600">
                  {" "}
                  Terms of Service{" "}
                </Link>{" "}
                and
                <Link to="#" className="text-sky-600">
                  {" "}
                  Privacy Policy
                </Link>
                , including
                <Link to="#" className="text-sky-600">
                  {" "}
                  Cookie Use.
                </Link>
              </p>
              <p className="pb-3">Already have account?</p>
              <Link
                to="/login"
                className="btn w-full md:w-48 lg:w-48 rounded-full border-white text-sky-500 bg-transparent hover:bg-sky-950  font-bold"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
