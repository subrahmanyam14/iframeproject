import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AllCards.css';  // Assuming you save the CSS in this file
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllCards = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        handleFetchData();
    }, []);

    const handleFetchData = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/all-cards`);
            if (res.data.allCards) {
                setData(res.data.allCards);
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setIsLoading(false);
        }
    };

    const filteredData = (title) => {
        return data.filter((item) => item.title.toLowerCase().includes(title.toLowerCase()));
    };

    const displayedData = filter ? filteredData(filter) : data;

    const handleOnClick = (card) => {
        if (token) {
            navigate("/fullpage", {
                state: {
                    title: card.title,
                    videoUrl1: card.videoUrl1,
                    videoUrl2: card.videoUrl2,
                    iframeUrl: card.iframeUrl
                }
            });
        } else {
            toast.error('Please login...!');
        }
    };

    return (
        <div className='allcards'>
            <div className='filter-container'> 
                <h1 >Search: </h1>
                <input
                    type="text"
                    placeholder="search..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="filter-input"
                />
            </div>
            <div className="allcards-container">
                {isLoading ? (
                    <center>
                        <p>Loading....</p>
                    </center>
                ) : (
                    displayedData.map((card, index) => (
                        <div key={index} className="allcard" onClick={() => handleOnClick(card)}>
                            <div className="all-card-header">
                                <h3>{card.title}</h3>
                                <h6>{formatDate(card.date)}</h6>
                            </div>
                            <div className="allcard-body">
                                <p>Description: {card.description}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <ToastContainer />
        </div>
    );
}

function formatDate(timestamp) {
    const date = new Date(timestamp);
  
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
  
    return `${day}-${month}-${year}`;
  }

export default AllCards;
