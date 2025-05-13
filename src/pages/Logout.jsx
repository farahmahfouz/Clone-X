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

            <div className="flex flex-col items-start gap-3 mb-8 w-full md:w-48 lg:w-48 ">
              <button className="btn rounded-full w-full md:w-48 lg:w-72 bg-white">
                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                Signup with Google
              </button>
              <button className="btn bg-white text-black rounded-full w-full md:w-48 lg:w-72">
                <svg aria-label="Apple logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1195 1195"><path fill="black" d="M1006.933 812.8c-32 153.6-115.2 211.2-147.2 249.6-32 25.6-121.6 25.6-153.6 6.4-38.4-25.6-134.4-25.6-166.4 0-44.8 32-115.2 19.2-128 12.8-256-179.2-352-716.8 12.8-774.4 64-12.8 134.4 32 134.4 32 51.2 25.6 70.4 12.8 115.2-6.4 96-44.8 243.2-44.8 313.6 76.8-147.2 96-153.6 294.4 19.2 403.2zM802.133 64c12.8 70.4-64 224-204.8 230.4-12.8-38.4 32-217.6 204.8-230.4z"></path></svg>
                Signup with Apple
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
      <dialog id="signup_modal" className="modal backdrop-blur backdrop:bg-gray-800/60">
        <div className="modal-box bg-black">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white">✕</button>
          </form>
          <Signup />
        </div>
      </dialog>

      {/* Signin Modal */}
      <dialog id="signin_modal" className="modal backdrop-blur backdrop:bg-gray-800/60">
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
