import { Link } from "react-router-dom";
import HomeIcone from "../icons/HomeIcone";
import SearchIcon from "../icons/SearchIcon";
import NotifiIcon from "../icons/NotifiIcon";
import MsgIcon from "../icons/MsgIcon";
import CommIcon from "../icons/CommIcon";
import MoreIcon from "../icons/MoreIcon";
import ProfileIcon from "../icons/ProfileIcon";
import GrokIcon from "../icons/GrokIcon";
import PremuimIcon from "../icons/PremuimIcon";
import UserMenu from "./UserMenu";

export default function Sidebar() {
  return (
    <div className="md:drawer drawer-open ">
      <input
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked
        readOnly
      />

      <div className="drawer-side h-14 md:h-full">
        <ul className="menu fixed top md:p-4 sm:w-40 md:w-[420px] flex content-center h-full text-2xl text-base-200">
          <li>
            <img src="logo.png" alt="logo" className="w-24 h-15" />
          </li>
          <li>
            <Link className="hidden md:flex" to="/home"><HomeIcone />Home</Link>
          </li>
          <li>
            <Link className="hidden md:flex" to=""><SearchIcon />Explore</Link>
          </li>
          <li>
            <Link className="hidden md:flex" to=""><NotifiIcon />Notifications</Link>
          </li>
          <li>
            <Link className="hidden md:flex" to=""><MsgIcon />Messsages</Link>
          </li>
          <li>
            <Link className="hidden md:flex" to=""><GrokIcon /> Grok</Link>
          </li>
          <li>
            <Link className="hidden md:flex" to=""><CommIcon /> Communities</Link>
          </li>
          <li>
            <Link className="hidden md:flex" to=""><PremuimIcon /> Premuim</Link>
          </li>
          <li>
            <Link className="hidden md:flex" to="/profile"><ProfileIcon /> Profile</Link>
          </li>
          <li>
            <Link className="hidden md:flex" to=""> <MoreIcon /> More</Link>
          </li>
          <li className="md:pt-3">
            <Link
              to="/post"
              className="btn w-80  md:w-48 lg:w-64 rounded-full border-none text-white bg-primary hover:bg-sky-600 font-bold"
            >
              Post
            </Link>
          </li>
          <li className="md:pt-2">
            <UserMenu />
          </li>
        </ul>
      </div>
    </div>
  );
}
