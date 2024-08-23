import React, { useState } from 'react';
import './PaymentForm.css'; // Import your custom CSS if needed

// Import images
import visaLogo from '../assets/images/visa.svg';
import mastercardLogo from '../assets/images/mastercard.svg';
import amexLogo from '../assets/images/amex.svg';

const PaymentForm = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [cardOwner, setCardOwner] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationMonth, setExpirationMonth] = useState('');
  const [expirationYear, setExpirationYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handlePaymentChange = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };

  const validateCardNumber = (number) => {
    const regex = /^\d{16}$/;
    return regex.test(number);
  };

  const validateExpirationDate = () => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    if (expirationYear < currentYear || (expirationYear === currentYear && expirationMonth < currentMonth)) {
      setErrorMessage('Expiration date cannot be in the past.');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const validateCvv = (cvv) => {
    const regex = /^\d{3,4}$/;
    return regex.test(cvv);
  };

  const validateCardOwner = (name) => {
    const regex = /^[A-Za-z\s]*$/; // Regex to allow only letters and spaces
    return regex.test(name);
  };

  const handleCardOwnerChange = (e) => {
    const value = e.target.value;
    if (validateCardOwner(value)) {
      setCardOwner(value);
      setErrorMessage(''); // Clear error message if input is valid
    } else {
      setErrorMessage('Invalid card owner name. It should not contain numeric values.');
    }
  };

  const handleCvvChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 4) {
      setCvv(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateCardOwner(cardOwner)) {
      setErrorMessage('Invalid card owner name. It should not contain numeric values.');
      return;
    }
    if (!validateCardNumber(cardNumber)) {
      setErrorMessage('Invalid card number. Please enter a 16-digit card number.');
      return;
    }
    if (!validateCvv(cvv)) {
      setErrorMessage('Invalid CVV. Please enter a 3 or 4-digit CVV.');
      return;
    }
    if (!validateExpirationDate()) {
      return; // Error message is already set
    }
    // Placeholder for saving data
    // e.g., Save data to the server or local storage

    setSuccessMessage('Payment details saved successfully! Your transaction is being processed.');
    setErrorMessage(''); // Clear any existing errors
  };

  const renderPaymentDetails = () => {
    switch (selectedPaymentMethod) {
      case 'Google Pay':
        return (
          <div>
            <h6 className="pb-2">Select your Google Pay account type</h6>
            <p>Google Pay integration details...</p>
          </div>
        );
      case 'PayPal':
        return (
          <div>
            <h6 className="pb-2">Select your PayPal account type</h6>
            <div className="form-group">
              <label className="radio-inline">
                <input type="radio" name="paypalRadio" defaultChecked /> Domestic
              </label>
              <label className="radio-inline ml-5">
                <input type="radio" name="paypalRadio" /> International
              </label>
            </div>
            <p>
              <button type="button" className="btn btn-primary">
                <i className="fab fa-paypal mr-2"></i> Log into my PayPal
              </button>
            </p>
            <p className="text-muted">
              Note: After clicking on the button, you will be directed to a secure gateway for payment. After completing the payment process, you will be redirected back to the website to view details of your order.
            </p>
          </div>
        );
      case 'PhonePe':
        return (
          <div>
            <h6 className="pb-2">Select your PhonePe account type</h6>
            <p>PhonePe integration details...</p>
          </div>
        );
      default:
        return <p>Select a payment method to see the details.</p>;
    }
  };

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-lg-8 mx-auto text-center">
          <h1 className="display-6 custom-font">Payment Forms</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 mx-auto">
          <div className="card">
            <div className="card-header">
              <div className="bg-white shadow-sm pt-4 pl-2 pr-2 pb-2">
                <ul role="tablist" className="nav bg-light nav-pills rounded nav-fill mb-3">
                  <li className="nav-item">
                    <a data-toggle="pill" href="#credit-card" className="nav-link active">
                      <i className="fas fa-credit-card mr-2"></i> Credit Card
                    </a>
                  </li>
                  <li className="nav-item">
                    <a data-toggle="pill" href="#paypal" className="nav-link">
                      <i className="fab fa-paypal mr-2"></i> Paypal
                    </a>
                  </li>
                  <li className="nav-item">
                    <a data-toggle="pill" href="#net-banking" className="nav-link">
                      <i className="fas fa-mobile-alt mr-2"></i> Net Banking
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="card-body">
              {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
              {successMessage && <div className="alert alert-success">{successMessage}</div>}
              <div className="tab-content">
                <div id="credit-card" className="tab-pane fade show active pt-3">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label>
                        <h6>Card Owner</h6>
                      </label>
                      <input
                        type="text"
                        placeholder="Card Owner Name"
                        required
                        className="form-control"
                        value={cardOwner}
                        onChange={handleCardOwnerChange}
                        minLength="3"
                      />
                    </div>
                    <div className="form-group" style={{ marginBottom: '10px' }}>
                      <label>
                        <h6>Card Number</h6>
                      </label>
                      <div className="input-group" style={{ marginBottom: '5px' }}>
                        <input
                          type="text"
                          placeholder="Valid card number"
                          className="form-control"
                          required
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          maxLength="16"
                        />
                        <div className="input-group-append">
                          <span className="input-group-text text-muted">
                            <img src={visaLogo} alt="Visa" className="payment-logo" />
                            <img src={mastercardLogo} alt="MasterCard" className="payment-logo" />
                            <img src={amexLogo} alt="American Express" className="payment-logo" />
                          </span>
                        </div>
                      </div>
                      {errorMessage.includes('card number') && <p className="text-danger">{errorMessage}</p>}
                    </div>

                    <div className="row">
                      <div className="col-sm-8">
                        <div className="form-group">
                          <label>
                            <h6>Expiration Date</h6>
                          </label>
                          <div className="input-group">
                            <input
                              type="number"
                              placeholder="MM"
                              className="form-control"
                              value={expirationMonth}
                              onChange={(e) => setExpirationMonth(Number(e.target.value))}
                              required
                              min="1"
                              max="12"
                            />
                            <input
                              type="number"
                              placeholder="YY"
                              className="form-control"
                              value={expirationYear}
                              onChange={(e) => setExpirationYear(Number(e.target.value))}
                              required
                              min={new Date().getFullYear() % 100}
                              max={new Date().getFullYear() % 100 + 20}
                            />
                          </div>
                          {errorMessage.includes('Expiration date') && <p className="text-danger">{errorMessage}</p>}
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="form-group mb-4">
                          <label>
                            <h6>CVV</h6>
                          </label>
                          <input
                            type="text"
                            placeholder="CVV"
                            className="form-control"
                            value={cvv}
                            onChange={handleCvvChange}
                            required
                            maxLength="4"
                          />
                          {errorMessage.includes('CVV') && <p className="text-danger">{errorMessage}</p>}
                        </div>
                      </div>
                    </div>

                    <div className="card-footer">
                      <button type="submit" className="subscribe btn btn-primary btn-block shadow-sm">
                        Confirm Payment
                      </button>
                    </div>
                  </form>
                </div>

                <div id="paypal" className="container tab-pane fade"><br />
                  <h6 className="pb-2">Select Payment Method</h6>
                  <div className="form-group">
                    <select className="form-control" onChange={handlePaymentChange} value={selectedPaymentMethod}>
                      <option value="" disabled>--Please select a payment method--</option>
                      <option value="Google Pay">Google Pay</option>
                      <option value="PayPal">PayPal</option>
                      <option value="PhonePe">PhonePe</option>
                    </select>
                  </div>
                  {renderPaymentDetails()}
                </div>

                <div id="net-banking" className="container tab-pane fade"><br />
                  <div className="form-group">
                    <label>
                      <h6>Select your Bank</h6>ls -R react-templates

                    </label>
                    <select className="form-control">
                      <option value="" disabled>--Please select your Bank--</option>
                      <option>Bank 1</option>
                      <option>Bank 2</option>
                      <option>Bank 3</option>
                      <option>Bank 4</option>
                      <option>Bank 5</option>
                      <option>Bank 6</option>
                      <option>Bank 7</option>
                      <option>Bank 8</option>
                      <option>Bank 9</option>
                      <option>Bank 10</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <p>
                      <button type="button" className="btn btn-primary">
                        <i className="fas fa-mobile-alt mr-2"></i> Proceed Payment
                      </button>
                    </p>
                  </div>
                  <p className="text-muted">
                    Note: After clicking on the button, you will be directed to a secure gateway for payment. After completing the payment process, you will be redirected back to the website to view details of your order.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
