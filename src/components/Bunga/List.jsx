import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function ListBunga() {
  const [flowers, setFlowers] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchFlowers = async () => {
      try {
        const response = await axios.get("https://back-end-laravel.vercel.app/api/api/bunga");
        setFlowers(response.data.result);
        setError(null);
      } catch (error) {
        setError("Error fetching flower data. Please try again later.");
        console.error("Error fetching flower data:", error);
      }
    };

    fetchFlowers();
  }, []);

  const handleDelete = async (id, nama_bunga) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You want to delete ${nama_bunga}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((response) => {
      if (response.isConfirmed) {
        axios
          .delete(`https://back-end-laravel-main-de9x.vercel.app/api/api/bunga/${id}`)
          .then(() => {
            setFlowers(flowers.filter((flower) => flower.id !== id));
            Swal.fire('Deleted!', `${nama_bunga} has been deleted.`, 'success');
          })
          .catch((error) => {
            console.error("Error deleting flower:", error);
            Swal.fire('Error', 'Failed to delete flower. Please try again later.', 'error');
          });
      }
    }
    )

  }
  return (
    <div className="container mt-5">
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      { token && 
        <div className="d-flex justify-content-end align-items-center mb-4">
        <Link
          to={'/createbunga'}
          className="btn btn-success"
        >
            Add Bunga
        </Link>
      </div>
      }

      <div className="row" style={{ overflowY: "auto", maxHeight: "80vh" }}>
        {flowers.length > 0 ? (
          flowers.map((flower, id) => (
            <div className="col-md-4 my-4" key={id}>
              <div
                className="card mb-4 hover-card"
                style={{
                  width: "18rem",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.3s ease",
                }}
              >
                <img
                  // flower.image_link
                  src={ flower.foto }
                  className="card-img-top"
                  alt={flower.nama_bunga}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body bg-dark text-light" style={{ flexGrow: 1 }}>
                    <h5 className="card-title">{flower.nama_bunga}</h5>
                    <Link
                      to={`/flower/${ flower.id }`}
                      className="btn btn-success btn-block"
                      style={{ width: "100%" }}
                    >
                      View
                    </Link>
                    { token && 
                      <>
                        <Link
                          to={`/flower/edit/${ flower.id }`}
                          className="btn btn-warning btn-block my-2"
                          style={{ width: "100%" }}
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(flower.id, flower.nama_bunga)}
                          className="btn btn-danger btn-block"
                          style={{ width: "100%" }}
                        >
                          Delete
                        </button>
                      </>
                    }
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No flowers available at this moment.</p>
        )}
      </div>

      <style jsx>{`
        .hover-card:hover {
          transform: scale(1.1);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

export default ListBunga;
