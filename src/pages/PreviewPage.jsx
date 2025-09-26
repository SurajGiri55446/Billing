import { use, useContext, useEffect, useRef, useState } from "react";
import { templates } from "../assets/assets";
import { AppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import InvoicePreview from "../components/InvoicePreview";
import {
  deleteInvoice,
  saveInvoice,
  sendinvoice,
} from "../services/InvoiceServices";
import { toast } from "react-toastify";
import { Loader2, Download, Mail, Save, Trash2, ArrowLeft, Send } from "lucide-react";
import html2canvas from "html2canvas";
import { uploadInvoiceThumbnail } from "../services/cloudinaryService";
import { generatePdfFromElement } from "../Util/pdfUtil";
import { useAuth, useUser } from "@clerk/clerk-react";
import "../pagesStyle/previewpage.css";

const PreviewPage = () => {
  const previewRef = useRef();
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const { user } = useUser();
  const { selectedTemplate, invoiceData, setSelectedTemplate, baseUrl } =
    useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [customerEmail, setCustomerEmail] = useState("");
  const [emailing, setEmailing] = useState(false);
  const [activeTab, setActiveTab] = useState("preview");

  useEffect(() => {
    document.title = "Invoice Preview || Invoice Generator";
  }, []);

  // ✅ Save and Exit handler
  const handleSaveAndExit = async () => {
    try {
      setLoading(true);

      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#fff",
        scrollY: -window.scrollY,
      });

      const imageData = canvas.toDataURL("image/png");
      const thumbnailUrl = await uploadInvoiceThumbnail(imageData);

      const payload = {
        ...invoiceData,
        thumbnailUrl,
        clerkId: user.id,
        template: selectedTemplate,
      };
      const token = await getToken();
      const response = await saveInvoice(baseUrl, payload, token);

      if (response.status === 200) {
        toast.success("✅ Invoice saved successfully");
        navigate("/DashBox", { state: { saved: true } });
      } else {
        toast.error("❌ Something went wrong while saving.");
      }
    } catch (error) {
      toast.error(`❌ Failed to save invoice: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete Invoice handler
  const handleDelete = async () => {
    if (!invoiceData.id) {
      toast.error("Invalid invoice. Cannot delete.");
      return;
    }
    
    if (!window.confirm("Are you sure you want to delete this invoice? This action cannot be undone.")) {
      return;
    }

    const token = await getToken();
    try {
      const response = await deleteInvoice(baseUrl, invoiceData.id, token);
      if (response.status === 200 || response.status === 204) {
        toast.success("Invoice deleted successfully");
        navigate("/DashBox");
      } else {
        toast.error("Unable to delete invoice.");
      }
    } catch (error) {
      toast.error(`Failed to delete invoice`);
    }
  };

  const handleDownloadPdf = async () => {
    if (!previewRef.current) return;
    try {
      setDownloading(true);
      await generatePdfFromElement(
        previewRef.current,
        `invoice_${Date.now()}.pdf`
      );
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      toast.error(`Failed to generate invoice: ${error.message}`);
    } finally {
      setDownloading(false);
    }
  };

  const handleSendEmail = async () => {
    if (!previewRef.current || !customerEmail) {
      return toast.error("Please enter a valid email and try again.");
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerEmail)) {
      return toast.error("Please enter a valid email address.");
    }

    try {
      setEmailing(true);

      const pdfBlob = await generatePdfFromElement(
        previewRef.current,
        `invoice_${Date.now()}.pdf`,
        true
      );

      const formData = new FormData();
      formData.append("file", pdfBlob, "invoice.pdf");
      formData.append("email", customerEmail);
      const token = await getToken();
      const response = await sendinvoice(baseUrl, formData, token);

      if (response.status === 200) {
        toast.success("📧 Email sent successfully!");
        setShowModal(false);
        setCustomerEmail("");
      } else {
        toast.error("Failed to send email.");
      }
    } catch (error) {
      toast.error("Failed to send email: " + error.message);
    } finally {
      setEmailing(false);
    }
  };

  useEffect(() => {
    if (!invoiceData || !invoiceData.items?.length) {
      toast.error("Invoice data is empty");
      navigate("/DashBox");
    }
  }, [invoiceData, navigate]);

  return (
    <div className="preview-page min-vh-100 bg-gradient">
      {/* Header Section */}
      <div className="preview-header bg-white shadow-sm border-bottom">
        <div className="container-fluid">
          <div className="row align-items-center py-3">
            <div className="col-md-6">
              <div className="d-flex align-items-center gap-3">
                <button
                  onClick={() => navigate("/DashBox")}
                  className="btn btn-outline-primary btn-sm d-flex align-items-center gap-2"
                >
                  <ArrowLeft size={16} />
                  Back to Dashboard
                </button>
                <h2 className="h4 mb-0 text-primary fw-bold">Invoice Preview</h2>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex justify-content-md-end gap-2">
                <div className="btn-group" role="group">
                  <button
                    className={`btn btn-sm ${activeTab === "preview" ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => setActiveTab("preview")}
                  >
                    Preview
                  </button>
                  <button
                    className={`btn btn-sm ${activeTab === "actions" ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => setActiveTab("actions")}
                  >
                    Actions
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Template Selection */}
      <div className="container-fluid py-4">
        <div className="template-selector-section">
          <div className="d-flex flex-column align-items-center mb-4">
            <h5 className="text-muted mb-3">Choose Template Style</h5>
            <div className="template-buttons d-flex flex-wrap justify-content-center gap-2">
              {templates.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setSelectedTemplate(id)}
                  className={`btn template-btn rounded-pill px-4 py-2 d-flex align-items-center gap-2 ${
                    selectedTemplate === id
                      ? "btn-primary template-btn-active"
                      : "btn-outline-primary"
                  }`}
                >
                  <i className={`bi bi-layout-${id === 'template1' ? 'text-sidebar' : id === 'template2' ? 'text-window' : 'sidebar'}`}></i>
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons-section">
            <div className="row g-3 justify-content-center">
              <div className="col-auto">
                <button
                  className="btn btn-success btn-lg d-flex align-items-center gap-2 px-4 action-btn"
                  onClick={handleSaveAndExit}
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="spin-animation" size={18} />
                  ) : (
                    <Save size={18} />
                  )}
                  {loading ? "Saving..." : "Save Invoice"}
                </button>
              </div>

              <div className="col-auto">
                <button
                  className="btn btn-info btn-lg d-flex align-items-center gap-2 px-4 action-btn"
                  onClick={handleDownloadPdf}
                  disabled={downloading}
                >
                  {downloading ? (
                    <Loader2 className="spin-animation" size={18} />
                  ) : (
                    <Download size={18} />
                  )}
                  {downloading ? "Downloading..." : "Download PDF"}
                </button>
              </div>

              <div className="col-auto">
                <button 
                  className="btn btn-warning btn-lg d-flex align-items-center gap-2 px-4 action-btn"
                  onClick={() => setShowModal(true)}
                >
                  <Send size={18} />
                  Send Email
                </button>
              </div>

              {invoiceData.id && (
                <div className="col-auto">
                  <button 
                    className="btn btn-danger btn-lg d-flex align-items-center gap-2 px-4 action-btn"
                    onClick={handleDelete}
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Invoice Preview */}
        <div className="preview-container mt-4">
          <div className="row justify-content-center">
            <div className="col-12 col-xxl-10">
              <div className="preview-wrapper bg-white rounded-3 shadow-lg border p-4">
                <div ref={previewRef} className="invoice-preview-container">
                  <InvoicePreview
                    invoiceData={invoiceData}
                    template={selectedTemplate}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Email Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title d-flex align-items-center gap-2">
                  <Mail size={20} />
                  Send Invoice via Email
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body py-4">
                <div className="mb-3">
                  <label htmlFor="customerEmail" className="form-label fw-semibold">
                    Customer Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    id="customerEmail"
                    placeholder="Enter customer email address"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendEmail()}
                  />
                  <div className="form-text">
                    The invoice will be sent as a PDF attachment to this email address.
                  </div>
                </div>
              </div>
              <div className="modal-footer border-0">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary d-flex align-items-center gap-2"
                  onClick={handleSendEmail}
                  disabled={emailing || !customerEmail}
                >
                  {emailing ? (
                    <Loader2 className="spin-animation" size={18} />
                  ) : (
                    <Send size={18} />
                  )}
                  {emailing ? "Sending..." : "Send Invoice"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviewPage;