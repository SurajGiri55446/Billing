import { useClerk, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import "../styles/menubar.css"; // ✅ correct relative path



const Menubar = () => {
  const { openSignIn } = useClerk();
  const { setInvoiceData, setSelectedTemplate, setInvoiceTitle, initialInvoiceData } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogin = () => {
    openSignIn();
    setIsMobileMenuOpen(false);
  };

  const handleGenerateClick = () => {
    setInvoiceData(initialInvoiceData);
    setSelectedTemplate("template1");
    setInvoiceTitle("New Invoice");
    navigate("/generate");
    setIsMobileMenuOpen(false);
  };

  const handleNavLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={`navbar navbar-expand-lg navbar-dark sticky-top transition-all ${isScrolled ? 'nav-scrolled py-2' : 'nav-transparent py-3'}`}>
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/" onClick={handleNavLinkClick}>
          <div className="logo-container position-relative">
            <span 
              className="fw-bolder fs-3 text-white"
              style={{ letterSpacing: "-0.5px" }}
            >
              QuickInvoice
            </span>
            <div className="logo-dot"></div>
          </div>
        </Link>
        
        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation"
        >
          <span className={`navbar-toggler-icon ${isMobileMenuOpen ? 'toggler-open' : ''}`}></span>
        </button>
        
        <div className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2 mobile-nav-list">
            <li className="nav-item">
              <Link 
                className={`nav-link fw-medium position-relative px-3 py-2 rounded ${isActiveLink('/') ? 'nav-link-active' : 'nav-link-inactive'}`}
                to="/"
                onClick={handleNavLinkClick}
              >
                <i className="bi bi-house me-2 d-lg-none"></i>
                Home
                {isActiveLink('/') && <span className="nav-indicator"></span>}
              </Link>
            </li>

            <SignedIn>
              <li className="nav-item">
                <Link 
                  className={`nav-link fw-medium position-relative px-3 py-2 rounded ${isActiveLink('/DashBox') ? 'nav-link-active' : 'nav-link-inactive'}`}
                  to="/DashBox"
                  onClick={handleNavLinkClick}
                >
                  <i className="bi bi-speedometer2 me-2 d-lg-none"></i>
                  Dashboard
                  {isActiveLink('/DashBox') && <span className="nav-indicator"></span>}
                </Link>
              </li>
              
              <li className="nav-item">
                <Link
                  className={`nav-link fw-medium position-relative px-3 py-2 rounded ${isActiveLink('/generate') ? 'nav-link-active' : 'nav-link-inactive'}`}
                  to="/generate"
                  onClick={handleGenerateClick}
                >
                  <i className="bi bi-plus-circle me-2"></i>
                  Generate
                  {isActiveLink('/generate') && <span className="nav-indicator"></span>}
                </Link>
              </li>
              
              <li className="nav-item ms-lg-2 mt-lg-0 mt-3">
                <div className="user-avatar-container">
                  <UserButton 
                    appearance={{
                      elements: {
                        userButtonAvatarBox: {
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          transition: 'all 0.3s ease'
                        },
                        userButtonOuterIdentifier: {
                          color: '#ffffff'
                        }
                      }
                    }}
                  />
                </div>
              </li>
            </SignedIn>

            <SignedOut>
              <li className="nav-item">
                <button
                  className="btn btn-light rounded-pill px-4 py-2 fw-medium nav-login-btn shadow-sm w-100 w-lg-auto"
                  onClick={handleLogin}
                >
                  <i className="bi bi-box-arrow-in-right me-2"></i>
                  Login / Signup
                </button>
              </li>
            </SignedOut>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Menubar;