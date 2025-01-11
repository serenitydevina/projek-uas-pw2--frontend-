import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function DetailBunga() {
  const { id } = useParams();
  const [flower, setFlower] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlower = async () => {
      try {
        // const response = await axios.get(`https://back-end-laravel.vercel.app/api/api/bunga/${id}`);
        const response = await axios.get(`https://back-end-laravel.vercel.app/api/api/bunga/${id}`);
        console.log(response.data.result);
        setFlower(response.data.result);
        setError(null);
      } catch (error) {
        setError("Error fetching flower detail. Please try again later.");
        console.error("Error fetching flower detail:", error);
      }
    };

    fetchFlower();
  }, [id]);


  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  if (!flower) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card" style={{ width: "30rem" }}>
        <img
          src={flower.foto}
          className="card-img-top"
          alt={flower.nama_bunga}
          style={{ maxHeight: "400px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title">{flower.nama_bunga}</h5>
          <p className="card-text">{flower.deskripsi}</p>
        </div>
      </div>
    </div>
  );
}

export default DetailBunga;