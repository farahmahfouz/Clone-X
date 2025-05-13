import { Link } from "react-router-dom";
import LogoX from "../icons/LogoX";
import Signup from "./Signup";
import Signin from "./Signin";

export default function Logout() {
  return (
    <div className="bg-black grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 ">
      <div className="flex justify-center bg-black  md:h-screen">
        <div className=" bg-black items-center justify-center p-10  text-white md:flex-row lg:flex lg:justify-between w-10/12">
          <div>
            <LogoX width={370} height={370} />
          </div>

          <div className="lg:flex lg:flex-col bg-black ">
            <div className="prose lg:prose-xl mb-8 text-center ">
              <h1 className="text-7xl font-extrabold font-helvetica">Happening now</h1>
              <h5 className="text-4xl font-semibold pt-12 font-helvetica text-start">Join today.</h5>
            </div>

            <div className="flex flex-col items-start gap-3 mb-8 w-full md:w-48 lg:w-48">
              <button className="btn rounded-full w-full md:w-48 lg:w-72" onClick={() => document.getElementById('signup_modal').showModal()}>
                Sign up with Google
              </button>
              <button className="btn rounded-full w-full md:w-48 lg:w-72" onClick={() => document.getElementById('signup_modal').showModal()}>
                Sign up with Apple
              </button>
              <hr className="border-t border-gray-500 w-72" />
              <button
                className="btn w-full md:w-48 lg:w-72 rounded-full border-none text-white bg-primary hover:bg-sky-600 font-bold"
                onClick={() => document.getElementById('signup_modal').showModal()}
              >
                Create account
              </button>
            </div>

            <div className="text-start text-white/50">
              <p className="text-xs">
                By signing up, you agree to the
                <Link to="#" className="text-primary">
                  {" "}
                  Terms of Service{" "}
                </Link>{" "}
                and
              </p>
              <p className="text-xs pb-7">
                <Link to="#" className="text-primary">
                  {" "}
                  Privacy Policy
                </Link>
                , including
                <Link to="#" className="text-primary">
                  {" "}
                  Cookie Use.
                </Link>
              </p>
              <p className="pb-3 text-white font-bold tracking-wide">Already have account?</p>
              <button
                className="btn w-full md:w-48 lg:w-72 rounded-full border-white text-sky-500 bg-transparent hover:bg-sky-950  font-bold"
                onClick={() => document.getElementById('signin_modal').showModal()}
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Signup Modal */}
      <dialog id="signup_modal" className="modal">
        <div className="modal-box bg-black">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white">✕</button>
          </form>
          <Signup />
        </div>
      </dialog>

      {/* Signin Modal */}
      <dialog id="signin_modal" className="modal">
        <div className="modal-box bg-black">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white">✕</button>
          </form>
          <Signin />
        </div>
      </dialog>
    </div>
  );
}
