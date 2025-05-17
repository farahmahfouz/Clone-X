import Sidebar from "./Sidebar";
import Trending from "./Trending";
import { Outlet, useLocation } from "react-router-dom";
import { useCallback } from "react";

export default function MainLayout() {
    const location = useLocation();
    const isHomePage = location.pathname === '/home';

    const handlePostAdded = useCallback(() => {
        if (isHomePage) {
            window.dispatchEvent(new Event('postAdded'));
        }
    }, [isHomePage]);

    return (
        <div className="w-full">
            <div className="grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full h-full">
                <div>
                    <Sidebar onPostAdded={handlePostAdded} />
                </div>
                <div className="h-full border border-gray-800 border-t-0">
                    <div className="w-full m-auto flex py-3 h-full flex-col">
                        <Outlet />
                    </div>
                </div>
                <div>
                    <Trending />
                </div>
            </div>
        </div>
    );
}
