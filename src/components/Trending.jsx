
export default function Trending() {
    const users = [
        { name: 'Ahmed Hassan El Sharkawy', handle: '@sharkawiaahmed', verified: true, imgSrc: 'https://via.placeholder.com/50' },
        { name: 'رسائل', handle: '@iMessaage_', verified: true, imgSrc: 'https://via.placeholder.com/50' },
        { name: 'د. علي القره داغي', handle: '@Ali_AlQaradaghi', verified: true, imgSrc: 'https://via.placeholder.com/50' },
    ];

    return (
        <div className="space-y-4 fixed top">
       
                <div className="bg-black m-auto text-white w-10/12 p-4 rounded-2xl shadow-md border border-gray-800 ">
                    <h2 className="text-lg font-bold mb-2">Subscribe to Premium</h2>
                    <p className="text-sm mb-4">Subscribe to unlock new features and if eligible, receive a share of ads revenue.</p>
                    <button className="bg-sky-500 hover:bg-sky-600 text-white py-2 px-4 rounded-full">Subscribe</button>
                </div>
        
                <div className="bg-black m-auto text-white w-10/12 p-4 rounded-2xl shadow-md border border-gray-800">
                    <h3 className="text-lg font-bold mb-4">Whats happening</h3>
                    <ul className="space-y-2">
                        <li>
                            <span className="text-gray-400 text-sm">Music · Trending</span>
                            <p className="font-bold">Namjoon</p>
                            <p className="text-gray-400 text-sm">506K posts</p>
                        </li>
                        <li>
                            <p className="font-bold">#طيارانت_وين_وصلت</p>
                            <p className="text-gray-400 text-sm">27.7K posts</p>
                        </li>
                        <li>
                            <p className="font-bold">مظهر شاهين</p>
                        </li>
                        <li>
                            <p className="font-bold">إيمان الطوخي</p>
                        </li>
                        <li>
                            <p className="font-bold">عيد النيروز</p>
                        </li>
                    </ul>
                    <button className="text-sky-500 hover:underline mt-4">Show more</button>
                </div>
           
            <div className="bg-black text-white  w-10/12 p-4 rounded-2xl shadow-md border border-gray-800 m-auto">
                <h3 className="text-lg font-bold mb-4">Who to follow</h3>
                <ul className="space-y-4">
                    {users.map((user, index) => (
                        <li key={index} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <img src={user.imgSrc} alt={user.name} className="w-10 h-10 rounded-full" />
                                <div>
                                    <p className="font-bold">{user.name} {user.verified && <span className="text-blue-500">✔</span>}</p>
                                    <p className="text-gray-400 text-sm">{user.handle}</p>
                                </div>
                            </div>
                            <button className="bg-white text-black py-1 px-4 rounded-full hover:bg-gray-200">Follow</button>
                        </li>
                    ))}
                </ul>
                <button className="text-sky-500 hover:underline mt-4">Show more</button>
            </div>
        </div>
    )
}
