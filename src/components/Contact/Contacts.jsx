import React, { useState } from 'react';
import axios from 'axios';
import './Contact.css';
export default function Contact() {
  const [_email, setEmail] = useState('');
  const [_pesan, setPesan] = useState('');
  const [_nama, setNama] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const jsonObject = {
            email: _email,
            name: _nama,
            pesan: _pesan,
        };
          console.log(jsonObject);
          console.log('Authorization' + `Bearer ${localStorage.getItem("authToken")}`);
        const response = await axios.post(
            'https://back-end-laravel.vercel.app/api/api/contact', 
            jsonObject,
            {
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
              }
            }
          );
          
          
      setMessage(response.data.message);
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'An unexpected error occurred';
      setMessage(errorMsg);
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-6">
        <form onSubmit={handleSubmit}>
          <h5 className="text-center">Hubungi kami</h5>
          <p className="text-center">
            Umpan balik atau melaporkan bug.
          </p>
          <div className="d-flex flex-column gap-3">
            <div className="d-flex flex-column flex-sm-row gap-2">
              <label htmlFor="email" className="visually-hidden">
                Email
              </label>
              <input
                type="email"
                className="form-control bg-dark text-light"
                id="email"
                name="email"
                placeholder="Email address"
                required
                value={_email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="nama" className="visually-hidden">
                Nama
              </label>
              <input
                type="text"
                className="form-control bg-dark text-light"
                id="nama"
                name="nama"
                placeholder="Nama"
                required
                value={_nama}
                onChange={(e) => setNama(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="pesan" className="visually-hidden">
                Pesan
              </label>
              <textarea
                className="form-control bg-dark text-light"
                id="pesan"
                name="pesan"
                rows="4"
                placeholder="Tulis pesan Anda di sini"
                required
                value={_pesan}
                onChange={(e) => setPesan(e.target.value)}
              />
            </div>
            <button className="btn btn-success w-100" type="submit">
              Submit
            </button>
          </div>
        </form>
        {_nama && _pesan && _email && (
          <p className="mt-3 text-center">{message}</p>
        )}
      </div>
    </div>
  );
  
}