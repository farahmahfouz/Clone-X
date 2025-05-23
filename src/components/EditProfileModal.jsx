import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function EditProfileModal({ isOpen, onClose, userData, onSave }) {
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [location, setLocation] = useState('');
    const [website, setWebsite] = useState('');
    

    useEffect(() => {
        if (userData) {
            setName(userData.name || '');
            setBio(userData.bio || '');
            setLocation(userData.location || '');
            setWebsite(userData.website || '');
        }
    }, [userData]);

    const handleSave = () => {
        onSave({ name, bio, location, website });
        onClose();
    };

    return (
        <dialog id="edit_profile_modal" className={`modal ${isOpen ? 'modal-open backdrop-blur' : ''} `}>
            <div className="modal-box bg-black text-white rounded-lg p-0">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-800">
                    <div className="flex items-center">
                        <button
                            onClick={onClose} // Close modal
                            className="p-2 rounded-full hover:bg-gray-800 transition-colors mr-4"
                        >
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <h3 className="font-bold text-xl">Edit profile</h3>
                    </div>
                    <button className="btn btn-sm rounded-full bg-white text-black hover:bg-gray-200" onClick={handleSave}>Save</button>
                </div>

                {/* Modal Body */}
                <div className="p-6 space-y-6">
                    {/* Name Field */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-white">Name</span>
                        </label>
                        <input type="text" placeholder="Name" className="input input-bordered w-full bg-transparent text-white border-gray focus:border-primary" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    {/* Bio Field */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-white">Bio</span>
                        </label>
                        <textarea placeholder="Bio" className="textarea textarea-bordered w-full bg-transparent text-white border-gray focus:border-primary h-24" value={bio} onChange={(e) => setBio(e.target.value)}></textarea>
                    </div>

                    {/* Location Field */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-white">Location</span>
                        </label>
                        <input type="text" placeholder="Location" className="input input-bordered w-full bg-transparent text-white border-gray focus:border-primary" value={location} onChange={(e) => setLocation(e.target.value)} />
                    </div>

                    {/* Website Field */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-white">Website</span>
                        </label>
                        <input type="text" placeholder="Website" className="input input-bordered w-full bg-transparent text-white border-gray focus:border-primary" value={website} onChange={(e) => setWebsite(e.target.value)} />
                    </div>
                </div>
            </div>
        </dialog>
    );
}

EditProfileModal.propTypes = {
    isOpen: PropTypes.func,
    onClose: PropTypes.func,
    userData: PropTypes.func,
    onSave: PropTypes.func,
};