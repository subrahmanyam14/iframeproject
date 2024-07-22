import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../CardComponents/Cards.css'; // Assuming Cards.css contains the styles you provided

const AdminDashBoard = () => {
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
        setData(res.data.allCards);
        handleSortData(res.data.allCards);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  const handleSortData = (cards) => {
    const sortedData = [...cards].sort((a, b) => new Date(a.date) - new Date(b.date));
    setData(sortedData);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/delete-card/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      toast.success("Deleted successfully...!", { position: "top-center" });
      setData(data.filter(card => card._id !== id));
    } catch (error) {
      toast.error("Error in deleting card...!", { position: "top-center" });
      console.error('Error in deleting card:', error);
    }
  };

  const handleClick = (card) => {
    navigate("/edit-card", {
      state: {
        id: card._id,
        title: card.title,
        videoUrl1: card.videoUrl1,
        videoUrl2: card.videoUrl2,
        iframeUrl: card.iframeUrl,
        description: card.description
      }
    });
  };

  return (
    <div className='card'>
      <h3>Recently updated cards....</h3>
      <div className="all-cards-container">
        {isLoading ? (
          <center>
            <p>Loading....</p>
          </center>
        ) : (
          data.map((card, index) => (
            <div key={index} className="all-card">
              <div className="all-card-header">
                <h3>{card.title}</h3>
              </div>
              <div className="all-card-body">
                <h4>Video Url1: {card.videoUrl1}</h4>
                <h4>Video Url2: {card.videoUrl2}</h4>
                <h4>Iframe Url: {card.iframeUrl}</h4>
                <p>Description: {card.description}</p>
                <div className="admin-card-footer">
                  <button className="button-color" onClick={() => handleClick(card)}>Edit</button>
                  <button className="button-color" onClick={() => handleDelete(card._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminDashBoard;
