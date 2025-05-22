import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../auth/Auth";

export default function UserMenu() {
    const { logout, user } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);


    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative p-0 rounded-full hover:bg-zinc-900 transition-colors" ref={menuRef}>
            <div>
                <img
                    src={user?.image || '/default.jpg'}
                    alt={user?.name}
                    className="w-10 h-10 rounded-full object-cover border border-gray ms-2"
                />
            </div>

            <div className="flex flex-col">
                <div className="flex justify-between">

                    <p className="hidden md:flex text-base text-white  items-center max-w-[120px] truncate mt-2 capitalize">{user?.name || "User"}</p>
                    <button
                        className="mx-4  rounded-full focus:outline-none "
                        onClick={() => setOpen((v) => !v)}
                        aria-label="Open menu"
                    >
                        <span className="text-lg text-white">&#8230;</span>
                    </button>
                </div>
                <p className="hidden md:block text-sm text-white/50 font-thin mb-2 max-w-[120px] truncate">@{user?.email?.split('@')[0] || "User"}</p>

            </div>

            {open && (
                <div className="absolute right-0 top-12 bg-black border border-gray rounded-lg shadow-lg z-50 min-w-[120px]">
                    <button
                        onClick={logout}
                        className="block w-full text-base text-left px-4 py-2 text-white rounded-b-lg"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
} 