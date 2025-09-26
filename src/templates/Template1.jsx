import "../TemplateCss/Template1.css";

import { useEffect, useState } from "react";

const Template1 = ({ data }) => {
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
    <div className="vintage-invoice">
      {/* Header Section */}
      <div className="vintage-header">
        <div className="vintage-company-info">
          <div className="vintage-logo-section">
            {data.logo && !logoError ? (
              <img
                src={data.logo}
                alt="Company Logo"
                className="vintage-logo"
                onError={handleLogoError}
              />
            ) : (
              <div className="vintage-logo-fallback">
                <span>{data.companyName?.charAt(0) || "C"}</span>
              </div>
            )}
          </div>
          
          <div className="vintage-company-details">
            <h1 className="vintage-company-title">{data.companyName || "COMPANY NAME"}</h1>
            <p className="vintage-company-tagline"></p>
            <div className="vintage-company-address">
              <p>{data.companyAddress || "123 Main Street, City - 123456"}</p>
              <p>📞 {data.companyPhone || "Phone: N/A"} | ✉️ {data.companyEmail || "Email: N/A"}</p>
            </div>
          </div>
        </div>
        
        <div className="vintage-invoice-meta">
          <div className="vintage-invoice-header">
            <h2 className="vintage-document-title">{data.title || "TAX INVOICE"}</h2>
          </div>
          <div className="vintage-meta-details">
            <div className="vintage-meta-item">
              <label>Invoice No:</label>
              <span>{data.invoiceNumber || "INV-001"}</span>
            </div>
            <div className="vintage-meta-item">
              <label>Date:</label>
              <span>{formatDate(data.invoiceDate)}</span>
            </div>
            <div className="vintage-meta-item">
              <label>Due Date:</label>
              <span>{formatDate(data.paymentDate)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Client Information */}
      <div className="vintage-client-section">
        <div className="vintage-client-grid">
          <div className="vintage-client-card">
            <h3 className="vintage-card-title">Bill To</h3>
            <div className="vintage-client-details">
              <p className="vintage-client-name">{data.billingName || "Customer Name"}</p>
              <p className="vintage-client-address">{data.billingAddress || "Customer Address"}</p>
              <p className="vintage-client-contact">Phone: {data.billingPhone || "N/A"}</p>
              {data.billingGstin && <p className="vintage-client-gst">GSTIN: {data.billingGstin}</p>}
            </div>
          </div>

          {data.shippingName && (
            <div className="vintage-client-card">
              <h3 className="vintage-card-title">Ship To</h3>
              <div className="vintage-client-details">
                <p className="vintage-client-name">{data.shippingName}</p>
                <p className="vintage-client-address">{data.shippingAddress}</p>
                <p className="vintage-client-contact">Phone: {data.shippingPhone}</p>
              </div>
            </div>
          )}

          <div className="vintage-summary-card">
            <h3 className="vintage-card-title">Summary</h3>
            <div className="vintage-summary-details">
              <div className="vintage-summary-item">
                <span>Items:</span>
                <span>{data.items?.length || 0}</span>
              </div>
              <div className="vintage-summary-item">
                <span>Status:</span>
                <span className="vintage-status">Pending</span>
              </div>
              <div className="vintage-summary-item">
                <span>Terms:</span>
                <span>{data.paymentTerms || "Net 15 Days"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="vintage-table-section">
        <div className="vintage-table-container">
          <table className="vintage-items-table">
            <thead>
              <tr className="vintage-table-head">
                <th className="vintage-th vintage-th-sno">#</th>
                <th className="vintage-th vintage-th-desc">Item Description</th>
                <th className="vintage-th vintage-th-hsn">HSN Code</th>
                <th className="vintage-th vintage-th-qty">Qty</th>
                <th className="vintage-th vintage-th-rate">Rate</th>
                <th className="vintage-th vintage-th-amount">Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.items?.map((item, index) => (
                <tr key={index} className="vintage-table-row">
                  <td className="vintage-td vintage-td-sno">{index + 1}</td>
                  <td className="vintage-td vintage-td-desc">
                    <div className="vintage-item-info">
                      <span className="vintage-item-name">{item.name || "Item Name"}</span>
                      {item.description && (
                        <span className="vintage-item-desc">{item.description}</span>
                      )}
                    </div>
                  </td>
                  <td className="vintage-td vintage-td-hsn">{item.hsn || "-"}</td>
                  <td className="vintage-td vintage-td-qty">{item.qty || item.qt || 0}</td>
                  <td className="vintage-td vintage-td-rate">{currencySymbol}{Number(item.amount || 0).toFixed(2)}</td>
                  <td className="vintage-td vintage-td-amount">{currencySymbol}{((item.qty || item.qt || 0) * (item.amount || 0)).toFixed(2)}</td>
                </tr>
              ))}
              
              {/* Empty rows for traditional look */}
              {Array.from({ length: Math.max(0, 6 - (data.items?.length || 0)) }).map((_, index) => (
                <tr key={`empty-${index}`} className="vintage-table-row vintage-empty-row">
                  <td className="vintage-td vintage-td-sno">{((data.items?.length || 0) + index + 1)}</td>
                  <td className="vintage-td vintage-td-desc"></td>
                  <td className="vintage-td vintage-td-hsn"></td>
                  <td className="vintage-td vintage-td-qty"></td>
                  <td className="vintage-td vintage-td-rate"></td>
                  <td className="vintage-td vintage-td-amount"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Totals Section */}
      <div className="vintage-totals-section">
        <div className="vintage-totals-grid">
          <div className="vintage-notes-area">
            {data.notes && (
              <div className="vintage-notes-card">
                <h4 className="vintage-notes-title">Terms & Conditions</h4>
                <p className="vintage-notes-content">{data.notes}</p>
              </div>
            )}
            
            {(data.bankName || data.accountNumber) && (
              <div className="vintage-bank-card">
                <h4 className="vintage-bank-title">Bank Details</h4>
                <div className="vintage-bank-info">
                  {data.bankName && <p><strong>Bank:</strong> {data.bankName}</p>}
                  {data.accountName && <p><strong>Account Name:</strong> {data.accountName}</p>}
                  {data.accountNumber && <p><strong>Account No:</strong> {data.accountNumber}</p>}
                  {data.accountIfscCode && <p><strong>IFSC Code:</strong> {data.accountIfscCode}</p>}
                </div>
              </div>
            )}
          </div>
          
          <div className="vintage-amounts-area">
            <div className="vintage-amounts-table">
              <div className="vintage-amount-row">
                <span>Sub Total:</span>
                <span>{currencySymbol} {subtotal.toFixed(2)}</span>
              </div>
              
              {taxRate > 0 && (
                <div className="vintage-amount-row">
                  <span>Tax ({taxRate}%):</span>
                  <span>{currencySymbol} {taxAmount.toFixed(2)}</span>
                </div>
              )}
              
              {data.discount > 0 && (
                <div className="vintage-amount-row vintage-discount">
                  <span>Discount:</span>
                  <span>-{currencySymbol} {data.discount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="vintage-amount-row vintage-grand-total">
                <span>Total Amount:</span>
                <span>{currencySymbol} {total.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="vintage-amount-words">
              <p><strong>Amount in Words:</strong></p>
              <p>{data.totalInWords  || "Zero rupees only"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="vintage-footer">
        <div className="vintage-footer-content">
          <div className="vintage-signature-section">
            <div className="vintage-signature-box">
              <div className="vintage-signature-line"></div>
              <p className="vintage-signature-label">Authorized Signature</p>
            </div>
          </div>
          
          <div className="vintage-company-stamp">
            <div className="vintage-stamp">
              <span>STAMP</span>
              <span>&</span>
              <span>SIGNATURE</span>
            </div>
          </div>
          
          <div className="vintage-thankyou-section">
            <p className="vintage-thankyou">Thank you for your business!</p>
            <p className="vintage-footer-notes">
              This is a computer generated invoice. Please contact us for any queries.
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="vintage-corner vintage-corner-tl"></div>
      <div className="vintage-corner vintage-corner-tr"></div>
      <div className="vintage-corner vintage-corner-bl"></div>
      <div className="vintage-corner vintage-corner-br"></div>
    </div>
  );
};

export default Template1;