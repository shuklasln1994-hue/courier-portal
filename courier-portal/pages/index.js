import { useState } from 'react';
import Head from 'next/head';

export default function CourierForm() {
  const [formData, setFormData] = useState({
    senderName: '',
    senderPhone: '',
    senderAddress: '',
    senderPincode: '',
    receiverName: '',
    receiverPhone: '',
    receiverAddress: '',
    receiverPincode: '',
    packageWeight: '',
    dimensions: '',
    description: '',
    serviceType: 'standard'
  });
  
  const [price, setPrice] = useState(0);
  const [priceBreakdown, setPriceBreakdown] = useState('Enter weight to calculate');

  const calculatePrice = (weight) => {
    const w = parseFloat(weight);
    if (isNaN(w) || w <= 0) {
      return { price: 0, breakdown: 'Enter valid weight' };
    }
    
    let price = 0;
    let breakdown = '';
    
    if (w <= 1) {
      price = 270;
      breakdown = 'Up to 1kg: ₹270';
    } else if (w <= 2) {
      price = 320;
      breakdown = 'Up to 2kg: ₹320';
    } else {
      const extraKg = Math.ceil(w - 2);
      price = 320 + (extraKg * 100);
      breakdown = `2kg: ₹320 + ${extraKg}kg × ₹100 = ₹${price}`;
    }
    
    return { price, breakdown };
  };

  const handleWeightChange = (e) => {
    const weight = e.target.value;
    setFormData(prev => ({ ...prev, packageWeight: weight }));
    
    const result = calculatePrice(weight);
    setPrice(result.price);
    setPriceBreakdown(result.breakdown);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const orderData = {
      ...formData,
      calculatedPrice: price,
      timestamp: new Date().toISOString()
    };
    
    // Here you'll integrate with Delhivery API
    console.log('Order submitted:', orderData);
    alert(`Order placed! Total cost: ₹${price}`);
  };

  return (
    <>
      <Head>
        <title>Ship Your Courier - NEXYE</title>
        <meta name="description" content="Fast, reliable courier shipping with real-time price calculation" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <div style={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '20px'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <form onSubmit={handleSubmit} style={{
            background: 'rgba(255,255,255,0.95)',
            borderRadius: '20px',
            padding: '40px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h1 style={{ 
                fontSize: '2.5rem', 
                color: '#2c3e50', 
                margin: '0 0 10px 0',
                textShadow: '1px 1px 3px rgba(0,0,0,0.1)'
              }}>
                📦 Ship Your Courier
              </h1>
              <p style={{ color: '#7f8c8d', fontSize: '1.1rem' }}>
                Fast, Reliable & Affordable Shipping
              </p>
            </div>

            {/* Sender Section */}
            <div style={{
              background: '#f8f9fa',
              padding: '25px',
              borderRadius: '15px',
              marginBottom: '25px',
              borderLeft: '5px solid #3498db'
            }}>
              <h2 style={{ color: '#2980b9', marginBottom: '20px' }}>
                👤 Sender Details
              </h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '5px' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="senderName"
                    value={formData.senderName}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '5px' }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="senderPhone"
                    value={formData.senderPhone}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '5px' }}>
                  Complete Address *
                </label>
                <textarea
                  name="senderAddress"
                  value={formData.senderAddress}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '14px',
                    resize: 'vertical',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '5px' }}>
                  Pincode *
                </label>
                <input
                  type="text"
                  name="senderPincode"
                  value={formData.senderPincode}
                  onChange={handleInputChange}
                  required
                  maxLength="6"
                  style={{
                    width: '200px',
                    padding: '12px',
                    border: '2px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            {/* Receiver Section */}
            <div style={{
              background: '#f8f9fa',
              padding: '25px',
              borderRadius: '15px',
              marginBottom: '25px',
              borderLeft: '5px solid #e74c3c'
            }}>
              <h2 style={{ color: '#c0392b', marginBottom: '20px' }}>
                🎯 Receiver Details
              </h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '5px' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="receiverName"
                    value={formData.receiverName}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '5px' }}>
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    name="receiverPhone"
                    value={formData.receiverPhone}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '5px' }}>
                  Complete Address *
                </label>
                <textarea
                  name="receiverAddress"
                  value={formData.receiverAddress}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '14px',
                    resize: 'vertical',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '5px' }}>
                  Pincode *
                </label>
                <input
                  type="text"
                  name="receiverPincode"
                  value={formData.receiverPincode}
                  onChange={handleInputChange}
                  required
                  maxLength="6"
                  style={{
                    width: '200px',
                    padding: '12px',
                    border: '2px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            {/* Package Section */}
            <div style={{
              background: '#f8f9fa',
              padding: '25px',
              borderRadius: '15px',
              marginBottom: '25px',
              borderLeft: '5px solid #f39c12'
            }}>
              <h2 style={{ color: '#d68910', marginBottom: '20px' }}>
                📦 Package Information
              </h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '5px' }}>
                    Weight (kg) *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    max="50"
                    name="packageWeight"
                    value={formData.packageWeight}
                    onChange={handleWeightChange}
                    required
                    placeholder="e.g. 1.5"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '5px' }}>
                    Dimensions (L×W×H cm)
                  </label>
                  <input
                    type="text"
                    name="dimensions"
                    value={formData.dimensions}
                    onChange={handleInputChange}
                    placeholder="e.g. 15×10×15"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '5px' }}>
                  Package Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="2"
                  placeholder="What are you shipping?"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '14px',
                    resize: 'vertical',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '5px' }}>
                  Service Type
                </label>
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleInputChange}
                  style={{
                    width: '250px',
                    padding: '12px',
                    border: '2px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '14px',
                    background: 'white',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="standard">Standard Delivery (2-4 days)</option>
                  <option value="express">Express Delivery (1-2 days)</option>
                </select>
              </div>
            </div>

            {/* Price Display */}
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              padding: '25px',
              borderRadius: '15px',
              textAlign: 'center',
              color: 'white',
              marginBottom: '30px',
              boxShadow: '0 10px 20px rgba(102,126,234,0.3)'
            }}>
              <h2 style={{ margin: '0 0 10px 0', fontSize: '1.5rem' }}>
                💰 Shipping Charges
              </h2>
              <div style={{ 
                fontSize: '3rem', 
                fontWeight: 'bold', 
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                marginBottom: '10px'
              }}>
                ₹{price}
              </div>
              <div style={{ fontSize: '1rem', opacity: '0.9' }}>
                {priceBreakdown}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={price === 0}
              style={{
                width: '100%',
                padding: '18px',
                background: price > 0 
                  ? 'linear-gradient(135deg, #28a745, #20c997)' 
                  : '#ccc',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '18px',
                fontWeight: '600',
                cursor: price > 0 ? 'pointer' : 'not-allowed',
                transition: 'all 0.3s',
                boxShadow: price > 0 
                  ? '0 5px 15px rgba(40,167,69,0.3)' 
                  : 'none'
              }}
            >
              📦 Place Shipping Order
            </button>
          </form>
        </div>
      </div>
    </>
  );
}