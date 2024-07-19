import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ToastContainer, toast } from "react-toastify";
import { SampleNextArrow, SamplePrevArrow } from '../CardComponents/CustomArrows';  //
import "./AdminDashBoard.css";
import NavBar from "./NavBar";

function AdminDashBoard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  

  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/all-cards`);
      console.log(response.data.allCards);
      setCards(response.data.allCards   );
    } catch (error) {
      console.error('Error in fetching cards:', error);
    }
  };

  const handleDelete = (id) => {
    axios.delete(`${import.meta.env.VITE_BACKEND_URL}/delete-card/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      toast.success("Deleted successfully...!", { position: "top-center" });
      setCards(cards.filter(card => card.id !== id)); 
    })
    .catch(error => {
      toast.error("Error in deleting card...!", { position: "top-center" });
      console.error('Error in deleting card:', error);
    });
  };

  const handleClick = (id, title, videoUrl1, videoUrl2, iframeUrl, description) => {
    navigate("/edit-card", {state: { id: id, title: title, videoUrl1: videoUrl1, videoUrl2: videoUrl2, iframeUrl: iframeUrl, description: description }});
  };


  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  


  if (cards.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="admin-cards">
      <Slider {...settings}>
            {cards.map((card, index) => (
              <div key={index} className="admin-card" >
                <div className="admin-card-header">
                  <h3>{card.title}</h3>
                  <h6>{card.date}</h6>
                </div>
                <div className="admin-card-body">
                  <p>VideoUrl1: {card.videoUrl1}</p>
                  <p>VideoUrl2: {card.videoUrl2}</p>
                  <p>Iframe: {card.iframeUrl}</p>
                </div>
                <div className="admin-card-footer">
                  <button className="button-color" onClick={() => {handleClick(card._id, card.title, card.videoUrl1, card.videoUrl2, card.iframeUrl, card.description)}}>Edit</button>
                  <button className="button-color" onClick={() => {handleDelete(card._id)}}>Delete</button>
                </div>
              </div>
            ))}
          </Slider>
      </div>
    </div>
  );
}

export default AdminDashBoard;