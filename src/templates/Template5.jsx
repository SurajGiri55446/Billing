import "../TemplateCss/Template5yes.css";

import { useEffect, useState } from "react";

const Template5 = ({ data }) => {
  const [logoError, setLogoError] = useState(false);

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime())
        ? dateString
        : date.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          });
    } catch (error) {
      return dateString;
    }
  };

  // Calculate amounts
  const subtotal =
    data.subtotal !== undefined
      ? data.subtotal
      : data.items?.reduce((sum, item) => {
          return (
            sum + Number(item.qty || item.qt || 0) * Number(item.amount || 0)
          );
        }, 0) || 0;

  const taxRate = data.taxRate || data.tax || 0;
  const taxAmount =
    data.taxAmount !== undefined ? data.taxAmount : subtotal * (taxRate / 100);
  const total = data.total !== undefined ? data.total : subtotal + taxAmount;

  const currencySymbol = data.currencySymbol || "₹";

  const handleLogoError = () => setLogoError(true);

  return (
    <div className="invoice-template">
      {/* Header */}
      <header className="invoice-header">
        <div className="header-content">
          <div className="company-section">
            <div className="logo-container">
              {data.logo && !logoError ? (
                <img
                  src={data.logo}
                  alt="Company Logo"
                  className="company-logo"
                  onError={handleLogoError}
                />
              ) : (
                <div className="logo-placeholder">
                  <span>{data.companyName?.charAt(0) || "C"}</span>
                </div>
              )}
            </div>
            <div className="company-info">
              <h1 className="company-name text-dark fw-bold mb-1">
                {data.companyName || "Company Name"}
              </h1>

              <p className="text-info fw-semibold">
                <i className="bi bi-geo-alt-fill me-2"></i>
                {data.companyAddress || "Company Address"}
              </p>

              <p className="text-info fw-semibold">
                <i className="bi bi-telephone-fill me-2"></i>
                {data.companyPhone || "N/A"}
              </p>
            </div>
          </div>

          <div className="invoice-meta">
            <div className="invoice-badge">
              <h2>{data.title || "INVOICE"}</h2>
            </div>
            <div className="invoice-details">
              <div className="detail-row">
                <span className="label">Invoice :</span>
                <span className="value">{data.invoiceNumber || "N/A"}</span>
              </div>
              <div className="detail-row">
                <span className="label">Date :</span>
                <span className="value">{formatDate(data.invoiceDate)}</span>
              </div>
              <div className="detail-row">
                <span className="label">Due Date :</span>
                <span className="value highlight">
                  {formatDate(data.paymentDate)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Client Information */}
      <section className="client-section">
        <div className="client-grid">
          {/* Billing Info */}
          <div className="client-card">
            <div className="card-header">
              <div className="icon">👤</div>
              <h3>Billed To</h3>
            </div>
            <div className="client-info">
              <strong className="text-dark">
                {data.billingName || "Client Name"}
              </strong>
              <p className="text-secondary mb-1">
                {data.billingAddress || "Client Address"}
              </p>
              <p className="text-info fw-semibold">
                📞 {data.billingPhone || "N/A"}
              </p>
            </div>
          </div>

          {/* Shipping Info (if available) */}
          {data.shippingName && (
            <div className="client-card">
              <div className="card-header">
                <div className="icon">🚚</div>
                <h3>Shipped To</h3>
              </div>
              <div className="client-info">
                <strong className="text-dark">{data.shippingName}</strong>
                <p className="text-secondary mb-1">{data.shippingAddress}</p>
                <p className="text-info fw-semibold">📞 {data.shippingPhone}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Items Table */}
      <section className="items-section">
        <div className="section-title">
          <h3>Items</h3>
          <div className="title-underline"></div>
        </div>

        <div className="items-table">
          <div className="table-header">
            <div className="col-item">Item Description</div>
            <div className="col-qty">Qty</div>
            <div className="col-rate">Rate</div>
            <div className="col-amount">Amount</div>
          </div>

          <div className="table-body">
            {data.items?.map((item, index) => (
              <div key={index} className="table-row">
                <div className="col-item">
                  <div className="item-name">{item.name || "Item Name"}</div>
                  {item.description && (
                    <div className="item-desc">{item.description}</div>
                  )}
                </div>
                <div className="col-qty">{item.qty || item.qt || 0}</div>
                <div className="col-rate">
                  {currencySymbol}
                  {Number(item.amount || 0).toFixed(2)}
                </div>
                <div className="col-amount">
                  {currencySymbol}
                  {((item.qty || item.qt || 0) * (item.amount || 0)).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Totals */}
      <section className="totals-section">
        <div className="totals-card">
          <div className="total-row">
            <span>Subtotal</span>
            <span>
              {currencySymbol}
              {subtotal.toFixed(2)}
            </span>
          </div>
          {taxRate > 0 && (
            <div className="total-row">
              <span>Tax ({taxRate}%)</span>
              <span>
                {currencySymbol}
                {taxAmount.toFixed(2)}
              </span>
            </div>
          )}
          <div className="total-row grand-total">
            <span>Total Amount</span>
            <span>
              {currencySymbol}
              {total.toFixed(2)}
            </span>
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="additional-info">
        {(data.accountName || data.accountNumber || data.accountIfscCode) && (
          <div className="info-card">
            <div className="card-header">
              <div className="icon">🏦</div>
              <h3>Bank Details</h3>
            </div>
            <div className="info-content">
              {data.accountName && (
                <p>
                  <strong>Account Holder:</strong> {data.accountName}
                </p>
              )}
              {data.accountNumber && (
                <p>
                  <strong>Account Number:</strong> {data.accountNumber}
                </p>
              )}
              {data.accountIfscCode && (
                <p>
                  <strong>IFSC Code:</strong> {data.accountIfscCode}
                </p>
              )}
            </div>
          </div>
        )}

        {data.notes && (
          <div className="info-card">
            <div className="card-header">
              <div className="icon">📝</div>
              <h3>Notes</h3>
            </div>
            <div className="info-content">
              <p>{data.notes}</p>
            </div>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="invoice-footer">
        <div className="footer-content">
          <p className="thank-you">Thank you for your business! 💫</p>
          <div className="signature-section">
            <div className="signature-line"></div>
            <span>Authorized Signature</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Template5;
