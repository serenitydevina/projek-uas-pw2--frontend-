import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css"
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    axios
      .post("https://back-end-laravel.vercel.app/api/api/login", {
        email,
        password,
      })
      .then((response) => {
        const token = response.data.data.token;
        const user = response.data.data.user;
        console.log(response.data.data);
        console.log(response.data.data);
        localStorage.setItem("authToken", token);
        localStorage.setItem("authUser", user);
        navigate("/"); 
      })
      .catch((error) => {
        setError("Login gagal. Silahkan cek kembali email dan password.");
        console.error("Kesalahan saat login:", error);
      });
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="col-md-6">
          <div className="card bg-dark text-light">
            <div className="card-header">
              <h3 className="text-center">Login</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleLogin}>
                <div className="form-group mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button type="submit" className="btn btn-success w-100">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
