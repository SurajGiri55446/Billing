import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AppContext } from "../contexts/AppContext";
import { getAllInvoices } from "../services/InvoiceServices";
import { Plus, Eye, FileText, Calendar, Download } from "lucide-react";
import { formatData } from "../Util/formatInvoice";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

const DashBox = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);

  const {
    baseUrl,
    setInvoiceData,
    setSelectedTemplate,
    setInvoiceTitle,
    initialInvoiceData,
  } = useContext(AppContext);

  const navigate = useNavigate();
  const { getToken } = useAuth();

  useEffect(() => {
    document.title="dashboard || Invoice"
    const fetchInvoice = async () => {
      try {
        setLoading(true);
        const token = await getToken();
        if (!token) {
          throw new Error("Auth token not found");
        }

        console.log("Token fetched:", token);
        const response = await getAllInvoices(baseUrl, token);
        console.log("Invoices response:", response.data);
        setInvoices(response.data);
      } catch (error) {
        console.error(
          "Error fetching invoices:",
          error.response?.data || error.message
        );
        toast.error("Failed to load invoices");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [baseUrl, getToken]);

  const handleViewClick = (invoice) => {
    setInvoiceData(invoice);
    setSelectedTemplate(invoice.template || "template1");
    setInvoiceTitle(invoice.title || "New Invoice");
    navigate("/PreviewPage");
  };

  const handleCreateNew = () => {
    setInvoiceTitle("New Invoice");
    setSelectedTemplate("template1");
    setInvoiceData(initialInvoiceData);
    navigate("/generate");
  };

  const handleDownload = (e, invoice) => {
    e.stopPropagation();
    // Add download functionality here
    toast.success(`Downloading ${invoice.title}`);
  };

  if (loading) {
    return (
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
        {[...Array(6)].map((_, idx) => (
          <div className="col" key={idx}>
            <div 
              className="card h-100 shadow-sm border-0 animate-pulse"
              style={{ minHeight: "270px" }}
            >
              <div className="card-img-top bg-light" style={{ height: "160px" }}></div>
              <div className="card-body">
                <div className="h5 bg-light rounded mb-2" style={{ height: "20px" }}></div>
                <div className="text-muted bg-light rounded" style={{ height: "16px", width: "80%" }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="dashboard-invoices">
      {/* Header Stats */}
      <div className="row mb-4">
        <div className="col-12 col-md-6 col-lg-3 mb-3">
          <div className="card bg-primary bg-opacity-10 border-0 shadow-sm">
            <div className="card-body py-3">
              <div className="d-flex align-items-center">
                <div className="bg-primary rounded-circle p-3 me-3">
                  <FileText size={24} className="text-white" />
                </div>
                <div>
                  <h6 className="card-title mb-0 text-muted">Total Invoices</h6>
                  <h4 className="mb-0 fw-bold text-primary">{invoices.length}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Grid */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
        {/* Create New Invoice Card */}
        <div className="col">
          <div
            style={{ minHeight: "270px" }}
            onClick={handleCreateNew}
            onMouseEnter={() => setHoveredCard('new')}
            onMouseLeave={() => setHoveredCard(null)}
            className="card h-100 d-flex justify-content-center align-items-center border-2 border-dashed border-light shadow-sm cursor-pointer card-hover new-invoice-card"
          >
            <div className={`transition-all ${hoveredCard === 'new' ? 'scale-110' : ''}`}>
              <div className="bg-primary bg-opacity-10 rounded-circle p-3 mb-3">
                <Plus size={32} className="text-primary" />
              </div>
              <h6 className="fw-semibold text-primary mb-1">Create New Invoice</h6>
              <small className="text-muted">Start from scratch</small>
            </div>
          </div>
        </div>

        {/* Invoice Cards */}
        {Array.isArray(invoices) && invoices.length > 0 ? (
          invoices.map((invoice, idx) => (
            <div className="col" key={idx}>
              <div
                className="card h-100 shadow-sm border-0 cursor-pointer card-hover invoice-card"
                onClick={() => handleViewClick(invoice)}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ 
                  minHeight: "270px",
                  transform: hoveredCard === idx ? 'translateY(-5px)' : 'translateY(0)'
                }}
              >
                {/* Thumbnail with Overlay */}
                <div className="position-relative overflow-hidden">
                  {invoice.thumbnailUrl ? (
                    <img
                      src={invoice.thumbnailUrl}
                      alt="Invoice thumbnail"
                      className="card-img-top"
                      style={{ 
                        height: "160px", 
                        objectFit: "cover",
                        transition: "transform 0.3s ease"
                      }}
                    />
                  ) : (
                    <div 
                      className="card-img-top d-flex align-items-center justify-content-center bg-light"
                      style={{ height: "160px" }}
                    >
                      <FileText size={48} className="text-muted opacity-50" />
                    </div>
                  )}
                  
                  {/* Hover Overlay */}
                  <div 
                    className={`position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50 transition-opacity ${
                      hoveredCard === idx ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <div className="d-flex gap-2">
                      <button 
                        className="btn btn-light btn-sm rounded-circle p-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewClick(invoice);
                        }}
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        className="btn btn-light btn-sm rounded-circle p-2"
                        onClick={(e) => handleDownload(e, invoice)}
                      >
                        <Download size={16} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Template Badge */}
                  <div className="position-absolute top-0 end-0 m-2">
                    <span className="badge bg-warning text-dark small">
                      {invoice.template || 'Template 1'}
                    </span>
                  </div>
                </div>

                <div className="card-body">
                  <h6 className="card-title mb-2 text-truncate" title={invoice.title}>
                    {invoice.title || 'Untitled Invoice'}
                  </h6>
                  
                  <div className="d-flex align-items-center text-muted small mb-2">
                    <Calendar size={14} className="me-1" />
                    <span>Updated: {formatData(invoice.createdAt)}</span>
                  </div>
                  
                  {invoice.amount && (
                    <div className="d-flex justify-content-between align-items-center">
                      <small className="text-muted">Total</small>
                      <strong className="text-success">
                        ${parseFloat(invoice.amount || 0).toFixed(2)}
                      </strong>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          // Empty State
          <div className="col-12">
            <div className="text-center py-5">
              <FileText size={64} className="text-muted mb-3 opacity-50" />
              <h5 className="text-muted">No invoices yet</h5>
              <p className="text-muted">Create your first invoice to get started</p>
              <button 
                className="btn btn-primary mt-2"
                onClick={handleCreateNew}
              >
                <Plus size={18} className="me-2" />
                Create First Invoice
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .dashboard-invoices {
          opacity: 0;
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        .card-hover {
          transition: all 0.3s ease;
        }
        
        .card-hover:hover {
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
        }
        
        .new-invoice-card {
          border-style: dashed !important;
          transition: all 0.3s ease;
        }
        
        .new-invoice-card:hover {
          border-color: #0d6efd !important;
          background-color: rgba(13, 110, 253, 0.05);
        }
        
        .invoice-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .border-dashed {
          border-style: dashed !important;
        }
        
        .scale-110 {
          transform: scale(1.1);
        }
        
        .transition-all {
          transition: all 0.3s ease;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
          .dashboard-invoices .col {
            margin-bottom: 1rem;
          }
          
          .card {
            margin-bottom: 0;
          }
          
          .btn-sm {
            padding: 0.25rem 0.5rem;
          }
        }
        
        /* Custom scrollbar for grid */
        .row {
          scrollbar-width: thin;
          scrollbar-color: rgba(0,0,0,0.1) transparent;
        }
        
        .row::-webkit-scrollbar {
          height: 6px;
        }
        
        .row::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .row::-webkit-scrollbar-thumb {
          background-color: rgba(0,0,0,0.1);
          border-radius: 3px;
        }
      `}</style>
    </div>
  );
};

export default DashBox;