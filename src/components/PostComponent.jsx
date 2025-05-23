import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Image, List, Smile, Calendar, MapPin } from 'lucide-react';
import { createPost } from '../utils/postService';

export default function PostComponent({ onSuccess }) {
    const [postText, setPostText] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);


    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedImage(file);

            // Create a preview for the selected image
            const reader = new FileReader();
            reader.onload = (event) => {
                setImagePreview(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePostSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('content', postText);
            if (selectedImage) {
                formData.append('images', selectedImage);
            }

            await createPost(formData).then((newPost) => {
                if (onSuccess) {
                    onSuccess(newPost);
                }
            });

            // Reset form
            setPostText('');
            setSelectedImage(null);
            setImagePreview(null);


        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    const handleRemoveImage = () => {
        setSelectedImage(null);
        setImagePreview(null);
    };

    return (
        <div className="w-full text-white">
            <div className="flex mb-2 px-4">
                <div className="flex-grow">
                    <div className="flex items-center mb-2">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray mr-3">
                            {/* Profile image placeholder */}
                            <div className="w-full h-full flex items-center justify-center">
                                <span className="text-gray-400">👤</span>
                            </div>
                        </div>
                        <div className="border border-gray rounded-full  py-1 text-sm">
                            <div className="flex items-center text-primary px-4">
                                <span>Everyone</span>
                                <span className="ml-1">▾</span>
                            </div>
                        </div>
                    </div>
                    <textarea
                        className="w-full bg-transparent text-white outline-none resize-none placeholder-white/40 text-xl"
                        placeholder="What's happening?"
                        rows={3}
                        value={postText}
                        onChange={(e) => setPostText(e.target.value)}
                    />

                    {/* Image preview */}
                    {imagePreview && (
                        <div className="relative mt-2 mb-2">
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="rounded-lg max-h-64 w-auto"
                            />
                            <button
                                onClick={handleRemoveImage}
                                className="absolute top-2 right-2 bg-gray-800 text-white rounded-full p-1"
                            >
                                ✕
                            </button>
                        </div>
                    )}

                    <div className="text-sm text-blue-400 mt-2 mb-4">Everyone can reply</div>

                    <div className="border-t border-gray pt-3 flex justify-between items-center">
                        <div className="flex gap-3">
                            {/* Image upload button */}
                            <button
                                onClick={handleImageClick}
                                className="text-primary hover:bg-blue-900 hover:bg-opacity-20 rounded-full p-2"
                            >
                                <Image size={20} />
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                className="hidden"
                                accept="image/*"
                            />

                            {/* Other media icons */}
                            <button className="text-primary hover:bg-blue-900 hover:bg-opacity-20 rounded-full p-2">
                                <List size={20} />
                            </button>
                            <button className="text-primary hover:bg-blue-900 hover:bg-opacity-20 rounded-full p-2">
                                <Smile size={20} />
                            </button>
                            <button className="text-primary hover:bg-blue-900 hover:bg-opacity-20 rounded-full p-2">
                                <Calendar size={20} />
                            </button>
                            <button className="text-primary hover:bg-blue-900 hover:bg-opacity-20 rounded-full p-2">
                                <MapPin size={20} />
                            </button>
                        </div>

                        <button
                            onClick={handlePostSubmit}
                            disabled={!postText && !selectedImage}
                            className={`px-4 py-2 rounded-full ${postText || selectedImage ? 'bg-white hover:bg-white-600' : 'bg-white bg-opacity-50 cursor-not-allowed'
                                } font-bold text-black`}
                        >
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

PostComponent.propTypes = {
    onSuccess: PropTypes.func
};
