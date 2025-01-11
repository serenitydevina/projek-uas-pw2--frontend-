import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Feedback.css';

export default function Feedback() {
  const [items, setItems] = useState([]); 
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://back-end-laravel.vercel.app/api/api/contact",
          {
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        setItems(response.data.result); 
      } catch (err) {
        setError(err.response ? err.response.data.message : "An error occurred");
      }
    };

    fetchData();
  }, []);

  const deleteFeedback = (id) => {
    axios
      .delete(`https://back-end-laravel.vercel.app/api/api/contact/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
      })
      .catch((err) => {
        setError(err.response ? err.response.data.message : "An error occurred while deleting");
      });
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!items.length) {
    return <div className="loading-message">Loading...</div>;
  }

  return (
    <div className="feedback-container">
      <div className="feedback-list">
        {items.map((item) => (
          <div className="feedback-card" key={item.id}>
            <button
              className="delete-button"
              onClick={() => deleteFeedback(item.id)}
            >
              &times;
            </button>
            <h3 className="feedback-name">{item.name}</h3>
            <p className="feedback-email">Email: {item.email}</p>
            <p className="feedback-message">Message: <em>{item.pesan}</em></p>
            <div className="feedback-dates">
              <small>Created at: {new Date(item.created_at).toLocaleString()}</small><br />
              <small>Updated at: {new Date(item.updated_at).toLocaleString()}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
