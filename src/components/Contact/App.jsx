import React, { Suspense, useState, useEffect  } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation  } from 'react-router-dom';
import Logout from "./components/Logout/Logout";
import ParticlesBackground from "./components/Renderer/ParticlesBackground";
import './App.css';

import 'animate.css'; // Optional CSS animation library
import { CSSTransition, TransitionGroup } from 'react-transition-group';
const FlowerDetector = React.lazy(() => import('./components/Bunga/FlowerDetector'));
const ListBunga = React.lazy(() => import('./components/Bunga/List'));
const CreateBunga = React.lazy(() => import('./components/Bunga/Create'));
const Contact = React.lazy(() => import('./components/Contact/Contacts'));
const Login = React.lazy(() => import("./components/Login/Login"));
const AboutUs = React.lazy(() => import("./components/About/AboutUS"));
const DetailBunga = React.lazy(() => import('./components/Bunga/DetailBunga'));
const Welcome = React.lazy(() => import('./components/Welcome/Welcome'));
const Feedback = React.lazy(() => import('./components/Feedback/Feedback'));
const EditBunga = React.lazy(() => import('./components/Bunga/Edit'));
import MarsBackground from "./components/Renderer/MarsRenderer";

function App() {
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [userName, setUser] = useState(localStorage.getItem("authUser"));
  const [activeLink, setActiveLink] = useState(null);

  

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("authToken"));
      setUser(localStorage.getItem("authUser"));
      navigate("/"); 
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  const ROUTE_ORDER = {
    "/": 0,
    "/detector": 1,
    "/listbunga": 2,
    "/contact": 3,
    "/login": 4,
    "/logout": 5,
    "/aboutus": 6,
    "/flower/:id": 7,
    "/createbunga": 8,
    "/flowers/edit/:id": 9,
  };
  
  const handleLogin = () => {
    const getToken = token;
    const getUser = userName;
    navigate("/");
  };
  function HandleMarsRenderer() {
    const location = useLocation();
    return location.pathname === "/" ? <MarsBackground /> : null;
  }
  function AnimatedRoutes() {
    const location = useLocation();
    const [previousPath, setPreviousPath] = useState(location.pathname);
    const [animationDirection, setAnimationDirection] = useState("slide-left");
  
    React.useEffect(() => {
      const currentOrder = ROUTE_ORDER[location.pathname] ?? 0;
      const previousOrder = ROUTE_ORDER[previousPath] ?? 0;
      setAnimationDirection("slide-left");
  
      setPreviousPath(location.pathname);
    }, [location.pathname, previousPath]);
  
    return (
      <TransitionGroup>
        <CSSTransition
          key={location.key}
          classNames={animationDirection}
          timeout={300}
        >
          <Suspense fallback={<div>Loading...</div>}>
            <Routes location={location}>
              <Route path="/" element={<Welcome />} />
              <Route path="/detector" element={<FlowerDetector />} />
              <Route path="/listbunga" element={<ListBunga />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/flower/:id" element={<DetailBunga />} />
              <Route path='/createbunga' element={<CreateBunga/>} />
              <Route path="/flower/edit/:id" element={<EditBunga />} />
            </Routes>
          </Suspense>
        </CSSTransition>
      </TransitionGroup>
    );
  }
  const handleNavLinkClick = (link) => {
    setActiveLink(link);
    setTimeout(() => setActiveLink(null), 1000);
  };
  return (
    
    <Router>
      <div style={{ position: 'relative' }}>
      <ParticlesBackground />
      <HandleMarsRenderer />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
            <div className='container'>
              <a className='navbar-brand animate__animated animate__pulse' href='/'>SFS284</a>
              <button
                className='navbar-toggler'
                type='button'
                data-bs-toggle='collapse'
                data-bs-target="#navbarSupportedContent"
                aria-controls='navbarSupportedContent'
                aria-expanded='false'
                aria-label='Toggle navigation'
              >
                <span className='navbar-toggler-icon'></span>
              </button>
              <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                <ul className="navbar-nav me-auto">
                  {[
                    { path: '/detector', label: 'Detector' },
                    { path: '/listbunga', label: 'List' },
                    { path: '/contact', label: 'Contact us' },
                    { path: '/aboutus', label: 'About us' },
                    (token ? { path: '/feedback', label: 'Feedback' } : {})
                  ].map((item) => (
                    <li className="nav-item" key={item.path}>
                      <NavLink
                        to={item.path}
                        className={({ isActive }) => 
                          `nav-link ${isActive ? "active" : ""} ${
                            activeLink === item.path ? "animate__animated animate__pulse" : ""
                          }`
                        }
                        onClick={() => handleNavLinkClick(item.path)}
                      >
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
                <div className="d-flex">
                  {token ? (
                    <>
                     <span className="navbar-text me-2">{userName}</span>
                      <NavLink className="btn btn-danger" to="/logout">
                        Logout
                      </NavLink>
                    </>
                  ) : (
                    <NavLink className="btn btn-success" to="/login">Login</NavLink>
                  )}
                </div>
              </div>
            </div>
          </nav>
          <AnimatedRoutes />
        </div>
      </div>
    </Router>
  );
}

export default App;
