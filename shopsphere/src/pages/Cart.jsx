import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'

const Cart = () => {
  const { cartItems, removeItem, updateQuantity, clearCart, getCartTotal } = useCart()

  if (cartItems.length === 0) {
    return (
      <div className="container py-5">
        <div className="text-center" data-aos="fade-up">
          <i className="bi bi-cart-x fs-1 text-muted"></i>
          <h2 className="mt-3">Your cart is empty</h2>
          <p className="text-muted mb-4">Looks like you haven't added any items to your cart yet.</p>
          <Link to="/" className="btn btn-primary">
            <i className="bi bi-shop me-2"></i>Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-8">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 data-aos="fade-right">Shopping Cart</h2>
            <button className="btn btn-outline-danger" onClick={clearCart}>
              <i className="bi bi-trash me-2"></i>Clear Cart
            </button>
          </div>

          {cartItems.map((item, index) => (
            <div key={item.id} className="card mb-3" data-aos="fade-up" data-aos-delay={index * 100}>
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-md-2">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="img-fluid rounded"
                      style={{ height: '80px', width: '80px', objectFit: 'cover' }}
                    />
                  </div>
                  <div className="col-md-4">
                    <h6 className="mb-1">{item.name}</h6>
                    <small className="text-muted">{item.category}</small>
                  </div>
                  <div className="col-md-2">
                    <span className="fw-bold">${item.price}</span>
                  </div>
                  <div className="col-md-3">
                    <div className="quantity-controls justify-content-center">
                      <button 
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <i className="bi bi-dash"></i>
                      </button>
                      <span className="mx-3">{item.quantity}</span>
                      <button 
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <i className="bi bi-plus"></i>
                      </button>
                    </div>
                  </div>
                  <div className="col-md-1">
                    <button 
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => removeItem(item.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="col-md-4">
          <div className="card" data-aos="fade-left">
            <div className="card-header">
              <h5 className="mb-0">Order Summary</h5>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Tax:</span>
                <span>${(getCartTotal() * 0.08).toFixed(2)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold fs-5">
                <span>Total:</span>
                <span>${(getCartTotal() * 1.08).toFixed(2)}</span>
              </div>
              <div className="d-grid gap-2 mt-4">
                <Link to="/checkout" className="btn btn-primary btn-lg">
                  <i className="bi bi-credit-card me-2"></i>Proceed to Checkout
                </Link>
                <Link to="/" className="btn btn-outline-secondary">
                  <i className="bi bi-arrow-left me-2"></i>Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
