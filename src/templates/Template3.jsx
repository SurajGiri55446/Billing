// src/templates/Template3.jsx
import "../TemplateCss/Template3run.css";

import { useEffect, useState } from "react";

const Template3 = ({ data }) => {
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
    <div className="bill-template">
      {/* Bill Header */}
      <div className="bill-header">
        <div className="bill-company-section">
          {data.logo && !logoError ? (
            <img
              src={data.logo}
              alt="Company Logo"
              className="bill-logo"
              onError={handleLogoError}
            />
          ) : (
            <div className="bill-logo-placeholder">
              <span>{data.companyName?.charAt(0) || "C"}</span>
            </div>
          )}
          
          <div className="bill-company-info">
            <h1 className="bill-company-name">{data.companyName || "Company Name"}</h1>
            <p className="bill-company-address">{data.companyAddress || "Company Address"}</p>
            <p className="bill-company-contact">
              <span>Phone: {data.companyPhone || "N/A"}</span>
              {data.companyEmail && <span> | Email: {data.companyEmail}</span>}
            </p>
          </div>
        </div>
        
        <div className="bill-title-section">
          <div className="bill-title-box">
            <h2 className="bill-title">{data.title || "TAX INVOICE"}</h2>
          </div>
        </div>
      </div>

      {/* Invoice Details Strip */}
      <div className="bill-details-strip">
        <div className="bill-detail-item">
          <span className="bill-detail-label">Invoice No:</span>
          <span className="bill-detail-value">{data.invoiceNumber || "N/A"}</span>
        </div>
        <div className="bill-detail-item">
          <span className="bill-detail-label">Invoice Date:</span>
          <span className="bill-detail-value">{formatDate(data.invoiceDate)}</span>
        </div>
        <div className="bill-detail-item">
          <span className="bill-detail-label">Due Date:</span>
          <span className="bill-detail-value">{formatDate(data.paymentDate)}</span>
        </div>
        <div className="bill-detail-item">
          <span className="bill-detail-label">GSTIN:</span>
          <span className="bill-detail-value">{data.gstin || "N/A"}</span>
        </div>
      </div>

      {/* Bill To / Ship To Section */}
      <div className="bill-address-section">
        <div className="bill-address-grid">
          <div className="bill-address-card">
            <div className="bill-address-header">
              <h3>Bill To</h3>
            </div>
            <div className="bill-address-content">
              <p className="bill-customer-name">{data.billingName || "Customer Name"}</p>
              <p className="bill-customer-address">{data.billingAddress || "Customer Address"}</p>
              <p className="bill-customer-phone">Phone: {data.billingPhone || "N/A"}</p>
              {data.billingGstin && <p className="bill-customer-gstin">GSTIN: {data.billingGstin}</p>}
            </div>
          </div>

          {data.shippingName && (
            <div className="bill-address-card">
              <div className="bill-address-header">
                <h3>Ship To</h3>
              </div>
              <div className="bill-address-content">
                <p className="bill-customer-name">{data.shippingName}</p>
                <p className="bill-customer-address">{data.shippingAddress}</p>
                <p className="bill-customer-phone">Phone: {data.shippingPhone}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Items Table */}
      <div className="bill-items-section">
        <div className="bill-table-container">
          <table className="bill-items-table">
            <thead>
              <tr className="bill-table-header">
                <th className="bill-th sno">S.No</th>
                <th className="bill-th description">Item Description</th>
                <th className="bill-th qty">Qty</th>
                <th className="bill-th rate">Rate ({currencySymbol})</th>
                <th className="bill-th amount">Amount ({currencySymbol})</th>
              </tr>
            </thead>
            <tbody>
              {data.items?.map((item, index) => (
                <tr key={index} className="bill-table-row">
                  <td className="bill-td sno">{index + 1}</td>
                  <td className="bill-td description">
                    <div className="bill-item-desc">
                      <span className="bill-item-name">{item.name || "Item Name"}</span>
                      {item.description && (
                        <span className="bill-item-detail">{item.description}</span>
                      )}
                      {item.hsn && (
                        <span className="bill-item-hsn">HSN: {item.hsn}</span>
                      )}
                    </div>
                  </td>
                  <td className="bill-td qty">{item.qty || item.qt || 0}</td>
                  <td className="bill-td rate">{Number(item.amount || 0).toFixed(2)}</td>
                  <td className="bill-td amount">{((item.qty || item.qt || 0) * (item.amount || 0)).toFixed(2)}</td>
                </tr>
              ))}
              
              {/* Empty rows for better bill format */}
              {(!data.items || data.items.length < 5) && 
                Array.from({ length: 5 - (data.items?.length || 0) }).map((_, index) => (
                  <tr key={`empty-${index}`} className="bill-table-row empty-row">
                    <td className="bill-td sno">{((data.items?.length || 0) + index + 1)}</td>
                    <td className="bill-td description"></td>
                    <td className="bill-td qty"></td>
                    <td className="bill-td rate"></td>
                    <td className="bill-td amount"></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>

      {/* Totals Section */}
      <div className="bill-totals-section">
        <div className="bill-totals-grid">
          <div className="bill-notes-section">
            {data.notes && (
              <div className="bill-notes">
                <h4>Terms & Conditions</h4>
                <p>{data.notes}</p>
              </div>
            )}
            
            {/* Bank Details */}
            {(data.accountName || data.accountNumber) && (
              <div className="bill-bank-details">
                <h4>Bank Details</h4>
                {data.accountName && <p><strong>Account Holder:</strong> {data.accountName}</p>}
                {data.accountNumber && <p><strong>Account Number:</strong> {data.accountNumber}</p>}
                {data.accountIfscCode && <p><strong>IFSC Code:</strong> {data.accountIfscCode}</p>}
                {data.bankName && <p><strong>Bank Name:</strong> {data.bankName}</p>}
              </div>
            )}
          </div>
          
          <div className="bill-amounts-section">
            <div className="bill-amounts-table">
              <div className="bill-amount-row">
                <span>Sub Total:</span>
                <span>{currencySymbol} {subtotal.toFixed(2)}</span>
              </div>
              {taxRate > 0 && (
                <div className="bill-amount-row">
                  <span>Tax ({taxRate}%):</span>
                  <span>{currencySymbol} {taxAmount.toFixed(2)}</span>
                </div>
              )}
              {data.discount > 0 && (
                <div className="bill-amount-row">
                  <span>Discount:</span>
                  <span>-{currencySymbol} {data.discount.toFixed(2)}</span>
                </div>
              )}
              {data.shippingCharges > 0 && (
                <div className="bill-amount-row">
                  <span>Shipping Charges:</span>
                  <span>{currencySymbol} {data.shippingCharges.toFixed(2)}</span>
                </div>
              )}
              <div className="bill-amount-row grand-total">
                <span>Grand Total:</span>
                <span>{currencySymbol} {total.toFixed(2)}</span>
              </div>
            </div>
            
            {/* Amount in Words */}
            <div className="bill-amount-words">
              <p><strong>Amount in Words:</strong> {data.totalInWords || "..."}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bill-footer">
        <div className="bill-footer-grid">
          <div className="bill-signature">
            <div className="bill-signature-line"></div>
            <p>Authorized Signature</p>
          </div>
          <div className="bill-stamp">
            <div className="bill-stamp-box">
              <span>STAMP</span>
            </div>
          </div>
        </div>
        
        <div className="bill-footer-note">
          <p>This is a computer generated invoice and does not require a physical signature.</p>
          <p>Thank you for your business!</p>
        </div>
      </div>
    </div>
  );
};

export default Template3;