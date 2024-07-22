import React, { useState } from 'react';
import "./AddCard.css";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

const AddCard = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [videoUrl1, setVideoUrl1] = useState('');
    const [videoUrl2, setVideoUrl2] = useState('');
    const [iframeUrl, setIframeUrl] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAddCard = async () => {
        if (!title || !videoUrl1 || !videoUrl2 || !iframeUrl || !description) {
            toast.error('All fields are required!', {position: "top-center"});
            return;
        }

        setLoading(true);
        try {
            let token = localStorage.getItem("token");
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/add-cards`, 
                { title, videoUrl1, videoUrl2, iframeUrl, description }, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );
            toast.success('Card added successfully!', {position: "top-center"});
            setTimeout(() => {
                navigate("/admin-dashboard");
            }, 2000);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add card.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='add-card-main'>
            <div className="add-card-container">
                <ToastContainer />
                <div className="add-card-row">
                    <div className="add-card-card">
                        <div className="add-card-body">
                            <div className="add-card-text-center">
                                <h1>Add Card</h1>
                            </div>
                            <div className="add-card-group">
                                <label htmlFor="title">Title:</label>
                                <input
                                    type="text"
                                    id="title"
                                    className="form-control"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div className="add-card-group">
                                <label htmlFor="videoUrl1">Video URL 1:</label>
                                <input
                                    type="text"
                                    id="videoUrl1"
                                    className="form-control"
                                    value={videoUrl1}
                                    onChange={(e) => setVideoUrl1(e.target.value)}
                                />
                            </div>
                            <div className="add-card-group">
                                <label htmlFor="videoUrl2">Video URL 2:</label>
                                <input
                                    type="text"
                                    id="videoUrl2"
                                    className="form-control"
                                    value={videoUrl2}
                                    onChange={(e) => setVideoUrl2(e.target.value)}
                                />
                            </div>
                            <div className="add-card-group">
                                <label htmlFor="iframeUrl">Iframe URL:</label>
                                <input
                                    type="text"
                                    id="iframeUrl"
                                    className="form-control"
                                    value={iframeUrl}
                                    onChange={(e) => setIframeUrl(e.target.value)}
                                />
                            </div>
                            <div className="add-card-group">
                                <label htmlFor="description">Description:</label>
                                <input
                                    type="text"
                                    id="description"
                                    className="form-control"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <button onClick={handleAddCard} className="add-card-btn" disabled={loading}>
                                {loading ? 'Adding...' : 'Add'}
                            </button>
                            <div className="add-card-links">
                                {/* Additional links if needed */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddCard;
