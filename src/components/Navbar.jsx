import { useContext } from "react";
import { AuthContext } from "./../auth/Auth";

export default function Navbar() {
  const { logout } = useContext(AuthContext);

  const onSubmit = () => {
    logout();
  };

  return (
    <div className="navbar flex sticky top-0 bg-black">
      <div className="flex-1">
        <a className="btn bg-black border-none hover:bg-transparent">
          <img className="w-10 h-10" src="logo.jpeg" alt="" />
        </a>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered rounded-3xl border border-gray-800 focus:border-white bg-black w-24 md:w-auto"
          />
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-black text-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a onClick={onSubmit}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
