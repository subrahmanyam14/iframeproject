import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Cards.css';

const Cards = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    handleFetchData();
  }, []);

  const handleFetchData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/all-cards`);
      if (res.data.allCards) {
        console.log("Fetched Data: ", res.data.allCards); // Debugging log
        //setData(res.data.allCards);
        handleSortData(res.data.allCards);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  const handleSortData = (cards) => {
    const sortedData = [...cards].sort((a, b) => new Date(b.date) - new Date(a.date));
    setData(sortedData);
  };
  

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
      toast.error('Please login...!', { position: "top-center" });
    }
  };

  return (
    <div className='cards'>
      <h3>Recently updated cards....</h3>
      <div className="all-cards-container">
        {isLoading ? (
          <center>
            <p>Loading....</p>
          </center>
        ) : (
          data.map((card, index) => (
            <div key={index} className="all-card" onClick={() => handleOnClick(card)}>
              <div className="all-card-header">
                <h3>{card.title}</h3>
                <h6>{formatDate(card.date)}</h6>
              </div>
              <div className="all-card-body">
                <p>Description: {card.description}</p>
              </div>
            </div>
          ))
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

function formatDate(timestamp) {
  const date = new Date(timestamp);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

export default Cards;
