import { Link } from "react-router-dom";
import { useState } from "react";
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
import PropTypes from 'prop-types';
import AddPost from "./AddPost";
import LogoX from "../icons/LogoX";

export default function Sidebar({ onPostAdded }) {
  const [showAddPost, setShowAddPost] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleAddPostSuccess = () => {
    setShowAddPost(false);
    if (onPostAdded) {
      onPostAdded();
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="flex md:hidden justify-between items-center p-4 border-b border-gray-800">
        <button onClick={toggleMobileMenu} className="focus:outline-none">
          <LogoX width={40} height={40} />
        </button>
        <div className="flex items-center gap-2">
          <UserMenu />
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`drawer ${mobileMenuOpen ? 'drawer-open' : ''}`}>
        <input
          id="sidebar-drawer"
          type="checkbox"
          className="drawer-toggle"
          checked={mobileMenuOpen}
          onChange={toggleMobileMenu}
        />
        
        <div className="drawer-side z-20 ">
          <label htmlFor="sidebar-drawer" className="drawer-overlay" onClick={toggleMobileMenu}></label>
          <div className="menu p-4 w-80 min-h-full bg-black text-white">
            {/* Mobile Close Button */}
            {/* <div className="flex justify-between items-center mb-4 md:hidden">
              <LogoX width={40} height={40} />
              <button onClick={toggleMobileMenu} className="btn btn-sm btn-circle">
                ✕
              </button>
            </div> */}
            
            <ul className="text-2xl text-base-200">
              <li className="hidden md:block">
                <Link to="/home">
                  <LogoX width={70} height={70} />
                </Link>
              </li>
              <li>
                <Link 
                  className="flex focus:font-bold focus:text-white active:rounded-3xl hover:bg-zinc-900 rounded-3xl" 
                  to="/home"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <HomeIcone />Home
                </Link>
              </li>
              <li>
                <Link 
                  className="flex focus:font-bold focus:text-white active:rounded-3xl hover:bg-zinc-900 rounded-3xl"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <SearchIcon />Explore
                </Link>
              </li>
              <li>
                <Link 
                  className="flex focus:font-bold focus:text-white active:rounded-3xl hover:bg-zinc-900 rounded-3xl"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <NotifiIcon />Notifications
                </Link>
              </li>
              <li>
                <Link 
                  className="flex focus:font-bold focus:text-white active:rounded-3xl hover:bg-zinc-900 rounded-3xl"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <MsgIcon />Messsages
                </Link>
              </li>
              <li>
                <Link 
                  className="flex focus:font-bold focus:text-white active:rounded-3xl hover:bg-zinc-900 rounded-3xl"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <GrokIcon /> Grok
                </Link>
              </li>
              <li>
                <Link 
                  className="flex focus:font-bold focus:text-white active:rounded-3xl hover:bg-zinc-900 rounded-3xl"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <CommIcon /> Communities
                </Link>
              </li>
              <li>
                <Link 
                  className="flex focus:font-bold focus:text-white active:rounded-3xl hover:bg-zinc-900 rounded-3xl"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <PremuimIcon /> Premuim
                </Link>
              </li>
              <li>
                <Link 
                  className="flex focus:font-bold focus:text-white active:rounded-3xl hover:bg-zinc-900 rounded-3xl" 
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <ProfileIcon /> Profile
                </Link>
              </li>
              <li>
                <Link 
                  className="flex focus:font-bold focus:text-white active:rounded-3xl hover:bg-zinc-900 rounded-3xl"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <MoreIcon /> More
                </Link>
              </li>
              <li className="pt-3">
                <button
                  onClick={() => {
                    setShowAddPost(true);
                    setMobileMenuOpen(false);
                  }}
                  className="btn w-full rounded-full border-none text-white bg-primary hover:bg-sky-600 font-bold"
                >
                  Post
                </button>
              </li>
              <li className="md:hidden pt-2">
                <UserMenu />
              </li>
            </ul>
          </div>
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden md:block h-full">
          <ul className="menu fixed top p-4 w-[420px] flex content-end h-full text-2xl text-base-200">
            <li>
              <Link to="/home">
                <LogoX width={70} height={70} />
              </Link>
            </li>
            <li>
              <Link className="focus:font-bold focus:text-white active:rounded-3xl hover:bg-zinc-900 rounded-3xl" to="/home">
                <HomeIcone />Home
              </Link>
            </li>
            <li>
              <Link className="focus:font-bold focus:text-white active:rounded-3xl hover:bg-zinc-900 rounded-3xl">
                <SearchIcon />Explore
              </Link>
            </li>
            <li>
              <Link className="focus:font-bold focus:text-white active:rounded-3xl hover:bg-zinc-900 rounded-3xl">
                <NotifiIcon />Notifications
              </Link>
            </li>
            <li>
              <Link className="focus:font-bold focus:text-white active:rounded-3xl hover:bg-zinc-900 rounded-3xl">
                <MsgIcon />Messsages
              </Link>
            </li>
            <li>
              <Link className="focus:font-bold focus:text-white active:rounded-3xl hover:bg-zinc-900 rounded-3xl">
                <GrokIcon /> Grok
              </Link>
            </li>
            <li>
              <Link className="focus:font-bold focus:text-white active:rounded-3xl hover:bg-zinc-900 rounded-3xl">
                <CommIcon /> Communities
              </Link>
            </li>
            <li>
              <Link className="focus:font-bold focus:text-white active:rounded-3xl hover:bg-zinc-900 rounded-3xl">
                <PremuimIcon /> Premuim
              </Link>
            </li>
            <li>
              <Link className="focus:font-bold focus:text-white active:rounded-3xl hover:bg-zinc-900 rounded-3xl" to="/profile">
                <ProfileIcon /> Profile
              </Link>
            </li>
            <li>
              <Link className="focus:font-bold focus:text-white active:rounded-3xl hover:bg-zinc-900 rounded-3xl"> 
                <MoreIcon /> More
              </Link>
            </li>
            <li className="pt-3">
              <button
                onClick={() => setShowAddPost(true)}
                className="btn w-48 lg:w-64 rounded-full border-none text-white bg-primary hover:bg-sky-600 font-bold"
              >
                Post
              </button>
            </li>
            <li className="pt-2">
              <UserMenu />
            </li>
          </ul>
        </div>
      </div>

      {showAddPost && (
        <AddPost
          onClose={() => setShowAddPost(false)}
          onSuccess={handleAddPostSuccess}
        />
      )}
    </>
  );
}

Sidebar.propTypes = {
  onPostAdded: PropTypes.func
};