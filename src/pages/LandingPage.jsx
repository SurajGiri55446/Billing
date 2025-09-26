import { Link } from "react-router-dom";
import number1 from "../assets/number1.png";
import number2 from "../assets/number2.png";
import number3 from "../assets/number3.png";
import number4 from "../assets/number4.png";
import feature1 from "../assets/feature1.png";
import feature2 from "../assets/feature2.png";
import feature3 from "../assets/feature3.png";
import feature4 from "../assets/feature4.png";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../components/Logo";
import { useEffect, useState } from "react";
import "../pagesStyle/LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Add scroll animation trigger
    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight - 100) {
          element.classList.add('animated');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleActionButton = () => {
    if (location.pathname === "/generate") {
      window.location.reload(); 
    } else {
      navigate("/generate");
    }
  };

  const features = [
    { 
      icon: "📝",
      title: "Easy Form Filling", 
      text: "Quickly enter invoice details with our intuitive form",
      color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    { 
      icon: "🎨",
      title: "Beautiful Templates", 
      text: "Choose from professionally designed invoice templates",
      color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    { 
      icon: "👁️",
      title: "Live Preview", 
      text: "See exactly how your invoice will look in real-time",
      color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    },
    { 
      icon: "🚀",
      title: "Instant Sharing", 
      text: "Send invoices via email or shareable links instantly",
      color: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
    }
  ];

  const steps = [
    { num: number1, title: "Enter Details", text: "Fill in client information, items, and pricing quickly" },
    { num: number2, title: "Choose Template", text: "Select from beautiful, professional templates" },
    { num: number3, title: "Preview & Edit", text: "Review and make adjustments before sending" },
    { num: number4, title: "Share & Get Paid", text: "Send invoices and track payments easily" }
  ];

  return (
    <div className={`landing-page ${isVisible ? 'page-loaded' : ''}`}>
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top custom-navbar">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <Logo />
            <span className="ms-2 brand-text">QuickInvoice</span>
          </Link>
          
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#features">Features</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#how-it-works">How It Works</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#templates">Templates</a>
              </li>
              <li className="nav-item">
                <button 
                  className="btn btn-warning btn-sm ms-2 fw-bold"
                  onClick={handleActionButton}
                >
                  Get Started With Sign in/Sign up
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section" id="hero">
        <div className="hero-background"></div>
        <div className="container">
          <div className="row align-items-center min-vh-100 py-5">
            <div className="col-lg-6">
              <div className="hero-content animate-fade-up">
                <h1 className="hero-title">
                  Create Professional 
                  <span className="text-gradient"> Invoices</span> 
                  in Minutes
                </h1>
                <p className="hero-subtitle">
                  Stop wasting time with complicated tools. QuickInvoice helps freelancers and small businesses create beautiful, professional invoices that get you paid faster.
                </p>
                <div className="hero-stats">
                  <div className="stat">
                    <span className="stat-number">10K+</span>
                    <span className="stat-label">Invoices Created</span>
                  </div>
                 
                  <div className="stat">
                    <span className="stat-number">4.9★</span>
                    <span className="stat-label">User Rating</span>
                  </div>
                </div>
                <div className="hero-buttons">
                  <button 
                    className="btn btn-primary btn-lg hero-btn-primary"
                    onClick={handleActionButton}
                  >
                    <i className="bi bi-lightning-fill me-2"></i>
                    Create Free Invoice
                  </button>
                  <a href="#features" className="btn btn-outline-light btn-lg hero-btn-secondary">
                    <i className="bi bi-play-circle me-2"></i>
                    Read more
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-image animate-float">
                <div className="floating-card card-1">
                  <div className="card-content">
                    <div className="card-header">
                      <span>INVOICE #001</span>
                      <span className="amount">Rs. 1,250.00</span>
                    </div>
                    <div className="card-body">
                      <div className="invoice-line"></div>
                      <div className="invoice-line"></div>
                      <div className="invoice-line short"></div>
                    </div>
                  </div>
                </div>
                <div className="floating-card card-2">
                  <div className="card-content">
                    <div className="card-header">
                      <span>RECEIPT #002</span>
                      <span className="amount">Rs. 850.00</span>
                    </div>
                    <div className="card-body">
                      <div className="invoice-line"></div>
                      <div className="invoice-line short"></div>
                    </div>
                  </div>
                </div>
                <div className="floating-card card-3">
                  <div className="card-content">
                    <div className="card-header">
                      <span>QUOTE #003</span>
                      <span className="amount">Rs. 2,100.00</span>
                    </div>
                    <div className="card-body">
                      <div className="invoice-line"></div>
                      <div className="invoice-line"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="scroll-indicator">
          <a href="#features" className="scroll-link">
            <div className="scroll-arrow"></div>
          </a>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="features-section">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <h2 className="section-title">Everything You Need to Get Paid Faster</h2>
            <p className="section-subtitle">Professional invoicing tools designed for modern businesses</p>
          </div>
          
          <div className="row g-4">
            {features.map((feature, index) => (
              <div key={index} className="col-md-6 col-lg-3">
                <div className="feature-card animate-on-scroll">
                  <div 
                    className="feature-icon"
                    style={{ background: feature.color }}
                  >
                    <span className="icon-emoji">{feature.icon}</span>
                  </div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-text">{feature.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="steps-section">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <h2 className="section-title">Simple as 1-2-3-4</h2>
            <p className="section-subtitle">Create your first invoice in under 5 minutes</p>
          </div>
          
          <div className="steps-container">
            {steps.map((step, index) => (
              <div key={index} className="step-item animate-on-scroll">
                <div className="step-number">
                  <span>{index + 1}</span>
                </div>
                <div className="step-content">
                  <div className="step-image">
                    <img 
                      src={step.num} 
                      alt={step.title}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                      }}
                    />
                    <div className="step-fallback">
                      <div 
                        className="fallback-icon"
                        style={{ 
                          background: features[index]?.color || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                        }}
                      >
                        {features[index]?.icon}
                      </div>
                    </div>
                  </div>
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-text">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Preview */}
      <section id="templates" className="templates-section">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <h2 className="section-title">Professional Templates</h2>
            <p className="section-subtitle">Choose from beautifully designed invoice templates</p>
          </div>
          
          <div className="templates-grid">
            {[feature1, feature2, feature3, feature4].map((template, index) => (
              <div key={index} className="template-card animate-on-scroll">
                <div className="template-image">
                  <img 
                    src={template} 
                    alt={`Template ${index + 1}`}
                    onError={(e) => {
                      e.target.src = `https://placehold.co/400x500/0d6efd/white?text=Template+${index + 1}`;
                    }}
                  />
                  <div className="template-overlay">
                    <button 
                      className="btn btn-light btn-sm"
                      onClick={handleActionButton}
                    >
                      Use Template
                    </button>
                  </div>
                </div>
                <div className="template-info">
                  <h4>Template {index + 1}</h4>
                  <span className="template-badge">Free</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card animate-on-scroll">
            <div className="cta-content">
              <h2>Ready to Create Your First Invoice?</h2>
              <p>Join thousands of businesses that trust QuickInvoice for their billing needs</p>
              <div className="cta-buttons">
                <button 
                  className="btn btn-primary btn-lg"
                  onClick={handleActionButton}
                >
                  <i className="bi bi-lightning-fill me-2"></i>
                  Start Free Now
                </button>
                <a href="#features" className="btn btn-outline-light btn-lg">
                  Learn More
                </a>
              </div>
              <div className="cta-features">
                <span><i className="bi bi-check-circle-fill me-2"></i>No credit card required</span>
                <span><i className="bi bi-check-circle-fill me-2"></i>Free forever plan</span>
                <span><i className="bi bi-check-circle-fill me-2"></i>Setup in 2 minutes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <Logo />
              <h5>QuickInvoice</h5>
              <p>Creating professional invoices made simple and fast</p>
            </div>
            
            <div className="footer-links">
              <div className="footer-column">
                <h6>Product</h6>
                <a href="#features">Features</a>
                <a href="#templates">Templates</a>
                <a href="#how-it-works">How It Works</a>
                <button onClick={handleActionButton}>Get Started</button>
              </div>
              
              <div className="footer-column">
                <h6>Company</h6>
                <a href="#">About Us</a>
                <a href="#">Blog</a>
                <a href="#">Contact</a>
                <a href="#">Careers</a>
              </div>
              
              <div className="footer-column">
                <h6>Support</h6>
                <a href="#">Help Center</a>
                <a href="#">FAQs</a>
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <div className="social-links">
              <a href="#"><i className="bi bi-twitter-x"></i></a>
              <a href="#"><i className="bi bi-facebook"></i></a>
              <a href="#"><i className="bi bi-linkedin"></i></a>
              <a href="#"><i className="bi bi-instagram"></i></a>
            </div>
            
            <div className="footer-copyright">
              <p>&copy; {new Date().getFullYear()} QuickInvoice. All rights reserved.</p>
              <p>Made with <i className="bi bi-heart-fill"></i> for small businesses</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;