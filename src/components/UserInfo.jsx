import PropTypes from 'prop-types';

export default function UserInfo({ userData }) {
    return (
        <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-1 capitalize">{userData?.name}</h2>
            <p className="text-white/40 mb-4">@{userData?.email?.split('@')[0]}</p>

            {userData?.bio && (
                <p className="text-white mb-4">{userData.bio}</p>
            )}

            <div className="flex items-center gap-6 text-white/40">
                {userData?.location && (
                    <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span className="text-sm">{userData.location}</span>
                    </div>
                )}

                <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <span className="text-sm">
                        Joined{" "}
                        {new Date(userData?.createdAt || Date.now()).toLocaleDateString("en-US", {
                            month: "long",
                            year: "numeric",
                        })}
                    </span>
                </div>
            </div>

            <div className="flex gap-6 mt-4">
                <span className="text-white">
                    <span className="font-bold">120</span> <span className="text-gray-500">Following</span>
                </span>
                <span className="text-white">
                    <span className="font-bold">1,234</span> <span className="text-gray-500">Followers</span>
                </span>
            </div>
        </div>
    );
};


UserInfo.propTypes = {
    userData: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
        bio: PropTypes.string,
        location: PropTypes.string,
        createdAt: PropTypes.string,
    }).isRequired,
};
