import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addItem, decrementItem, removeItem } from '../store/slices/cartSlice';

const Cart = () => {
  const { items, count, total } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // State for shipping and coupon
  const [shippingCountry, setShippingCountry] = useState('United Kingdom');
  const [state, setState] = useState('');
  const [postCode, setPostCode] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');

  const handleContinueShopping = () => {
    navigate('/products');
  };

  const handleUpdateCart = () => {
    console.log('Update cart clicked');
    alert('Cart updated successfully!');
  };

  const handleProceedToCheckout = () => {
    if (items.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    navigate('/checkout');
  };

  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      setAppliedCoupon(couponCode);
      alert(`Coupon "${couponCode}" applied successfully!`);
      setCouponCode('');
    } else {
      alert('Please enter a coupon code');
    }
  };

  const shippingRate = 0.05; // 5% flat rate
  const shippingCost = total * shippingRate;
  const finalTotal = appliedCoupon ? total - shippingCost : total;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Your Cart</h1>
      <p style={styles.count}>There are {count} products in your cart</p>
      
      <div style={styles.cartLayout}>
        {/* Left Column - Cart Items */}
        <div style={styles.leftColumn}>
          {/* Cart Items */}
          <div style={styles.cartItems}>
            <div style={styles.headerRow}>
              <span style={styles.headerProduct}>Product</span>
              <span style={styles.headerPrice}>Unit Price</span>
              <span style={styles.headerQuantity}>Quantity</span>
              <span style={styles.headerSubtotal}>Subtotal</span>
              <span style={styles.headerRemove}>Remove</span>
            </div>
            
            {items.map(item => (
              <div key={item.id} style={styles.cartItem}>
                <div style={styles.productInfo}>
                  <div style={styles.productImageContainer}>
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        style={styles.productImage}
                      />
                    ) : (
                      <div style={styles.imagePlaceholder}>No Image</div>
                    )}
                  </div>
                  <div style={styles.productDetails}>
                    <div style={styles.productName}>{item.name}</div>
                    <div style={styles.rating}>
                      ★★★★★ <span style={styles.ratingText}>(4.0)</span>
                    </div>
                  </div>
                </div>
                <div style={styles.unitPrice}>${item.price.toFixed(2)}</div>
                <div style={styles.quantity}>
                  <button 
                    style={styles.quantityBtn}
                    onClick={() => dispatch(decrementItem(item.id))}
                  >
                    -
                  </button>
                  <span style={styles.quantityValue}>{item.quantity}</span>
                  <button 
                    style={styles.quantityBtn}
                    onClick={() => dispatch(addItem(item))}
                  >
                    +
                  </button>
                </div>
                <div style={styles.subtotal}>${(item.price * item.quantity).toFixed(2)}</div>
                <div style={styles.remove}>
                  <button 
                    style={styles.removeBtn}
                    onClick={() => dispatch(removeItem(item.id))}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Continue Shopping Button */}
          <div style={styles.continueShoppingSection}>
            <button 
              style={styles.continueShoppingBtn}
              onClick={handleContinueShopping}
            >
              Continue Shopping
            </button>
          </div>
        </div>

        {/* Right Column - Cart Totals and Actions */}
        <div style={styles.rightColumn}>
          {/* Cart Summary */}
          <div style={styles.summary}>
            <h2 style={styles.total}>${finalTotal.toFixed(2)}</h2>
            
            <table style={styles.summaryTable}>
              <tbody>
                <tr>
                  <td style={styles.tableLabel}>Subtotal</td>
                  <td style={styles.tableValue}>${total.toFixed(2)}</td>
                </tr>
                <tr>
                  <td style={styles.tableLabel}>Shipping</td>
                  <td style={styles.tableValue}>
                    {appliedCoupon ? `$${shippingCost.toFixed(2)}` : 'Free'}
                  </td>
                </tr>
                {appliedCoupon && (
                  <tr>
                    <td style={styles.tableLabel}>Coupon Discount</td>
                    <td style={styles.tableValue}>-${shippingCost.toFixed(2)}</td>
                  </tr>
                )}
                <tr>
                  <td style={styles.tableLabel}>Estimate for</td>
                  <td style={styles.tableValue}>{shippingCountry}</td>
                </tr>
                <tr style={styles.totalRow}>
                  <td style={styles.tableLabel}>Total</td>
                  <td style={styles.tableValue}>${finalTotal.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
            
            <button 
              style={{
                ...styles.checkoutBtn,
                opacity: items.length === 0 ? 0.6 : 1
              }}
              onClick={handleProceedToCheckout}
              disabled={items.length === 0}
            >
              Proceed To Checkout
            </button>
          </div>

          {/* Calculate Shipping Section */}
          <div style={styles.shippingSection}>
            <h3 style={styles.sectionTitle}>Calculate Shipping</h3>
            <div style={styles.shippingInfo}>
              <div style={styles.shippingRate}>
                <strong>Flat rate:</strong> 5%
              </div>
              
              <div style={styles.shippingInputGroup}>
                <label style={styles.shippingLabel}>United Kingdom</label>
                <select 
                  style={styles.shippingSelect}
                  value={shippingCountry}
                  onChange={(e) => setShippingCountry(e.target.value)}
                >
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                </select>
              </div>
              
              <div style={styles.shippingInputGroup}>
                <label style={styles.shippingLabel}>State / Country</label>
                <input 
                  type="text"
                  style={styles.shippingInput}
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="Enter state or country"
                />
              </div>
              
              <div style={styles.shippingInputGroup}>
                <label style={styles.shippingLabel}>PostCode / ZIP</label>
                <input 
                  type="text"
                  style={styles.shippingInput}
                  value={postCode}
                  onChange={(e) => setPostCode(e.target.value)}
                  placeholder="Enter postcode"
                />
              </div>
            </div>
          </div>

          {/* Update Cart Button */}
          <div style={styles.updateCartSection}>
            <button 
              style={styles.updateCartBtn}
              onClick={handleUpdateCart}
            >
              Update Cart
            </button>
          </div>

          {/* Apply Coupon Section */}
          <div style={styles.couponSection}>
            <h3 style={styles.sectionTitle}>Apply Coupon</h3>
            <div style={styles.couponInfo}>
              <div style={styles.couponText}>Using A Promo Code?</div>
              
              <div style={styles.couponInputGroup}>
                <input 
                  type="text"
                  style={styles.couponInput}
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter Your Coupon"
                />
                <button 
                  style={styles.applyCouponBtn}
                  onClick={handleApplyCoupon}
                >
                  Apply
                </button>
              </div>
              
              {appliedCoupon && (
                <div style={styles.appliedCoupon}>
                  Coupon applied: <strong>{appliedCoupon}</strong>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    fontSize: '14px',
    color: '#333',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  count: {
    marginBottom: '30px',
    color: '#666',
  },
  cartLayout: {
    display: 'flex',
    gap: '30px',
    alignItems: 'flex-start',
  },
  leftColumn: {
    flex: '2',
  },
  rightColumn: {
    flex: '1',
    minWidth: '300px',
  },
  cartItems: {
    marginBottom: '20px',
  },
  headerRow: {
    display: 'flex',
    padding: '10px 0',
    borderBottom: '1px solid #ddd',
    fontWeight: 'bold',
    fontSize: '12px',
    textTransform: 'uppercase',
  },
  headerProduct: {
    flex: '3',
  },
  headerPrice: {
    flex: '1',
    textAlign: 'center',
  },
  headerQuantity: {
    flex: '1',
    textAlign: 'center',
  },
  headerSubtotal: {
    flex: '1',
    textAlign: 'center',
  },
  headerRemove: {
    flex: '0.5',
    textAlign: 'center',
  },
  cartItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px 0',
    borderBottom: '1px solid #eee',
  },
  productInfo: {
    flex: '3',
    display: 'flex',
    alignItems: 'center',
  },
  productImageContainer: {
    width: '60px',
    height: '60px',
    marginRight: '15px',
    flexShrink: 0,
  },
  productImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '8px',
    border: '1px solid #eee',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f5f5f5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    border: '1px solid #ddd',
    color: '#999',
    fontSize: '10px',
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontWeight: 'bold',
    marginBottom: '5px',
    fontSize: '14px',
  },
  rating: {
    color: '#FFD700',
    fontSize: '12px',
  },
  ratingText: {
    color: '#666',
    marginLeft: '5px',
  },
  unitPrice: {
    flex: '1',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  quantity: {
    flex: '1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityBtn: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    border: '1px solid #ddd',
    backgroundColor: 'white',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
  },
  quantityValue: {
    margin: '0 10px',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  subtotal: {
    flex: '1',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  remove: {
    flex: '0.5',
    textAlign: 'center',
  },
  removeBtn: {
    background: 'none',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    color: '#999',
  },
  continueShoppingSection: {
    marginBottom: '30px',
  },
  continueShoppingBtn: {
    backgroundColor: 'transparent',
    color: '#333',
    border: '2px solid #ddd',
    padding: '12px 30px',
    fontSize: '14px',
    fontWeight: 'bold',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
  },
  summary: {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  total: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center',
  },
  summaryTable: {
    width: '100%',
    marginBottom: '20px',
  },
  tableLabel: {
    textAlign: 'left',
    padding: '8px 0',
    color: '#666',
  },
  tableValue: {
    textAlign: 'right',
    padding: '8px 0',
    fontWeight: 'bold',
  },
  totalRow: {
    borderTop: '1px solid #ddd',
  },
  checkoutBtn: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '15px',
    fontSize: '16px',
    fontWeight: 'bold',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
  },
  shippingSection: {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '15px',
    color: '#333',
  },
  shippingInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  shippingRate: {
    color: '#666',
    marginBottom: '10px',
  },
  shippingInputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  shippingLabel: {
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#666',
  },
  shippingSelect: {
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
  },
  shippingInput: {
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
  },
  updateCartSection: {
    marginBottom: '20px',
  },
  updateCartBtn: {
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    padding: '12px 30px',
    fontSize: '14px',
    fontWeight: 'bold',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
  },
  couponSection: {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '8px',
  },
  couponInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  couponText: {
    color: '#666',
    marginBottom: '10px',
  },
  couponInputGroup: {
    display: 'flex',
    gap: '8px',
  },
  couponInput: {
    flex: '1',
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
  },
  applyCouponBtn: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: 'bold',
    borderRadius: '4px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  appliedCoupon: {
    marginTop: '10px',
    padding: '8px',
    backgroundColor: '#e8f5e8',
    border: '1px solid #4CAF50',
    borderRadius: '4px',
    fontSize: '12px',
    textAlign: 'center',
  },
};

export default Cart;