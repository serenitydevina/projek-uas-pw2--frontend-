import axios from 'axios';
import { useState } from 'react'
import { useNavigate } from "react-router-dom";

function createBunga () {
    // 
    const [namaBunga, setNamaBunga] = useState("");
    const [fotoBunga, setFotoBunga] = useState("");
    const [deskripsiBunga, setDeskripsiBunga] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();


    const handleFileChange = (event) => {
        setFotoBunga(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const formData = new FormData();
        formData.append('foto', fotoBunga);
        formData.append('nama_bunga', namaBunga);
        formData.append('deskripsi', deskripsiBunga);

        try {
            const response = await axios.post(
                "https://back-end-laravel.vercel.app/api/api/bunga",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                }
            );
            navigate('/listbunga');
            console.log("Response: ", response.data);
        } catch (error) {
            console.error(error);
            setError('Terjadi kesalahan: '.error);
        }
    }
    return (
        <div className="container my-5 p-3">
            <h2 className='fw-bold'>Form Bunga</h2>
            { error && 
                <div className="alert alert-danger">{ error }</div> 
            }

            <form className='mt-3'
                onSubmit={handleSubmit}
            >
                <div className="mb-3">
                    <label className="form-label" htmlFor="fileInput">Pilih Gambar Bunga</label>
                    <input
                        type="file"
                        className="form-control bg-dark text-light"
                        id="file"
                        onChange={handleFileChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="namaBunga" className="form-label">
                        Nama Bunga
                    </label>
                    <input 
                        type="text" 
                        className="form-control"
                        id="namaBunga"
                        value={namaBunga}
                        placeholder="Masukkan nama Bunga"
                        onChange={(e) => setNamaBunga(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="deskripsiBunga" className="form-label">Deskripsi</label>
                    <textarea
                        className="form-control"
                        id="deskripsiBunga"
                        rows="4"
                        value={deskripsiBunga}
                        placeholder="Tulis deskripsi bunga"
                        onChange={(e) => setDeskripsiBunga(e.target.value)}
                        required
                    />
                </div>
                <div className='py-3'>
                    <div className='d-flex justify-content-end align-items-center'>
                        <button className='btn btn-success'>
                            Tambah Bunga
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )

}


export default createBunga;