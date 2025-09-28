import { Link } from "react-router-dom";
import number1 from "../assets/number1.png";
import number2 from "../assets/number2.png";
import number3 from "../assets/number3.png";
import number4 from "../assets/number4.png";
import template1 from "../assets/template1.png";
import template2 from "../assets/template2.png";
import template3 from "../assets/template3.png";
import template4 from "../assets/template4.png";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../components/Logo";
import { useEffect, useState, useRef } from "react";
import "../pagesStyle/LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [isNavbarDark, setIsNavbarDark] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const featuresRef = useRef([]);

  useEffect(() => {
    setIsVisible(true);
    setIsNavbarDark(true);
    
    // Intersection Observer for better scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            
            // Add staggered animation for cards
            if (entry.target.classList.contains('step-card')) {
              const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
              entry.target.style.animationDelay = `${index * 0.1}s`;
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observer.observe(el));

    // Auto-rotate features for demo effect
    const featureInterval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 4);
    }, 5000);

    return () => {
      observer.disconnect();
      clearInterval(featureInterval);
      setIsNavbarDark(false);
    };
  }, []);

   

  const handleActionButton = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
       navigate("/generate");
    }
    console.log("Create Invoice Button Clicked - Navigating to /generate");
    
    // Multiple navigation approaches for reliability
    try {
      navigate("/generate");
    } catch (error) {
      console.error("Navigation error:", error);
      // Fallback navigation
      window.location.href = "/generate";
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const steps = [
    { 
      num: number1, 
      title: "Enter Details", 
      text: "Quickly fill in your client's information—from descriptions and quantities to prices. Our intuitive form makes it a breeze!",
      icon: "bi bi-pencil-square",
      color: "#10b981"
    },
    { 
      num: number2, 
      title: "Choose Template", 
      text: "Browse our gallery of professionally designed templates. Pick one that matches your brand and style.",
      icon: "bi bi-palette",
      color: "#3b82f6"
    },
    { 
      num: number3, 
      title: "Preview Invoice", 
      text: "See exactly how your invoice will look before sending it. Make any last-minute adjustments with ease.",
      icon: "bi bi-eye",
      color: "#8b5cf6"
    },
    { 
      num: number4, 
      title: "Free", 
      text: "Save the invoice as PDF or share via link or email. Faster with professional invoices.",
      icon: "bi bi-currency-dollar",
      color: "#f59e0b"
    }
  ];

  const features = [
    { 
      img: template1, 
      title: "Easy to Fill Invoice Details", 
      text: "Quickly enter invoice information with a clean and guided form.",
      features: ["Autofill client and item details", "Smart input formatting", "Real-time total calculation"],
      reverse: false,
      icon: "bi bi-input-cursor-text",
      gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)"
    },
    { 
      img: template2, 
      title: "Beautiful Dashboard", 
      text: "Track invoices, manage clients, and view analytics in one place.",
      features: ["Visual charts & reports", "Filter & search features", "Dark/light theme support"],
      reverse: true,
      icon: "bi bi-speedometer2",
      gradient: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)"
    },
    { 
      img: template3, 
      title: "Invoice Preview and Voice Input", 
      text: "Preview invoices before sending and even fill data using voice input.",
      features: ["Instant PDF preview", "AI-powered voice entry", "Mobile & desktop optimized"],
      reverse: false,
      icon: "bi bi-mic",
      gradient: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)"
    },
    { 
      img: template4, 
      title: "Send Invoices Instantly", 
      text: "Send invoices to clients via email or shareable link with one click.",
      features: ["Email or PDF sharing", "Client tracking & notifications", "Integration with WhatsApp & Gmail"],
      reverse: true,
      icon: "bi bi-send",
      gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
    }
  ];

  return (
    <div className={`landing-page ${isVisible ? 'page-loaded' : ''}`}>
      {/* Navbar Theme Controller */}
      <div className={`navbar-theme-controller ${isNavbarDark ? 'navbar-dark' : 'navbar-light'}`} style={{display: 'none'}}></div>

      {/* Floating Background Elements */}
      <div className="floating-elements">
        <div className="floating-circle circle-1"></div>
        <div className="floating-circle circle-2"></div>
        <div className="floating-circle circle-3"></div>
        <div className="floating-circle circle-4"></div>
      </div>

      {/* Hero Section */}
      <header className="hero-section text-white text-center" id="hero">
        <div className="container">
          <div className="row justify-content-center align-items-center min-vh-100">
            <div className="col-lg-10 col-xl-8 animate-fade-up">
              
              
              <h1 className="display-3 fw-bold mb-4 hero-title">
                Create Professional Invoices 
                <span className="text-gradient-primary d-block">in Minutes, Not Hours</span>
              </h1>
              
              <p className="lead mb-5 fs-4 opacity-90 hero-subtitle">
                Stop wrestling with complicated software. <strong className="text-white">QuickInvoice</strong>{" "}
                helps you create, send, and track beautiful invoices effortlessly.
              </p>
              
              <div className="d-flex flex-column flex-sm-row justify-content-center gap-4 mb-5">
                <button 
                  className="btn btn-primary btn-lg hero-btn-primary"
                  onClick={handleActionButton}
                  style={{
                    position: 'relative',
                    zIndex: 1000
                  }}
                >
                  <i className="bi bi-lightning-fill me-2"></i>
                  Create Free Invoice
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    scrollToSection('how-it-works');
                  }}
                  className="btn btn-outline-light btn-lg rounded-xl px-5 py-3 shadow hover-lift secondary-cta"
                  style={{ position: 'relative', zIndex: 1000 }}
                >
                  <i className="bi bi-play-circle me-2"></i>
                  Read More
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="trust-indicators mb-5">
                <div className="d-flex flex-column flex-md-row align-items-center justify-content-center gap-4">
                  <div className="d-flex align-items-center">
                    <div className="security-badge me-3">
                      <i className="bi bi-shield-check fs-4 text-success"></i>
                    </div>
                    <span className="small">Bank-level Security</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="speed-badge me-3">
                      <i className="bi bi-lightning-charge fs-4 text-warning"></i>
                    </div>
                    <span className="small">30 Second Setup</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="free-badge me-3">
                      <i className="bi bi-gift fs-4 text-info"></i>
                    </div>
                    <span className="small">Free Forever Plan</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="row g-4 justify-content-center text-center stats-container">
                <div className="col-auto">
                  <div className="stat-item">
                    <h3 className="text-primary fw-bold mb-1">10K+</h3>
                    <small className="opacity-90">Happy Users</small>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="stat-item">
                    <h3 className="text-success fw-bold mb-1">50K+</h3>
                    <small className="opacity-90">Invoices Generated</small>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="stat-item">
                    <h3 className="text-warning fw-bold mb-1">99%</h3>
                    <small className="opacity-90">Satisfaction Rate</small>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="stat-item">
                    <h3 className="text-info fw-bold mb-1">24/7</h3>
                    <small className="opacity-90">Support Available</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div className="scroll-indicator animate-bounce">
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                scrollToSection('how-it-works');
              }}
              className="btn btn-link text-white text-decoration-none"
              style={{ position: 'relative', zIndex: 1000 }}
            >
              <i className="bi bi-chevron-down fs-2"></i>
            </button>
          </div>
        </div>
      </header>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-5 bg-gray-50 position-relative">
        <div className="container py-5">
          <div className="text-center mb-5">
            <span className="badge bg-primary bg-opacity-10 text-primary px-4 py-2 rounded-pill mb-3">
              <i className="bi bi-clock me-2"></i>
              Quick & Easy
            </span>
            <h2 className="display-4 fw-bold mb-3 animate-on-scroll section-title">
              Create Your First Invoice in <span className="text-gradient-primary">4 Simple Steps</span>
            </h2>
            <p className="lead text-muted animate-on-scroll section-subtitle">
              Our streamlined process gets you from zero to professional invoice in under 5 minutes
            </p>
          </div>
          
          <div className="row g-5 justify-content-center">
            {steps.map((step, index) => (
              <div key={index} className="col-md-6 col-lg-3 d-flex animate-on-scroll step-card">
                <div 
                  className="card h-100 shadow-sm border-0 text-center flex-fill hover-lift card-hover step-card-inner"
                  style={{ borderLeft: `4px solid ${step.color}` }}
                >
                  <div className="card-body p-4 d-flex flex-column">
                    <div className="step-header mb-4">
                      <div 
                        className="step-icon-container mx-auto mb-3 rounded-circle d-flex align-items-center justify-content-center"
                        style={{ 
                          backgroundColor: `${step.color}15`,
                          width: '80px',
                          height: '80px'
                        }}
                      >
                        <i className={`${step.icon} fs-3`} style={{ color: step.color }}></i>
                      </div>
                      <div 
                        className="step-number bg-gray-800 text-white rounded-circle d-flex align-items-center justify-content-center fw-bold position-absolute shadow-lg"
                        style={{ 
                          top: '-15px',
                          right: '-15px',
                          width: '40px',
                          height: '40px',
                          fontSize: '1.1rem',
                          backgroundColor: step.color
                        }}
                      >
                        {index + 1}
                      </div>
                    </div>
                    
                    <h5 className="card-title fw-bold mb-3" style={{ color: step.color }}>
                      {step.title}
                    </h5>
                    <p className="card-text text-muted small flex-grow-1 lh-base">
                      {step.text}
                    </p>
                    
              
                  </div>
                </div>
              </div>
            ))}
          </div>

     
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-5 position-relative">
        <div className="container py-5">
          <div className="text-center mb-5">
            <span className="badge bg-success bg-opacity-10 text-success px-4 py-2 rounded-pill mb-3">
              <i className="bi bi-star me-2 text-white"></i>
              Premium Features
            </span>
            <h2 className="display-4 fw-bold mb-3 text-gray-900 animate-on-scroll">
              Everything You Need to 
              <span className="text-gradient-primary d-block">Manage Your Invoicing</span>
            </h2>
            <p className="lead text-muted animate-on-scroll">
              Powerful tools designed for freelancers, small businesses, and enterprises
            </p>
          </div>

          {features.map((feature, index) => (
            <div key={index} className={`row align-items-center gy-5 my-5 animate-on-scroll feature-item ${feature.reverse ? 'flex-lg-row-reverse' : ''}`}>
              <div className="col-lg-6">
                <div className="feature-image-container position-relative text-center">
                  <div 
                    className="feature-badge shadow-lg"
                    style={{ background: feature.gradient }}
                  >
                    <i className={`${feature.icon} fs-2 text-white`}></i>
                  </div>
                  <img
                    src={feature.img}
                    alt={feature.title}
                    className="img-fluid rounded-3 shadow-lg hover-lift feature-img"
                    onError={(e) => {
                      e.target.src = `https://placehold.co/600x400/0d6efd/white?text=Feature+${index + 1}`;
                    }}
                  />
                  <div className="floating-shape bg-warning rounded-circle position-absolute"></div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className={`ps-lg-5 ${feature.reverse ? 'pe-lg-5 ps-lg-0' : ''}`}>
                  <div className="feature-number text-gray-200 opacity-50 display-1 fw-bold position-absolute">0{index + 1}</div>
                  <h3 className="fw-bold mb-4 display-5 position-relative text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-muted lead mb-4 fs-5 lh-base">
                    {feature.text}
                  </p>
                  <ul className="list-unstyled text-muted">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="mb-3 d-flex align-items-start">
                        <i 
                          className="bi bi-check-circle-fill me-3 fs-5 mt-1"
                          style={{ color: feature.gradient.split(' ')[1] }}
                        ></i>
                        <span className="fs-5 text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-5 bg-gray-50">
        <div className="container py-5">
          <div className="text-center mb-5">
            <span className="badge bg-warning bg-opacity-10 text-warning px-4 py-2 rounded-pill mb-3">
              <i className="bi bi-chat-quote me-2"></i>
              Customer Stories
            </span>
            <h2 className="display-4 fw-bold mb-3 animate-on-scroll">
              Loved by Businesses 
              <span className="text-gradient-primary d-block">Across the Globe</span>
            </h2>
          </div>
          <div className="row g-4 justify-content-center">
            {[
              { 
                name: "The Rock", 
                role: "Freelance Designer", 
                text: "QuickInvoice saved me hours of work each week! The templates are beautiful and my clients love the professionalism.", 
                rating: 5,
                avatar: "SJ"
              },
              { 
                name: "Jone Cena", 
                role: "Small Business Owner", 
                text: "Finally, an invoicing tool that's both powerful and easy to use. The dashboard gives me perfect visibility over my cash flow.", 
                rating: 5,
                avatar: "MC"
              },
              { 
                name: "Roman Reigns", 
                role: "Marketing Consultant", 
                text: "The voice input feature is a game-changer. I can create invoices while commuting! Support team is incredibly responsive too.", 
                rating: 5,
                avatar: "ED"
              }
            ].map((testimonial, index) => (
              <div key={index} className="col-md-6 col-lg-4 animate-on-scroll">
                <div className="card h-100 border-0 shadow-sm hover-lift testimonial-card">
                  <div className="card-body p-4 d-flex flex-column">
                    <div className="stars mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <i key={i} className="bi bi-star-fill text-warning me-1"></i>
                      ))}
                    </div>
                    <p className="card-text text-muted mb-4 fs-6 lh-base fst-italic">
                      "{testimonial.text}"
                    </p>
                    <div className="mt-auto d-flex align-items-center">
                      <div 
                        className="avatar bg-gradient-primary rounded-circle d-flex align-items-center justify-content-center text-white fw-bold me-3 shadow"
                        style={{ width: '50px', height: '50px' }}
                      >
                        {testimonial.avatar}
                      </div>
                      <div className="text-start">
                        <h6 className="mb-0 fw-bold text-gray-900">{testimonial.name}</h6>
                        <small className="text-muted">{testimonial.role}</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="generate-invoice" className="py-5 text-center text-white position-relative overflow-hidden cta-section">
        <div className="container py-5 position-relative">
          <div className="animate-on-scroll">
            <span className="badge bg-white bg-opacity-20 px-4 py-2 rounded-pill mb-3">
              <i className="bi bi-rocket me-2"></i>
              Ready to Start?
            </span>
            <h2 className="display-3 fw-bold mb-4">
              Start Creating Professional 
              <span className="text-warning d-block">Invoices Today</span>
            </h2>
            <p className="lead mb-4 mx-auto fs-4 opacity-90" style={{ maxWidth: "600px" }}>
              Join thousands of businesses who trust QuickInvoice. No credit card required, 
              no hidden fees. Start free and upgrade when you need more.
            </p>
            
            <div className="d-flex flex-column flex-sm-row justify-content-center gap-3 mb-4">
              <button
                className="btn btn-lg btn-warning fw-bold rounded-xl px-5 py-3 shadow-lg hover-lift-glow"
                onClick={handleActionButton}
                style={{
                  position: 'relative',
                  zIndex: 1000
                }}
              >
                <i className="bi bi-lightning-fill me-2"></i>
                Generate Your First Invoice - Free!
              </button>
             
            </div>
            
            <div className="row justify-content-center text-center mt-4">
              <div className="col-auto">
                <i className="bi bi-check2-circle me-2 text-success"></i>
                <span className="small">No credit card required</span>
              </div>
              <div className="col-auto">
                <i className="bi bi-check2-circle me-2 text-success"></i>
                <span className="small">Free forever plan</span>
              </div>
              <div className="col-auto">
                <i className="bi bi-check2-circle me-2 text-success"></i>
                <span className="small">Setup in 2 minutes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-5 bg-gray-900 text-white position-relative">
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-lg-4">
              <div className="animate-on-scroll">
                <Logo />
                <h5 className="text-white fw-bold mt-3 mb-3 text-warning">QuickInvoice</h5>
                <p className="mb-4 lead fs-5 text-gray-300">
                  Creating professional invoices made simple, fast, and effective for businesses of all sizes.
                </p>
                
                <div className="d-flex gap-3 mb-4">
                  {['twitter-x', 'facebook', 'linkedin', 'instagram', 'github'].map((social) => (
                    <a 
                      key={social} 
                      href="#" 
                      className="social-link text-gray-400 hover-lift text-decoration-none rounded-circle bg-gray-800 d-flex align-items-center justify-content-center"
                      style={{ width: '40px', height: '40px' }}
                    >
                      <i className={`bi bi-${social} fs-6`}></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="col-lg-2 col-md-4">
              <h6 className="text-white fw-bold mb-3">Product</h6>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="#" className="text-gray-400 text-decoration-none hover-text-white">Features</a></li>
                <li className="mb-2"><a href="#" className="text-gray-400 text-decoration-none hover-text-white">Templates</a></li>
                <li className="mb-2"><a href="#" className="text-gray-400 text-decoration-none hover-text-white">Pricing</a></li>
                <li className="mb-2"><a href="#" className="text-gray-400 text-decoration-none hover-text-white">API</a></li>
              </ul>
            </div>
            
            <div className="col-lg-2 col-md-4">
              <h6 className="text-white fw-bold mb-3">Resources</h6>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="#" className="text-gray-400 text-decoration-none hover-text-white">Documentation</a></li>
                <li className="mb-2"><a href="#" className="text-gray-400 text-decoration-none hover-text-white">Blog</a></li>
                <li className="mb-2"><a href="#" className="text-gray-400 text-decoration-none hover-text-white">Help Center</a></li>
                <li className="mb-2"><a href="#" className="text-gray-400 text-decoration-none hover-text-white">Community</a></li>
              </ul>
            </div>
            
            <div className="col-lg-2 col-md-4">
              <h6 className="text-white fw-bold mb-3">Company</h6>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="#" className="text-gray-400 text-decoration-none hover-text-white">About Us</a></li>
                <li className="mb-2"><a href="#" className="text-gray-400 text-decoration-none hover-text-white">Careers</a></li>
                <li className="mb-2"><a href="#" className="text-gray-400 text-decoration-none hover-text-white">Contact</a></li>
                <li className="mb-2"><a href="#" className="text-gray-400 text-decoration-none hover-text-white">Partners</a></li>
              </ul>
            </div>
            
           
          </div>
          
          <hr className="my-5 border-gray-700" />
          
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="mb-2 small text-gray-400">
                &copy; {new Date().getFullYear()} QuickInvoice. All Rights Reserved.
              </p>
              <p className="mb-0 small text-gray-500">
                Crafted with <i className="bi bi-heart-fill text-danger"></i> for freelancers and small businesses worldwide
              </p>
            </div>
            <div className="col-md-6 text-md-end">
              <div className="d-flex flex-wrap justify-content-md-end gap-3">
                <span className="small text-gray-400">
                  <i className="bi bi-shield-check text-success me-1"></i>
                  GDPR Compliant
                </span>
                <span className="small text-gray-400">
                  <i className="bi bi-globe text-info me-1"></i>
                  Global Service
                </span>
                <span className="small text-gray-400">
                  <i className="bi bi-arrow-repeat text-warning me-1"></i>
                  99.9% Uptime
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom Styles */}
      <style jsx>{`
        .landing-page {
          opacity: 0;
          transition: opacity 0.8s ease;
          font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
        }
        
        .landing-page.page-loaded {
          opacity: 1;
        }
        
        .hero-section {
          background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 50%, #7e22ce 100%);
          position: relative;
          overflow: hidden;
          padding-top: 80px;
        }
        
        .hero-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
                     radial-gradient(circle at 80% 20%, rgba(255,255,255,0.05) 0%, transparent 50%);
        }
        
        .text-gradient-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .hero-title {
          background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.2;
        }
        
        .hover-lift-glow {
          transition: all 0.3s ease;
        }
        
        .hover-lift-glow:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(99, 102, 241, 0.3) !important;
        }
        
        .primary-cta {
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
          border: none;
          transition: all 0.3s ease;
        }
        
        .secondary-cta {
          border-width: 2px;
          font-weight: 600;
        }
        
        .stats-container {
          border-top: 1px solid rgba(255,255,255,0.2);
          padding-top: 2rem;
          margin-top: 2rem;
        }
        
        .stat-item {
          padding: 0 1.5rem;
        }
        
        .floating-elements {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none !important;
          z-index: 0 !important;
        }
        
        .floating-circle {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
          animation: float 6s ease-in-out infinite;
          pointer-events: none !important;
        }
        
        .circle-1 {
          width: 200px;
          height: 200px;
          top: 10%;
          left: 10%;
          animation-delay: 0s;
        }
        
        .circle-2 {
          width: 150px;
          height: 150px;
          top: 60%;
          right: 10%;
          animation-delay: 2s;
        }
        
        .circle-3 {
          width: 100px;
          height: 100px;
          bottom: 20%;
          left: 20%;
          animation-delay: 4s;
        }
        
        .circle-4 {
          width: 120px;
          height: 120px;
          top: 30%;
          right: 20%;
          animation-delay: 1s;
        }
        
        .feature-badge {
          position: absolute;
          top: -20px;
          left: 50%;
          transform: translateX(-50%);
          width: 70px;
          height: 70px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }
        
        .feature-number {
          position: absolute;
          top: -40px;
          left: -30px;
          z-index: -1;
          line-height: 1;
        }
        
        .avatar {
          width: 40px;
          height: 40px;
        }
        
        .social-link {
          transition: all 0.3s ease;
        }
        
        .social-link:hover {
          color: #fff !important;
          transform: translateY(-2px);
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%) !important;
        }
        
        .step-card {
          animation-duration: 0.6s;
          animation-fill-mode: both;
        }
        
        .step-card-inner {
          transition: all 0.3s ease;
          border-radius: 12px;
        }
        
        .step-card-inner:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1) !important;
        }
        
        .animate-on-scroll.animated {
          animation: slideUp 0.6s ease-out;
        }
        
        .bg-gray-50 {
          background-color: #f8fafc;
        }
        
        .bg-gray-800 {
          background-color: #1f2937;
        }
        
        .bg-gray-900 {
          background-color: #111827;
        }
        
        .text-gray-300 {
          color: #d1d5db;
        }
        
        .text-gray-400 {
          color: #9ca3af;
        }
        
        .text-gray-500 {
          color: #6b7280;
        }
        
        .text-gray-700 {
          color: #374151;
        }
        
        .text-gray-900 {
          color: #111827;
        }
        
        .border-gray-700 {
          border-color: #374151 !important;
        }
        
        .bg-gray-200 {
          background-color: #e5e7eb;
        }
        
        .rounded-xl {
          border-radius: 12px !important;
        }
        
        .hover-text-white:hover {
          color: #fff !important;
        }
        
        .cta-section {
          background: linear-gradient(135deg, #1e40af 0%, #7c3aed 100%);
        }
        
        /* Button Click Fixes */
        .btn, button, [onClick] {
          pointer-events: auto !important;
          position: relative;
          z-index: 1000 !important;
        }
        
        .hero-btn-primary {
          z-index: 1000 !important;
          position: relative !important;
        }
        
        .hero-section .container {
          position: relative;
          z-index: 20;
        }
        
        .hero-section .row {
          position: relative;
          z-index: 30;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Mobile Optimizations */
        @media (max-width: 768px) {
          .hero-section .display-3 {
            font-size: 2.5rem !important;
          }
          
          .display-4, .display-5 {
            font-size: 2rem !important;
          }
          
          .feature-number {
            font-size: 4rem !important;
            top: -20px;
            left: -10px;
          }
          
          .stats-container .col-auto {
            margin-bottom: 1rem;
          }
          
          .hero-section {
            padding-top: 70px;
          }
        }
        
        @media (max-width: 576px) {
          .hero-section .display-3 {
            font-size: 2rem !important;
          }
          
          .btn-lg {
            padding: 0.8rem 1.5rem !important;
            font-size: 1rem !important;
          }
          
          .stat-item {
            padding: 0 1rem;
          }
          
          .step-card {
            margin-bottom: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;