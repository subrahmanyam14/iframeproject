import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import YouTube from 'react-youtube';
import './FullPage.css'


export default function ExtandPage() {

    const location = useLocation();
    const [title] = useState(location.state.title);
    const [videoUrl1] = useState(location.state.videoUrl1);
    const [videoUrl2] = useState(location.state.videoUrl2);
    const [iframeUrl] = useState(location.state.iframeUrl);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/");
        }
    }, [token, navigate]);

    const getYouTubeId = (url) => {
        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    const videoId1 = getYouTubeId(videoUrl1);
    const videoId2 = getYouTubeId(videoUrl2);

    return (
        <div>
            <div className='full-page-title'>
            <h2>{title}</h2>
            </div>

            <div className='full-page-ctn-main'>
                <div className='full-page-video-ctn'>
                {videoId1 ? (
                        <YouTube videoId={videoId1} />
                    ) : (
                        <p>Error: Invalid YouTube URL for Video 1</p>
                    )}

                </div>

                <div className='full-page-iframe'>
                <iframe src={iframeUrl}  title="iframe-content"></iframe>

                </div>

                <div className='full-page-video-ctn'>
                {videoId2 ? (
                        <YouTube videoId={videoId2} />
                    ) : (
                        <p>Error: Invalid YouTube URL for Video 1</p>
                    )}

                </div>

            </div>

        </div>
    )
}
