import React, { useContext, useEffect, useState } from 'react';
import "../CommonComponents/Register.css";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
//import { Store } from '../../App';

const UpdateCard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const id = location.state.id;
    console.log("id "+location.state.id);
    const [title, setTitle] = useState(location.state.title);
    const [videoUrl1, setVideoUrl1] = useState(location.state.videoUrl1);
    const [videoUrl2, setVideoUrl2] = useState(location.state.videoUrl2);
    const [iframeUrl, setIframeUrl] = useState(location.state.iframeUrl);
    const [description, setDescription] = useState(location.state.description);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        if(!id)
            {
                navigate("/admin-dashboard");
            }
    }, [id]);

    const handleUpdateCard = async () => {
        setLoading(true);
        try {
            let token = localStorage.getItem("token");
            await axios.put(`${import.meta.env.VITE_BACKEND_URL}/update-card/${id}`, 
                { title, videoUrl1, videoUrl2, iframeUrl, description }, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );
            toast.success('Card updated successfully!');
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
                                <h1>Update Card</h1>
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
                                <label htmlFor="iframeUrl">Description:</label>
                                <input
                                    type="text"
                                    id="description"
                                    className="form-control"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <button onClick={handleUpdateCard} className="form-btn" disabled={loading}>
                                {loading ? 'Updating...' : 'Update'}
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

export default UpdateCard;
