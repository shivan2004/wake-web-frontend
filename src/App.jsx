import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/common/ProtectedRoute';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
    return (
        <Router>
            <AuthProvider>
                <div className="app-container">
                    <Header />
                    <main className="main-content">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route
                                path="/dashboard"
                                element={
                                    <ProtectedRoute>
                                        <Dashboard />
                                    </ProtectedRoute>
                                }
                            />
                            <Route path="/404" element={<NotFound />} />
                            <Route path="*" element={<Navigate to="/404" />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    theme="light"
                />
            </AuthProvider>
        </Router>
    );
}

export default App;