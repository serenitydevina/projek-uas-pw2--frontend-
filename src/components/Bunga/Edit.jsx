import { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ImageUploading from 'react-images-uploading';

export default function EditBunga() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [namaBunga, setNamaBunga] = useState("");
    const [deskripsiBunga, setDeskripsiBunga] = useState("");
    const [images, setImages] = useState(null);
    const [error, setError] = useState(null);
    const maxNumber = 1; // Maksimal 1 gambar

    useEffect(() => {
        const fetchFlowers = async () => {
            try {
                const response = await axios.get(`https://back-end-laravel.vercel.app/api/api/bunga/${id}`);
                const bunga = response.data.result;
                setNamaBunga(bunga.nama_bunga);
                setDeskripsiBunga(bunga.deskripsi);
                setImages([{ data_url: bunga.foto }]);
                console.log(response);
            } catch (err) {
                console.error("Error fetching bunga: ", err);
                setError("Gagal memuat data bunga.");
            }
        };
        fetchFlowers();
    }, [id]);

    const onChangeImage = (imageList) => {
        setImages(imageList);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("nama_bunga", namaBunga);
        formData.append("deskripsi", deskripsiBunga);

        if (images.length > 0 && images[0]?.file) {
            formData.append("foto", images[0].file); // Tambahkan file gambar jika ada
        }

        formData.forEach((value, key) => {
            console.log(key, value);
        });

        try {
            const response = await axios.post(
                `https://back-end-laravel.vercel.app/api/api/bunga/${id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data", // Pastikan header ini diatur
                    },
                }
            );
            console.log(response.data);
            navigate("/listbunga");
        } catch (error) {
            console.error("Error Response:", error.response?.data || error.message);
        }
    };

    return (
        <div className="container my-5 p-3">
            <h2 className="fw-bold">Edit Bunga</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Foto Bunga</label>
                    <ImageUploading
                        multiple={false}
                        value={images}
                        onChange={onChangeImage}
                        maxNumber={maxNumber}
                        dataURLKey="data_url"
                    >
                        {({
                            imageList,
                            onImageUpdate,
                        }) => (
                            <div className="upload__image-wrapper">
                                {imageList.map((image, index) => (
                                    <div key={index} className="image-item mt-3">
                                        <img src={image.data_url} alt="" width="300" />
                                        <div className="image-item__btn-wrapper mt-2">
                                            <button
                                                type="button"
                                                className="btn btn-secondary btn-sm"
                                                onClick={() => onImageUpdate(index)}
                                            >
                                                Ubah
                                            </button>
                                            &nbsp;
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </ImageUploading>
                </div>
                <div className="mb-3">
                    <label htmlFor="namaBunga" className="form-label">Nama Bunga</label>
                    <input
                        type="text"
                        className="form-control"
                        id="namaBunga"
                        value={namaBunga}
                        onChange={(e) => setNamaBunga(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="deskripsiBunga" className="form-label">Deskripsi</label>
                    <textarea
                        className="form-control"
                        id="deskripsiBunga"
                        rows="4"
                        value={deskripsiBunga}
                        onChange={(e) => setDeskripsiBunga(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-success">
                        Simpan Perubahan
                    </button>
                </div>
            </form>
       </div>
    );
}