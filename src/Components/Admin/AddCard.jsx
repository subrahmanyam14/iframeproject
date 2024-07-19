import React, { useContext, useState } from 'react';
import "../CommonComponents/Register.css";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
//import { Store } from '../../App';

const AddCard = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [videoUrl1, setVideoUrl1] = useState('');
    const [videoUrl2, setVideoUrl2] = useState('');
    const [iframeUrl, setIframeUrl] = useState('');
    const [description, setDescription] =useState('');
    const [loading, setLoading] = useState(false);
    //const [token, setToken] = useContext(Store);

    const handleAddCard = async () => {
        if (!title || !videoUrl1 || !videoUrl2 || !iframeUrl || !description) {
            toast.error('All fields are required!');
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
            toast.success('Card added successfully!');
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
        <div className='form-main'>
            <div className="form-main-container">
                <ToastContainer />
                <div className="form-row justify-content-center">
                    <div className="form-card">
                        <div className="form-card-body">
                            <div className="form-text-center">
                                <h1>Add Card</h1>
                            </div>
                            <div className="form-group">
                                <label htmlFor="title">Title:</label>
                                <input
                                    type="text"
                                    id="title"
                                    className="form-control"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="videoUrl1">Video URL 1:</label>
                                <input
                                    type="text"
                                    id="videoUrl1"
                                    className="form-control"
                                    value={videoUrl1}
                                    onChange={(e) => setVideoUrl1(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="videoUrl2">Video URL 2:</label>
                                <input
                                    type="text"
                                    id="videoUrl2"
                                    className="form-control"
                                    value={videoUrl2}
                                    onChange={(e) => setVideoUrl2(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="iframeUrl">Iframe URL:</label>
                                <input
                                    type="text"
                                    id="iframeUrl"
                                    className="form-control"
                                    value={iframeUrl}
                                    onChange={(e) => setIframeUrl(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description:</label>
                                <input
                                    type="text"
                                    id="description"
                                    className="form-control"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <button onClick={handleAddCard} className="form-btn" disabled={loading}>
                                {loading ? 'Adding...' : 'Add'}
                            </button>
                            <div className="form-links">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddCard;
