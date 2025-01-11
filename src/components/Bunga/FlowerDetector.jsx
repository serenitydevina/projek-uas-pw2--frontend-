import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './Bunga.css';
function App() {
  const [file, setFile] = useState(null); // State untuk menyimpan file yang diunggah
  const [prediction, setPrediction] = useState(null); // State untuk menyimpan hasil prediksi
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // State to handle loading

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Mengambil file yang dipilih pengguna dan menyimpannya ke state `file`
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // untuk mencegah reload halaman default pada form submit
    const formData = new FormData(); //untuk membuat instance FormData untuk mengirim file
    formData.append("file", file);
    
    setLoading(true); // Start loading when the request is sent
    setError(null); // Clear previous errors
    
    try {
      const response = await axios.post( // Mengirim POST request ke API menggunakan Axios
        "http://127.0.0.1:5000/predict", // URL endpoint API railway untuk prediksi
        formData, // Mengirimkan data file sebagai body request
        {
          headers: {
            "Content-Type": "multipart/form-data", // untuk menentukan header untuk file upload
          },
        }
      );
      setPrediction(response.data); // untuk menyimpan hasil prediksi yang diterima dari API ke state `prediction`
    } catch (error) {
      setError("Something went wrong with the API, please try again later.");
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence < 0.40) {
      return "text-danger";
    } else if (confidence < 0.60) {
      return "text-warning";
    } else {
      return "text-success";
    }
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Upload Gambar Bunga dan Prediksi</h1>
      <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
        <div className="form-group mb-3 w-50">
          <label className="form-label" htmlFor="fileInput">Pilih Gambar Bunga</label>
          <input
            type="file"
            className="form-control bg-dark text-light"
            id="file"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" className="btn btn-success w-50" disabled={loading}>
          {loading ? "Uploading..." : "Prediksi"}
        </button>
      </form>

      {error && (
        <div className="alert alert-danger mt-3" role="alert">
          {error}
        </div>
      )}

      {prediction && (
        <div className="mt-5 text-center">
          <h3 className="mb-4">Hasil Prediksi</h3>
          <div className="mb-4">
            <h4 className="font-weight-bold">{prediction.prediction}</h4>
            <p 
              className={`big-text ${getConfidenceColor(prediction.confidence)}`} 
            >
              Confidence: {prediction.confidence.toFixed(2)}
            </p>
          </div>

          <h5>Images from Prediction:</h5>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3" style={{ overflowY: "auto", maxHeight: "45vh" }}>
            {prediction.image_files.map((image_name, index) => (
              <div key={index} className="col">
                <div className="card shadow-sm border-0 hover-card" style={{ height: "100%" }}>
                  <img
                    src={`http://127.0.0.1:5000/cdn/image/${prediction.image_index}/${image_name}`}
                    alt={image_name}
                    className="card-img-top"
                    style={{ objectFit: 'cover', height: '150px' }}
                  />
                  <div className="card-body p-2 bg-dark text-light">
                    <h5 className="card-title">{image_name}</h5>
                    <Link to={`/flower/${prediction.image_index - 1}`} className="btn btn-success" style={{ width: '100%' }}>
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
