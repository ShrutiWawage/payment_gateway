import React from 'react';
import './Receipt.css'; // Create a CSS file for styling if necessary

const ReceiptPage = ({ cardOwner = 'N/A', cardNumber = '', expirationDate = 'N/A', amountPaid = 'N/A' }) => {
  // Mask card number except for last 4 digits if cardNumber is provided
  const maskedCardNumber = cardNumber ? `**** **** **** ${cardNumber.slice(-4)}` : 'N/A';

  return (
    <div className="container receipt-container">
      <div className="receipt-card">
        <h2 className="receipt-title">Payment Successful!</h2>
        <p className="receipt-subtitle">Thank you for your payment</p>

        <div className="receipt-info">
          <h4>Receipt Details</h4>
          <ul>
            <li>
              <strong>Card Owner:</strong> {cardOwner}
            </li>
            <li>
              <strong>Card Number:</strong> {maskedCardNumber}
            </li>
            <li>
              <strong>Expiration Date:</strong> {expirationDate}
            </li>
            <li>
              <strong>Amount Paid:</strong> ${amountPaid}
            </li>
          </ul>
        </div>

        <div className="receipt-footer">
          <p>If you have any questions, please contact support.</p>
          <button onClick={() => window.print()} className="btn btn-primary">
            Print Receipt
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptPage;
