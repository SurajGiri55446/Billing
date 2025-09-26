import "../TemplateCss/Template4Style.css";
import { useEffect, useState } from "react";

const Template4 = ({ data }) => {
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
    <div className="template4-wrapper">
      <div className="template4-boundary-left"></div>
      <div className="template4-boundary-right"></div>
      
      <div className="template4-container">
        {/* Header */}
        <div className="template4-header">
          <div className="template4-company-info">
            {data.logo && !logoError ? (
              <img
                src={data.logo}
                alt="Company Logo"
                className="template4-logo"
                onError={handleLogoError}
              />
            ) : (
              <div className="template4-logo-placeholder">
                {data.companyName?.charAt(0) || "C"}
              </div>
            )}
            
            <div className="template4-company-details">
              <h1 className="template4-company-name">{data.companyName || "Company Name"}</h1>
              <p className="template4-company-address">{data.companyAddress || "Company Address"}</p>
              <p className="template4-company-phone">Phone: {data.companyPhone || "N/A"}</p>
            </div>
          </div>
          
          <div className="template4-invoice-info">
            <h2 className="template4-invoice-title">{data.title || "INVOICE"}</h2>
            <div className="template4-invoice-details">
              <div className="template4-detail-item">
                <span>Invoice No:</span>
                <strong>{data.invoiceNumber || "N/A"}</strong>
              </div>
              <div className="template4-detail-item">
                <span>Invoice Date:</span>
                <strong>{formatDate(data.invoiceDate)}</strong>
              </div>
              <div className="template4-detail-item">
                <span>Due Date:</span>
                <strong>{formatDate(data.paymentDate)}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Separator */}
        <div className="template4-separator">
          <div className="template4-separator-line"></div>
          <div className="template4-separator-icon">✻</div>
          <div className="template4-separator-line"></div>
        </div>

        {/* Billing Section */}
        <div className="template4-billing-section">
          <div className="template4-billing-grid">
            {data.shippingName && (
              <div className="template4-address-card">
                <div className="template4-card-border"></div>
                <h3 className="template4-section-title">Shipped To</h3>
                <div className="template4-address-details">
                  <strong>{data.shippingName}</strong>
                  <p>{data.shippingAddress}</p>
                  <p>Phone: {data.shippingPhone}</p>
                </div>
              </div>
            )}
            
            <div className="template4-address-card">
              <div className="template4-card-border"></div>
              <h3 className="template4-section-title">Billed To</h3>
              <div className="template4-address-details">
                <strong>{data.billingName || "N/A"}</strong>
                <p>{data.billingAddress || "N/A"}</p>
                <p>Phone: {data.billingPhone || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="template4-items-section">
          <div className="template4-section-header">
            <h3 className="template4-section-title">Items Details</h3>
            <div className="template4-section-border"></div>
          </div>
          <div className="template4-table-container">
            <table className="template4-items-table">
              <thead>
                <tr>
                  <th className="template4-table-header">Item Description</th>
                  <th className="template4-table-header text-center">Qty</th>
                  <th className="template4-table-header text-center">Rate</th>
                  <th className="template4-table-header text-end">Amount</th>
                </tr>
              </thead>
              <tbody>
                {data.items?.map((item, index) => (
                  <tr key={index} className="template4-table-row">
                    <td className="template4-item-desc">
                      <div className="template4-item-name">{item.name || "Item Name"}</div>
                      {item.description && (
                        <div className="template4-item-detail">{item.description}</div>
                      )}
                    </td>
                    <td className="template4-item-qty text-center">{item.qty || item.qt || 0}</td>
                    <td className="template4-item-rate text-center">
                      {currencySymbol}{Number(item.amount || 0).toFixed(2)}
                    </td>
                    <td className="template4-item-amount text-end">
                      {currencySymbol}{((item.qty || item.qt || 0) * (item.amount || 0)).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Totals */}
        <div className="template4-totals-section">
          <div className="template4-totals-card">
            <div className="template4-card-border"></div>
            <div className="template4-total-row">
              <span>Sub Total</span>
              <span>{currencySymbol}{subtotal.toFixed(2)}</span>
            </div>
            {taxRate > 0 && (
              <div className="template4-total-row">
                <span>Tax ({taxRate}%)</span>
                <span>{currencySymbol}{taxAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="template4-total-row template4-grand-total">
              <span>Total</span>
              <span>{currencySymbol}{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Additional Sections */}
        <div className="template4-additional-sections">
          {(data.accountName || data.accountNumber || data.accountIfscCode) && (
            <div className="template4-info-card">
              <div className="template4-card-border"></div>
              <h3 className="template4-section-title">Bank Account Details</h3>
              <div className="template4-info-content">
                {data.accountName && (
                  <p><strong>Account Holder:</strong> {data.accountName}</p>
                )}
                {data.accountNumber && (
                  <p><strong>Account Number:</strong> {data.accountNumber}</p>
                )}
                {data.accountIfscCode && (
                  <p><strong>IFSC Code:</strong> {data.accountIfscCode}</p>
                )}
              </div>
            </div>
          )}

          {data.notes && (
            <div className="template4-info-card">
              <div className="template4-card-border"></div>
              <h3 className="template4-section-title">Remarks</h3>
              <div className="template4-info-content">
                <p>{data.notes}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="template4-footer">
          <div className="template4-footer-border"></div>
          <p>Thank you for your business!</p>
          <div className="template4-footer-signature">
            <div className="template4-signature-line"></div>
            <span>Authorized Signature</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template4;