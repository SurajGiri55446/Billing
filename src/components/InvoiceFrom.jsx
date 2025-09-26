import { useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import { assets } from "../assets/assets";

const InvoiceFrom = () => {
  const { invoiceData, setInvoiceData } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const addItem = () => {
    setInvoiceData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        { name: "", qty: "", amount: "", description: "", total: 0 },
      ],
    }));
  };

  const deleteItem = async (index) => {
    // Add delete animation
    const itemElement = document.getElementById(`item-${index}`);
    if (itemElement) {
      itemElement.style.transform = "translateX(-100%)";
      itemElement.style.opacity = "0";
      await new Promise((resolve) => setTimeout(resolve, 300));
    }

    const items = invoiceData.items.filter((_, i) => i !== index);
    setInvoiceData((prev) => ({ ...prev, items }));
  };

  const handleChange = (section, field, value) => {
    setInvoiceData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const handleSameAsBilling = () => {
    setInvoiceData((prev) => ({
      ...prev,
      shipping: { ...prev.billing },
    }));
  };

  const handleItemChange = (index, field, value) => {
    const items = [...invoiceData.items];
    items[index][field] = value;
    if (field === "qty" || field === "amount") {
      items[index].total = (items[index].qty || 0) * (items[index].amount || 0);
    }
    setInvoiceData((prev) => ({ ...prev, items }));
  };

  const calculateTotals = () => {
    const subtotal = invoiceData.items.reduce(
      (sum, item) => sum + (item.total || 0),
      0
    );
    const taxRate = Number(invoiceData.tax || 0);
    const taxAmount = (subtotal * taxRate) / 100;
    const grandTotal = subtotal + taxAmount;
    return { subtotal, taxAmount, grandTotal };
  };

  const { subtotal, taxAmount, grandTotal } = calculateTotals();

const handleLogoUpload = async (e) => {
  const file = e.target.files[0];

  if (!file) return; // No file selected

  setIsLoading(true); // Show loader

  // Optional delay to simulate upload
  await new Promise((resolve) => setTimeout(resolve, 500));

  const reader = new FileReader();

  reader.onloadend = () => {
    // Save logo as base64 string
    setInvoiceData((prev) => ({
      ...prev,
      logo: reader.result,
    }));

    setIsLoading(false); // Hide loader
  };

  reader.onerror = () => {
    console.error("Error reading file.");
    setIsLoading(false);
  };

  reader.readAsDataURL(file); // Read file as base64
};


  useEffect(() => {
    if (!invoiceData.invoice.number) {
      const randomNumber = `IMV-${Math.floor(100000 + Math.random() * 900000)}`;
      setInvoiceData((prev) => ({
        ...prev,
        invoice: { ...prev.invoice, number: randomNumber },
      }));
    }
  }, [invoiceData.invoice.number, setInvoiceData]);

  return (
    <div className="invoice container-fluid px-2 px-sm-3 px-md-4 py-3 animate-fade-in">
      {/* Company Logo - Mobile Optimized */}
      <div className="mb-4">
        <h5 className="d-flex align-items-center gap-2 text-primary mb-3 fs-6 fs-md-5">
          <i className="bi bi-upload"></i>
          Company Logo
        </h5>

        <div className="d-flex flex-column flex-sm-row align-items-center gap-3">
          {/* Logo Upload Area */}
          <label htmlFor="image" className="cursor-pointer">
            <div className="logo-upload-container position-relative rounded-3 overflow-hidden">
              <img
                src={invoiceData.logo ? invoiceData.logo : assets.upload}
                alt="Upload Company Logo"
                width={isMobile ? 80 : 100}
                height={isMobile ? 80 : 100}
                className={`rounded-3 border object-fit-cover transition-all ${
                  invoiceData.logo ? "border-success" : "border-dashed border-secondary"
                } ${isLoading ? "opacity-50" : "hover-scale"}`}
                style={{ maxWidth: "100%", height: "auto" }}
              />

              {/* Loading Spinner */}
              {isLoading && (
                <div className="position-absolute top-50 start-50 translate-middle">
                  <div className="spinner-border spinner-border-sm text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}

              {/* Upload Hint Icon */}
              {!invoiceData.logo && !isLoading && (
                <div className="position-absolute top-50 start-50 translate-middle text-center text-muted">
                  <i className="bi bi-image" style={{ fontSize: isMobile ? "18px" : "24px" }}></i>
                </div>
              )}
            </div>
          </label>

          {/* Description Text */}
          <div className="flex-grow-1 text-center text-sm-start">
            <small className="text-muted">
              <strong>Recommended:</strong> {isMobile ? "80x80px" : "120x120px"} PNG/JPG<br />
              <strong>Max Size:</strong> 2MB
            </small>
            {isMobile && (
              <div className="mt-2">
                <label htmlFor="image" className="btn btn-sm btn-outline-primary">
                  <i className="bi bi-upload me-1"></i>
                  Upload Logo
                </label>
              </div>
            )}
          </div>

          {/* Hidden File Input */}
          <input
            type="file"
            name="logo"
            id="image"
            hidden
            accept="image/*"
            onChange={handleLogoUpload}
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Company Info */}
      <div className="mb-4">
        <h5 className="d-flex align-items-center gap-2 text-primary mb-3 fs-6 fs-md-5">
          <i className="bi bi-building"></i>
          Your Company
        </h5>
        <div className="row g-2 g-md-3">
          <div className="col-12 col-sm-6">
            <input
              type="text"
              className="form-control form-control-sm form-control-md"
              placeholder="Company Name"
              value={invoiceData.company.name}
              onChange={(e) => handleChange("company", "name", e.target.value)}
            />
          </div>
          <div className="col-12 col-sm-6">
            <input
              type="text"
              className="form-control form-control-sm form-control-md"
              placeholder="Company Phone"
              value={invoiceData.company.phone}
              onChange={(e) => handleChange("company", "phone", e.target.value)}
            />
          </div>
          <div className="col-12">
            <input
              type="text"
              className="form-control form-control-sm form-control-md"
              placeholder="Company Address"
              value={invoiceData.company.address}
              onChange={(e) =>
                handleChange("company", "address", e.target.value)
              }
            />
          </div>
        </div>
      </div>

      {/* Bill To */}
      <div className="mb-4">
        <h5 className="d-flex align-items-center gap-2 text-primary mb-3 fs-6 fs-md-5">
          <i className="bi bi-person"></i>
          Bill To
        </h5>
        <div className="row g-2 g-md-3">
          <div className="col-12 col-sm-6">
            <input
              type="text"
              className="form-control form-control-sm form-control-md"
              placeholder="Client Name"
              value={invoiceData.billing.name}
              onChange={(e) => handleChange("billing", "name", e.target.value)}
            />
          </div>
          <div className="col-12 col-sm-6">
            <input
              type="text"
              className="form-control form-control-sm form-control-md"
              placeholder="Phone Number"
              value={invoiceData.billing.phone}
              onChange={(e) => handleChange("billing", "phone", e.target.value)}
            />
          </div>
          <div className="col-12">
            <input
              type="text"
              className="form-control form-control-sm form-control-md"
              placeholder="Billing Address *"
              value={invoiceData.billing.address}
              onChange={(e) =>
                handleChange("billing", "address", e.target.value)
              }
            />
          </div>
        </div>
      </div>

      {/* Ship To */}
      <div className="mb-4">
        <h5 className="d-flex align-items-center gap-2 text-primary mb-3 fs-6 fs-md-5">
          <i className="bi bi-truck"></i>
          Ship To
        </h5>
        <div className="form-check form-switch mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            id="sameAsBilling"
            onChange={handleSameAsBilling}
            style={{ transform: "scale(1.1)" }}
          />
          <label htmlFor="sameAsBilling" className="form-check-label fw-medium small">
            Same as Billing Address
          </label>
        </div>
        <div className="row g-2 g-md-3">
          <div className="col-12 col-sm-6">
            <input
              type="text"
              className="form-control form-control-sm form-control-md"
              placeholder="Shipping Name"
              value={invoiceData.shipping.name}
              onChange={(e) => handleChange("shipping", "name", e.target.value)}
            />
          </div>
          <div className="col-12 col-sm-6">
            <input
              type="text"
              className="form-control form-control-sm form-control-md"
              placeholder="Shipping Phone"
              value={invoiceData.shipping.phone}
              onChange={(e) =>
                handleChange("shipping", "phone", e.target.value)
              }
            />
          </div>
          <div className="col-12">
            <input
              type="text"
              className="form-control form-control-sm form-control-md"
              placeholder="Shipping Address"
              value={invoiceData.shipping.address}
              onChange={(e) =>
                handleChange("shipping", "address", e.target.value)
              }
            />
          </div>
        </div>
      </div>

      {/* Invoice Info */}
      <div className="mb-4">
        <h5 className="d-flex align-items-center gap-2 text-primary mb-3 fs-6 fs-md-5">
          <i className="bi bi-file-text"></i>
          Invoice Information
        </h5>
        <div className="row g-2 g-md-3">
          <div className="col-12 col-sm-4">
            <label className="form-label fw-semibold small">Invoice Number</label>
            <input
              type="text"
              className="form-control form-control-sm form-control-md bg-light"
              disabled
              value={invoiceData.invoice.number}
            />
          </div>
          <div className="col-12 col-sm-4">
            <label className="form-label fw-semibold small">Invoice Date *</label>
            <input
              type="date"
              className="form-control form-control-sm form-control-md"
              value={invoiceData.invoice.date}
              onChange={(e) => handleChange("invoice", "date", e.target.value)}
            />
          </div>
          <div className="col-12 col-sm-4">
            <label className="form-label fw-semibold small">Due Date *</label>
            <input
              type="date"
              className="form-control form-control-sm form-control-md"
              value={invoiceData.invoice.dueDate}
              onChange={(e) =>
                handleChange("invoice", "dueDate", e.target.value)
              }
            />
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="d-flex align-items-center gap-2 text-primary mb-0 fs-6 fs-md-5">
            <i className="bi bi-calculator"></i>
            <span className="small fw-semibold">Item Details</span>
          </h5>
          <button
            className="btn btn-primary btn-sm d-flex align-items-center gap-1"
            type="button"
            onClick={addItem}
          >
            <i className="bi bi-plus-lg"></i>
            {isMobile ? "Add" : "Add Item"}
          </button>
        </div>

        <div className="items-container">
          {invoiceData.items.map((item, index) => (
            <div
              key={index}
              id={`item-${index}`}
              className="card p-2 p-sm-3 mb-2 border-0 shadow-sm transition-all animate-slide-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Mobile Layout */}
              {isMobile ? (
                <div className="row g-2">
                  <div className="col-12">
                    <label className="form-label fw-semibold small">Item Name</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="Enter item name"
                      value={item.name}
                      onChange={(e) =>
                        handleItemChange(index, "name", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label fw-semibold small">Qty</label>
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      placeholder="Qty"
                      min="0"
                      value={item.qty}
                      onChange={(e) =>
                        handleItemChange(index, "qty", Number(e.target.value))
                      }
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label fw-semibold small">Price</label>
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      placeholder="Amount"
                      min="0"
                      step="0.01"
                      value={item.amount}
                      onChange={(e) =>
                        handleItemChange(index, "amount", Number(e.target.value))
                      }
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold small">Total</label>
                    <input
                      type="text"
                      className="form-control form-control-sm bg-light fw-bold"
                      disabled
                      value={`₹${item.total.toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                      })}`}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold small">Description</label>
                    <textarea
                      className="form-control form-control-sm"
                      placeholder="Item description (optional)"
                      rows={2}
                      value={item.description}
                      onChange={(e) =>
                        handleItemChange(index, "description", e.target.value)
                      }
                    />
                  </div>
                  {invoiceData.items.length > 1 && (
                    <div className="col-12 text-end">
                      <button
                        className="btn btn-outline-danger btn-sm px-2 py-1"
                        type="button"
                        onClick={() => deleteItem(index)}
                        title="Delete item"
                      >
                        <i className="bi bi-trash"></i> Delete
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* Desktop Layout */
                <>
                  <div className="row g-2 g-md-3 mb-2">
                    <div className="col-md-4">
                      <label className="form-label fw-semibold small">Item Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter item name"
                        value={item.name}
                        onChange={(e) =>
                          handleItemChange(index, "name", e.target.value)
                        }
                      />
                    </div>
                    <div className="col-md-2">
                      <label className="form-label fw-semibold small">Quantity</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Qty"
                        min="0"
                        value={item.qty}
                        onChange={(e) =>
                          handleItemChange(index, "qty", Number(e.target.value))
                        }
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label fw-semibold small">Unit Price</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Amount"
                        min="0"
                        step="0.01"
                        value={item.amount}
                        onChange={(e) =>
                          handleItemChange(index, "amount", Number(e.target.value))
                        }
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label fw-semibold small">Total</label>
                      <input
                        type="text"
                        className="form-control bg-light fw-bold"
                        disabled
                        value={`₹${item.total.toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                        })}`}
                      />
                    </div>
                  </div>
                  <div className="d-flex gap-3 align-items-start">
                    <div className="flex-grow-1">
                      <label className="form-label fw-semibold small">Description</label>
                      <textarea
                        className="form-control"
                        placeholder="Item description (optional)"
                        rows={2}
                        value={item.description}
                        onChange={(e) =>
                          handleItemChange(index, "description", e.target.value)
                        }
                      />
                    </div>
                    {invoiceData.items.length > 1 && (
                      <button
                        className="btn btn-outline-danger btn-sm mt-4 px-3"
                        type="button"
                        onClick={() => deleteItem(index)}
                        title="Delete item"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bank Details */}
      <div className="mb-4">
        <h5 className="d-flex align-items-center gap-2 text-primary mb-3 fs-6 fs-md-5">
          <i className="bi bi-bank"></i>
          Bank Account Details
        </h5>
        <div className="row g-2 g-md-3">
          <div className="col-12 col-sm-4">
            <input
              type="text"
              className="form-control form-control-sm form-control-md"
              placeholder="Account Holder Name"
              value={invoiceData.account.name}
              onChange={(e) => handleChange("account", "name", e.target.value)}
            />
          </div>
          <div className="col-12 col-sm-4">
            <input
              type="text"
              className="form-control form-control-sm form-control-md"
              placeholder="Account Number"
              value={invoiceData.account.number}
              onChange={(e) =>
                handleChange("account", "number", e.target.value)
              }
            />
          </div>
          <div className="col-12 col-sm-4">
            <input
              type="text"
              className="form-control form-control-sm form-control-md"
              placeholder="Branch/IFSC Code"
              value={invoiceData.account.ifsccode}
              onChange={(e) =>
                handleChange("account", "ifsccode", e.target.value)
              }
            />
          </div>
        </div>
      </div>

      {/* Totals - Mobile Optimized */}
      <div className="mb-4">
        <h5 className="d-flex align-items-center gap-2 text-primary mb-3 fs-6 fs-md-5">
          <i className="bi bi-calculator"></i>
          Total Amount
        </h5>
        <div className="d-flex justify-content-center justify-content-md-end">
          <div className="w-100 w-md-50 bg-light rounded-3 p-3 p-sm-4 shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom">
              <span className="fw-semibold small">Subtotal</span>
              <span className="fs-6 fw-bold text-dark">
                ₹
                {subtotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </span>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-2">
              <div className="d-flex align-items-center gap-2">
                <label
                  htmlFor="taxInput"
                  className="form-label mb-0 fw-semibold small"
                >
                  Tax Rate (%)
                </label>
              </div>
              <input
                type="number"
                id="taxInput"
                className="form-control form-control-sm w-25 text-end"
                min="0"
                max="100"
                step="0.1"
                value={invoiceData.tax}
                onChange={(e) =>
                  setInvoiceData((prev) => ({ ...prev, tax: e.target.value }))
                }
              />
            </div>

            {taxAmount > 0 && (
              <div className="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom">
                <span className="fw-semibold small">Tax Amount</span>
                <span className="fs-6 text-danger">
                  ₹
                  {taxAmount.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
            )}

            <div className="d-flex justify-content-between align-items-center pt-2">
              <span className="fs-6 fw-bold text-primary">Grand Total</span>
              <span className="fs-5 fw-bold text-success">
                ₹
                {grandTotal.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="mb-3">
        <h5 className="d-flex align-items-center gap-2 text-primary mb-2 fs-6 fs-md-5">
          <i className="bi bi-file-text"></i>
          Additional Notes
        </h5>
        <textarea
          className="form-control form-control-sm form-control-md"
          rows={3}
          placeholder="Enter any additional information, terms, or special instructions here..."
          value={invoiceData.notes}
          onChange={(e) =>
            setInvoiceData((prev) => ({ ...prev, notes: e.target.value }))
          }
        ></textarea>
      </div>

      {/* Mobile Floating Add Button */}
      {isMobile && (
        <div className="position-fixed bottom-0 end-0 m-3" style={{ zIndex: 1050 }}>
          <button
            className="btn btn-primary rounded-circle shadow-lg"
            style={{ width: '60px', height: '60px' }}
            onClick={addItem}
            title="Add Item"
          >
            <i className="bi bi-plus-lg fs-5"></i>
          </button>
        </div>
      )}

      {/* Custom CSS for Mobile Responsiveness */}
      <style jsx>{`
        @media (max-width: 767.98px) {
          .form-control-sm {
            font-size: 14px;
            padding: 0.375rem 0.75rem;
          }
          
          .btn-sm {
            padding: 0.25rem 0.5rem;
            font-size: 0.875rem;
          }
          
          .card {
            margin-bottom: 0.5rem;
          }
          
          .items-container {
            max-height: 400px;
            overflow-y: auto;
          }
        }
        
        .hover-scale:hover {
          transform: scale(1.05);
          transition: transform 0.3s ease;
        }
        
        .form-control-md {
          padding: 0.5rem 1rem;
        }
        
        @media (min-width: 768px) {
          .form-control-md {
            padding: 0.75rem 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default InvoiceFrom;