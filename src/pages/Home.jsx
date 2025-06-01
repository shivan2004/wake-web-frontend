import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Shield, RefreshCw, Server } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import './Home.css';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      const loginSection = document.getElementById('login-section');
      if (loginSection) {
        loginSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
      <div className="home-page">
        <section className="hero-section">
          <div className="container">
            <div className="hero-content">
              <h1 className="hero-title">Consistently awaken your backend</h1>
              <p className="hero-subtitle">
                Because even your servers need a good poke now and then. We'll keep your cold starts hot and your downtime down.
              </p>
              <button
                  className="btn btn-primary hero-cta"
                  onClick={handleGetStarted}
              >
                Start Pinging Your Servers
              </button>
            </div>
            <div className="hero-image">
              <Server size={280} className="server-icon" />
            </div>
          </div>
        </section>

        <section className="features-section">
          <div className="container">
            <h2 className="section-title">Why Choose WakeWeb?</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">
                  <Zap size={40} />
                </div>
                <h3>Lightning Fast</h3>
                <p>Experience rapid response times and instant notifications, ensuring your services stay responsive.</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <Shield size={40} />
                </div>
                <h3>Always Awake</h3>
                <p>Keep your services running without interruptions or cold starts. Never sleep on the job again.</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <RefreshCw size={40} />
                </div>
                <h3>Easy Setup</h3>
                <p>Get started in minutes with our simple interface. No complicated configurations, just quick results.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-section" id="login-section">
          <div className="container">
            <div className="cta-content">
              <h2>Ready to Keep Your Servers Awake?</h2>
              <p>Join thousands of developers who trust WakeWeb to ensure their applications stay responsive.</p>
              {!isAuthenticated && (
                  <div className="auth-form-container">
                    <div className="auth-form">
                      <h2 className="auth-form-title">Login to Your Account</h2>
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
              {isAuthenticated && (
                  <button
                      className="btn btn-primary"
                      onClick={() => navigate('/dashboard')}
                  >
                    Go to Dashboard
                  </button>
              )}
            </div>
          </div>
        </section>
      </div>
  );
};

export default Home;