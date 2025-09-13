import { useState } from 'react'
import Head from 'next/head'

export default function Home() {
  const [weight, setWeight] = useState('')
  const [price, setPrice] = useState(0)
  const [breakdown, setBreakdown] = useState('Enter weight to calculate')

  const calculatePrice = (w) => {
    const weightNum = parseFloat(w)
    if (isNaN(weightNum) || weightNum <= 0) {
      setPrice(0)
      setBreakdown('Enter valid weight')
      return
    }
    
    let newPrice = 0
    let newBreakdown = ''
    
    if (weightNum <= 1) {
      newPrice = 270
      newBreakdown = 'Up to 1kg: ₹270'
    } else if (weightNum <= 2) {
      newPrice = 320
      newBreakdown = 'Up to 2kg: ₹320'
    } else {
      const extraKg = Math.ceil(weightNum - 2)
      newPrice = 320 + (extraKg * 100)
      newBreakdown = `2kg: ₹320 + ${extraKg}kg × ₹100 = ₹${newPrice}`
    }
    
    setPrice(newPrice)
    setBreakdown(newBreakdown)
  }

  const handleWeightChange = (e) => {
    const newWeight = e.target.value
    setWeight(newWeight)
    calculatePrice(newWeight)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Order submitted! Total: ₹${price}`)
  }

  return (
    <>
      <Head>
        <title>Ship Your Courier - NEXYE</title>
        <meta name="description" content="Fast, reliable courier shipping" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <div style={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '20px',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <form onSubmit={handleSubmit} style={{
            background: 'white',
            borderRadius: '20px',
            padding: '40px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h1 style={{ 
                fontSize: '2.5rem', 
                color: '#2c3e50', 
                margin: '0 0 10px 0'
              }}>
                📦 Ship Your Courier
              </h1>
              <p style={{ color: '#7f8c8d', fontSize: '1.1rem' }}>
                Fast, Reliable & Affordable Shipping
              </p>
            </div>

            {/* Sender Details */}
            <div style={{
              background: '#f8f9fa',
              padding: '25px',
              borderRadius: '15px',
              marginBottom: '25px'
            }}>
              <h2 style={{ color: '#2980b9', marginBottom: '20px' }}>
                👤 Sender Details
              </h2>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '5px' }}>
                  Full Name *
                </label>
                <input
                  type="text"
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

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '5px' }}>
                  Phone Number *
                </label>
                <input
                  type="tel"
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

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '5px' }}>
                  Address *
                </label>
                <textarea
                  required
                  rows="3"
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
                  Pincode *
                </label>
                <input
                  type="text"
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

            {/* Receiver Details */}
            <div style={{
              background: '#f8f9fa',
              padding: '25px',
              borderRadius: '15px',
              marginBottom: '25px'
            }}>
              <h2 style={{ color: '#c0392b', marginBottom: '20px' }}>
                🎯 Receiver Details
              </h2>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '5px' }}>
                  Full Name *
                </label>
                <input
                  type="text"
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

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '5px' }}>
                  Mobile Number *
                </label>
                <input
                  type="tel"
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

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '5px' }}>
                  Address *
                </label>
                <textarea
                  required
                  rows="3"
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
                  Pincode *
                </label>
                <input
                  type="text"
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

            {/* Package Details */}
            <div style={{
              background: '#f8f9fa',
              padding: '25px',
              borderRadius: '15px',
              marginBottom: '25px'
            }}>
              <h2 style={{ color: '#d68910', marginBottom: '20px' }}>
                📦 Package Information
              </h2>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '5px' }}>
                  Weight (kg) *
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  max="50"
                  value={weight}
                  onChange={handleWeightChange}
                  required
                  placeholder="e.g. 1.5"
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

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '5px' }}>
                  Description *
                </label>
                <textarea
                  required
                  rows="2"
                  placeholder="What are you shipping?"
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

            {/* Price Display */}
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              padding: '25px',
              borderRadius: '15px',
              textAlign: 'center',
              color: 'white',
              marginBottom: '30px'
            }}>
              <h2 style={{ margin: '0 0 10px 0', fontSize: '1.5rem' }}>
                💰 Shipping Charges
              </h2>
              <div style={{ 
                fontSize: '3rem', 
                fontWeight: 'bold',
                marginBottom: '10px'
              }}>
                ₹{price}
              </div>
              <div style={{ fontSize: '1rem', opacity: '0.9' }}>
                {breakdown}
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
                cursor: price > 0 ? 'pointer' : 'not-allowed'
              }}
            >
              📦 Place Shipping Order
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
