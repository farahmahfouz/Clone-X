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

export default function Sidebar() {
  return (
    <div className="md:drawer drawer-open">
      <input
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked
        readOnly
      />
        {/* <Outlet /> */}
      {/* <div className="drawer-content">
      </div> */}
      <div className="drawer-side  h-14 md:h-full">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu md:p-4 sm:w-40 md:w-[450px] flex content-center h-full bg-dark text-2xl text-base-200">
          <li>
            <Link className="hidden md:flex" to=""><HomeIcone/>Home</Link>
          </li>
          <li>
            <Link className="hidden md:flex" to=""><SearchIcon/>Explore</Link>
          </li>
          <li>
            <Link className="hidden md:flex" to=""><NotifiIcon/>Notifications</Link>
          </li>
          <li>
            <Link className="hidden md:flex" to=""><MsgIcon/>Messsages</Link>
          </li>
          <li>
            <Link className="hidden md:flex" to=""><GrokIcon/> Grok</Link>
          </li>
          <li>
            <Link className="hidden md:flex" to=""><CommIcon/> Communities</Link>
          </li>
          <li>
            <Link className="hidden md:flex" to=""><PremuimIcon/> Premuim</Link>
          </li>
          <li>
            <Link className="hidden md:flex" to=""><ProfileIcon/> Profile</Link>
          </li>
          <li>
            <Link className="hidden md:flex" to=""> <MoreIcon/> More</Link>
          </li>
          <li className="md:pt-3">
            <Link
              to="/post"
              className="btn w-80  md:w-48 lg:w-48 rounded-full border-none text-white bg-sky-500 hover:bg-sky-600 font-bold"
            >
              Post
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
