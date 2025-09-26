// src/pages/MainPage.jsx
import { Pencil, Eye } from "lucide-react";
import { useState, useContext, useEffect } from "react";
import { AppContext } from "../contexts/AppContext";
import InvoiceFrom from "../components/InvoiceFrom";
import TemplateGrid from "../components/TemplateGrid";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  const {
    invoiceTitle,
    setInvoiceTitle,
    invoiceData,
    setInvoiceData,
    setSelectedTemplate,
  } = useContext(AppContext);

  // Check if mobile device
  useEffect(() => {
    document.title = "Generate Invoice || Invoice Generator";
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 992);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Validate items before preview
  const validateItems = () => {
    if (!invoiceData.items || invoiceData.items.length === 0) {
      toast.error("Please add at least one item to the invoice");
      return false;
    }

    const hasInvalidItem = invoiceData.items.some(
      (item) => !item.name || !item.qty || !item.amount || item.amount <= 0
    );

    if (hasInvalidItem) {
      toast.error("Please enter valid name, quantity and amount for all items");
      return false;
    }

    // Validate company basic info
    if (!invoiceData.company?.name) {
      toast.error("Please enter company name");
      return false;
    }

    if (!invoiceData.invoice?.number) {
      toast.error("Please enter invoice number");
      return false;
    }

    return true;
  };

  const handleTemplateClick = (templateId) => {
    console.log("Template clicked:", templateId);
    console.log("Current invoice data:", invoiceData);

    if (!validateItems()) {
      return;
    }

    // Add animation feedback
    setSelectedTemplate(templateId);
    
    // Show loading toast
    toast.loading(`Loading ${templateId} template...`, { duration: 500 });
    
    // Add smooth transition before navigation
    setTimeout(() => {
      navigate("/PreviewPage");
    }, 500);
  };

  const handleQuickPreview = () => {
    if (!validateItems()) {
      return;
    }

    setSelectedTemplate('template4'); // Default to template4 for quick preview
    toast.success("Opening preview...");
    
    setTimeout(() => {
      navigate("/PreviewPage");
    }, 300);
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setInvoiceTitle(newTitle);
    setInvoiceData((prev) => ({
      ...prev,
      title: newTitle,
    }));
  };

  const handleTitleEdit = () => {
    setIsEditingTitle(true);
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
    // Auto-save title
    if (invoiceTitle.trim() === "") {
      setInvoiceTitle("Untitled Invoice");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setIsEditingTitle(false);
    }
  };

  // Calculate total items and amount
  const totalItems = invoiceData.items?.length || 0;
  const totalAmount = invoiceData.items?.reduce((sum, item) => 
    sum + (item.qty * item.amount), 0) || 0;

  return (
    <div className="mainpage container-fluid bg-light min-vh-100 py-3 py-lg-4">
      <div className="container">
        {/* Animated Title bar with stats */}
        <div className="bg-white border rounded shadow-sm p-3 mb-4 animate-slide-down">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="d-flex align-items-center">
                {isEditingTitle ? (
                  <input
                    type="text"
                    className="form-control form-control-lg border-primary shadow-sm animate-pop-in"
                    autoFocus
                    onBlur={handleTitleBlur}
                    onKeyPress={handleKeyPress}
                    onChange={handleTitleChange}
                    value={invoiceTitle}
                    placeholder="Enter invoice title..."
                    style={{ transition: 'all 0.3s ease' }}
                  />
                ) : (
                  <>
                    <h4 className="mb-0 me-3 text-truncate">
                      {invoiceTitle || "Untitled Invoice"}
                    </h4>
                    <button
                      className="btn btn-outline-primary btn-sm rounded-circle p-2"
                      onClick={handleTitleEdit}
                      title="Edit title"
                      style={{ 
                        width: '40px', 
                        height: '40px',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <Pencil size={18} />
                    </button>
                  </>
                )}
              </div>
            </div>
            
            <div className="col-md-6 mt-2 mt-md-0">
              <div className="d-flex justify-content-md-end align-items-center gap-3">
                {/* Stats */}
                <div className="text-end">
                  <small className="text-muted d-block">Items: {totalItems}</small>
                  <small className="text-muted d-block">
                    Total: ₹{totalAmount.toFixed(2)}
                  </small>
                </div>
                
                {/* Quick Preview Button */}
                <button
                  className="btn btn-primary btn-sm d-flex align-items-center gap-2"
                  onClick={handleQuickPreview}
                  disabled={totalItems === 0}
                >
                  <Eye size={16} />
                  {isMobile ? "Preview" : "Quick Preview"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Invoice form and template grid with improved layout */}
        <div className="row g-4 align-items-stretch">
          {/* Invoice form - Full width on mobile, half on desktop */}
          <div className="col-12 col-lg-6">
            <div 
              className="bg-white border rounded shadow-sm p-3 p-lg-4 h-100 animate-fade-in"
              style={{ 
                animationDelay: '0.1s',
                transition: 'transform 0.3s ease'
              }}
            >
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="mb-0 text-primary">
                  <i className="bi bi-receipt me-2"></i>
                  Invoice Details
                </h5>
                <span className="badge bg-primary">{totalItems} items</span>
              </div>
              <InvoiceFrom />
            </div>
          </div>

          {/* Template grid - Full width on mobile, half on desktop */}
          <div className="col-12 col-lg-6">
            <div 
              className="bg-white border rounded shadow-sm p-3 p-lg-4 h-100 animate-fade-in"
              style={{ 
                animationDelay: '0.2s',
                transition: 'transform 0.3s ease'
              }}
            >
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="mb-0 text-primary">
                  <i className="bi bi-layout-wtf me-2"></i>
                  Choose Template
                </h5>
                <span className="badge bg-success">Click to preview</span>
              </div>
              <TemplateGrid onTemplateClick={handleTemplateClick} />
            </div>
          </div>
        </div>

        {/* Mobile floating action button */}
        {isMobile && totalItems > 0 && (
          <div className="position-fixed bottom-0 end-0 p-3 animate-bounce-in" style={{ zIndex: 1050 }}>
            <div className="bg-primary rounded-circle shadow-lg p-3">
              <button
                className="btn btn-primary rounded-circle p-0 d-flex align-items-center justify-content-center"
                style={{ width: '60px', height: '60px' }}
                onClick={handleQuickPreview}
                title="Quick Preview"
              >
                <Eye size={24} className="text-white" />
              </button>
            </div>
          </div>
        )}

        {/* Empty state message */}
        {totalItems === 0 && (
          <div className="text-center mt-5 animate-fade-in">
            <div className="bg-white border rounded p-5">
              <i className="bi bi-receipt display-1 text-muted mb-3"></i>
              <h4 className="text-muted">No items added yet</h4>
              <p className="text-muted">Start by adding items to your invoice on the left side.</p>
            </div>
          </div>
        )}
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes popIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes bounceIn {
          from {
            opacity: 0;
            transform: scale(0) translateY(50px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        .animate-slide-down {
          animation: slideDown 0.5s ease-out;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        
        .animate-pop-in {
          animation: popIn 0.3s ease-out;
        }
        
        .animate-bounce-in {
          animation: bounceIn 0.5s ease-out;
        }
        
        .mainpage .card-hover:hover {
          transform: translateY(-5px);
          transition: transform 0.3s ease;
        }
        
        @media (max-width: 991.98px) {
          .mainpage .container {
            padding-left: 10px;
            padding-right: 10px;
          }
          
          .mainpage .bg-white {
            margin-bottom: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default MainPage;