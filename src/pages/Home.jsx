import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Shield, RefreshCw, Server, ExternalLink } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import './Home.css';
const url1 = import.meta.env.VITE_SS_URL1
const url2 = import.meta.env.VITE_SS_URL2

const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const featuresRef = useRef(null);
  const loginRef = useRef(null);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      loginRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
      <div className="home-page">
        <nav className="navbar">
          <div className="container navbar-container">
            <div className="nav-left">
              <Server className="nav-logo" />
              <span className="nav-brand">WakeWeb</span>
            </div>
            <div className="nav-right">
              <button onClick={scrollToFeatures} className="nav-link">Features</button>
              {!isAuthenticated && (
                  <button
                      className="nav-button"
                      onClick={handleGetStarted}
                  >
                    Get Started
                  </button>
              )}
              {isAuthenticated && (
                  <button
                      className="nav-button"
                      onClick={() => navigate('/dashboard')}
                  >
                    Dashboard
                  </button>
              )}
            </div>
          </div>
        </nav>

        <section className="hero-section">
          <div className="container">
            <div className="hero-content">
              <h1 className="hero-title">Keep Your Servers Always Awake</h1>
              <p className="hero-subtitle">
                Prevent cold starts and maintain optimal performance with our intelligent monitoring system.
              </p>
              <button
                  className="btn btn-primary hero-cta"
                  onClick={handleGetStarted}
              >
                Get Started
              </button>
            </div>
            <div className="hero-image">
              <Server size={280} className="server-icon" />
            </div>
          </div>
        </section>

        <section ref={featuresRef} className="features-section">
          <div className="container">
            <h2 className="section-title">Why Choose WakeWeb?</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">
                  <Zap size={40} />
                </div>
                <h3>Lightning Fast</h3>
                <p>Experience rapid response times and instant notifications.</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <Shield size={40} />
                </div>
                <h3>Always Awake</h3>
                <p>Keep your services running without interruptions or cold starts.</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <RefreshCw size={40} />
                </div>
                <h3>Easy Setup</h3>
                <p>Get started in minutes with our simple interface.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="screenshots-section">
          <div className="container">
            <h2 className="section-title">See WakeWeb in Action</h2>
            <div className="screenshots-grid">
              <div className="screenshot-card">
                <img src={url1} alt="Dashboard Screenshot" className="screenshot-img" />
                <p className="screenshot-caption">Intuitive Dashboard</p>
              </div>
              <div className="screenshot-card">
                <img src={url2} alt="Monitoring Screenshot" className="screenshot-img" />
                <p className="screenshot-caption">Real-time Monitoring</p>
              </div>
            </div>
          </div>
        </section>

        <section ref={loginRef} className="cta-section">
          <div className="container">
            <div className="cta-content">
              <h2>Ready to Keep Your Servers Awake?</h2>
              <p>Join developers who trust WakeWeb to ensure their applications stay responsive.</p>
              {!isAuthenticated && (
                  <div className="auth-form-container">
                    <div className="auth-form">
                      <h2 className="auth-form-title text-black">Login to Your Account</h2>
                      <div className="oauth-buttons">
                        <a href={`${API_URL}/oauth2/authorization/google`} className="auth-submit-button google-btn">
                          Continue with Google
                        </a>
                        <a href={`${API_URL}/oauth2/authorization/github`} className="auth-submit-button github-btn">
                          Continue with GitHub
                        </a>
                      </div>
                    </div>
                  </div>
              )}
            </div>
          </div>
        </section>
      </div>
  );
};

export default Home;