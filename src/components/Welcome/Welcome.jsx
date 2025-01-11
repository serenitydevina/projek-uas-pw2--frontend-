import React from 'react';
import './Welcome.css';
import { Link } from 'react-router-dom';
export default function Welcome() {
  return (
    <>
    <div className="d-flex justify-content-center align-items-center vh-100">
    <div className="welcome-container">
        <div className="welcome-text">
            <h1>Selamat datang di website kami!</h1>
            <p>We are excited to have you here. Explore and enjoy the experience.</p>
        </div>
        <div className="welcome-button-container">
            <Link to="/detector" className="welcome-btn">
                Mulai
            </Link>
        </div>
    </div>
    </div>
    </>
  );
}
