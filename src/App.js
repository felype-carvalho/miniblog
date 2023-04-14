import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";

// context
import { AuthProvider } from './context/AuthContext';

// hooks
import { useState, useEffect } from "react";
import { useAuthentication } from "./hooks/useAuthentication";

// components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// pages
import About from './pages/About/About';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import CreatePost from './pages/CreatePost/CreatePost';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {

    const [user, setUser] = useState(undefined);
    const { auth } = useAuthentication();

    const loadingUser = user === undefined;

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user)
        });
    }, [auth]);

    if (loadingUser) {
        return <p>Carregando...</p>;
    }

    return (
        <div className="App">
            <AuthProvider value={{ user }}>
                <BrowserRouter>
                    <Navbar />
                    <div className='container'>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/posts/create" element={<CreatePost />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                        </Routes>
                    </div>
                    <Footer />
                </BrowserRouter>
            </AuthProvider>
        </div>
    );
}

export default App;
