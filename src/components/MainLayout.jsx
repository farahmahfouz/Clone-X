import Sidebar from "./Sidebar";
import Trending from "./Trending";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <div className="w-full">
            <div className="grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full h-full bg-black">
                <div>
                    <Sidebar />
                </div>
                <div className="h-full border border-gray-800 border-t-0">
                    <div className="w-11/12 m-auto flex p-3 h-full flex-col">
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
