import "../TemplateCss/Template2Custom.css";

import { useEffect, useState } from "react";

const Template2 = ({ data }) => {
  const [logoError, setLogoError] = useState(false);

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? dateString : date.toLocaleDateString('en-IN');
    } catch (error) {
      return dateString;
    }
  };

  // Calculate amounts if not provided
  const subtotal = data.subtotal !== undefined ? data.subtotal : 
    data.items?.reduce((sum, item) => {
      return sum + (Number(item.qty || item.qt || 0) * Number(item.amount || 0));
    }, 0) || 0;

  const taxRate = data.taxRate || data.tax || 0;
  const taxAmount = data.taxAmount !== undefined ? data.taxAmount : 
    subtotal * (taxRate / 100);
  
  const total = data.total !== undefined ? data.total : subtotal + taxAmount;

  // Determine currency symbol
  const currencySymbol = data.currencySymbol || '₹';

  // Handle logo error
  const handleLogoError = () => {
    setLogoError(true);
  };

  return (
    <div className="modern-invoice">
      {/* Header with Gradient */}
      <div className="invoice-header">
        <div className="header-gradient"></div>
        <div className="header-content">
          <div className="company-brand">
            {data.logo && !logoError ? (
              <img
                src={data.logo}
                alt="Company Logo"
                className="brand-logo"
                onError={handleLogoError}
              />
            ) : (
              <div className="brand-initials">
                {data.companyName?.split(' ').map(word => word[0]).join('') || "CN"}
              </div>
            )}
            <div className="brand-info">
              <h1 className="company-name">{data.companyName || "Company Name"}</h1>
              <p className="company-tagline">{data.companyTagline || "Professional Services"}</p>
            </div>
          </div>
          
          <div className="invoice-badge">
            <div className="badge-content">
              <span className="badge-title">{data.title || "INVOICE"}</span>
              <span className="badge-number">#{data.invoiceNumber || "000001"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Meta */}
      <div className="invoice-meta">
        <div className="meta-grid">
          <div className="meta-item">
            <span className="meta-label">Issued Date</span>
            <span className="meta-value">{formatDate(data.invoiceDate)}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Due Date</span>
            <span className="meta-value highlight">{formatDate(data.paymentDate)}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Payment Terms</span>
            <span className="meta-value">{data.paymentTerms || "Due on receipt"}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Status</span>
            <span className="status-badge paid">Paid</span>
          </div>
        </div>
      </div>

      {/* Client & Company Info */}
      <div className="info-section">
        <div className="info-grid">
          <div className="info-card from-card">
            <div className="card-header">
              <div className="card-icon">🏢</div>
              <h3>From</h3>
            </div>
            <div className="card-content">
              <p className="info-name">{data.companyName || "Company Name"}</p>
              <p className="info-address">{data.companyAddress || "Company Address"}</p>
              <p className="info-contact">📞 {data.companyPhone || "N/A"}</p>
              {data.companyEmail && <p className="info-email">✉️ {data.companyEmail}</p>}
              {data.gstin && <p className="info-tax">🧾 GSTIN: {data.gstin}</p>}
            </div>
          </div>

          <div className="info-card to-card">
            <div className="card-header">
              <div className="card-icon">👤</div>
              <h3>Bill To</h3>
            </div>
            <div className="card-content">
              <p className="info-name">{data.billingName || "Customer Name"}</p>
              <p className="info-address">{data.billingAddress || "Customer Address"}</p>
              <p className="info-contact">📞 {data.billingPhone || "N/A"}</p>
              {data.billingEmail && <p className="info-email">✉️ {data.billingEmail}</p>}
              {data.billingGstin && <p className="info-tax">🧾 GSTIN: {data.billingGstin}</p>}
            </div>
          </div>

          {data.shippingName && (
            <div className="info-card ship-card">
              <div className="card-header">
                <div className="card-icon">🚚</div>
                <h3>Ship To</h3>
              </div>
              <div className="card-content">
                <p className="info-name">{data.shippingName}</p>
                <p className="info-address">{data.shippingAddress}</p>
                <p className="info-contact">📞 {data.shippingPhone}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Items Table */}
      <div className="items-section">
        <div className="section-header">
          <h2>Items & Services</h2>
          <div className="header-actions">
            <span className="items-count">{data.items?.length || 0} items</span>
          </div>
        </div>
        
        <div className="table-container">
          <table className="items-table">
            <thead>
              <tr>
                <th className="col-item">Item</th>
                <th className="col-qty">Qty</th>
                <th className="col-price">Unit Price</th>
                <th className="col-total">Total</th>
              </tr>
            </thead>
            <tbody>
              {data.items?.map((item, index) => (
                <tr key={index} className="item-row">
                  <td className="col-item">
                    <div className="item-info">
                      <span className="item-name">{item.name || "Item Name"}</span>
                      {item.description && (
                        <span className="item-desc">{item.description}</span>
                      )}
                      {item.hsn && (
                        <span className="item-hsn">HSN: {item.hsn}</span>
                      )}
                    </div>
                  </td>
                  <td className="col-qty">{item.qty || item.qt || 0}</td>
                  <td className="col-price">{currencySymbol}{Number(item.amount || 0).toFixed(2)}</td>
                  <td className="col-total">{currencySymbol}{((item.qty || item.qt || 0) * (item.amount || 0)).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Section */}
      <div className="summary-section">
        <div className="summary-grid">
          <div className="notes-section">
            {data.notes && (
              <div className="notes-card">
                <h3>Notes</h3>
                <p>{data.notes}</p>
              </div>
            )}
            
            {(data.accountNumber || data.bankName) && (
              <div className="bank-card">
                <h3>Bank Details</h3>
                <div className="bank-info">
                  {data.bankName && <p><strong>Bank:</strong> {data.bankName}</p>}
                  {data.accountName && <p><strong>Account Holder:</strong> {data.accountName}</p>}
                  {data.accountNumber && <p><strong>Account No:</strong> {data.accountNumber}</p>}
                  {data.accountIfscCode && <p><strong>IFSC:</strong> {data.accountIfscCode}</p>}
                </div>
              </div>
            )}
          </div>
          
          <div className="totals-card">
            <div className="amounts-grid">
              <div className="amount-row">
                <span>Subtotal</span>
                <span>{currencySymbol}{subtotal.toFixed(2)}</span>
              </div>
              
              {taxRate > 0 && (
                <div className="amount-row">
                  <span>Tax ({taxRate}%)</span>
                  <span>{currencySymbol}{taxAmount.toFixed(2)}</span>
                </div>
              )}
              
              {data.discount > 0 && (
                <div className="amount-row discount">
                  <span>Discount</span>
                  <span>-{currencySymbol}{data.discount.toFixed(2)}</span>
                </div>
              )}
              
              {data.shippingCharges > 0 && (
                <div className="amount-row">
                  <span>Shipping</span>
                  <span>{currencySymbol}{data.shippingCharges.toFixed(2)}</span>
                </div>
              )}
              
              <div className="amount-row grand-total">
                <span>Total Amount</span>
                <span>{currencySymbol}{total.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="amount-words">
              <p><strong>Amount in Words:</strong></p>
              <p>{data.totalInWords || "Zero rupees only"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="invoice-footer">
        <div className="footer-content">
          <div className="thank-you">
            <h3>Thank you for your business!</h3>
            <p>We appreciate your trust in our services.</p>
          </div>
          
          <div className="signature-section">
            <div className="signature-box">
              <div className="signature-line"></div>
              <p>Authorized Signature</p>
            </div>
          </div>
        </div>
        
        <div className="footer-notes">
          <p>This is an electronically generated invoice and is valid without signature.</p>
          <div className="company-contact">
            <span>{data.companyPhone || "Phone: N/A"}</span>
            <span>•</span>
            <span>{data.companyEmail || "Email: N/A"}</span>
            <span>•</span>
            <span>{data.companyWebsite || "Website: N/A"}</span>
          </div>
        </div>
      </div>

      {/* Watermark */}
      <div className="watermark">{data.title || "INVOICE"}</div>
    </div>
  );
};

export default Template2;