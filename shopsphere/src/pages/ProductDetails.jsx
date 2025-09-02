import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../services/api'
import { useCart } from '../contexts/CartContext'

const ProductDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    loadProduct()
  }, [id])

  const loadProduct = async () => {
    try {
      const response = await api.getProductById(id)
      if (response.success) {
        setProduct(response.data)
      } else {
        navigate('/')
      }
    } catch (error) {
      console.error('Error loading product:', error)
      navigate('/')
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product)
    }
  }

  if (loading) {
    return (
      <div className="container py-5">
        <div className="loading-spinner">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container py-5 text-center">
        <h3>Product not found</h3>
        <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    )
  }

  return (
    <div className="container py-5">
      <button className="btn btn-outline-secondary mb-4" onClick={() => navigate(-1)}>
        <i className="bi bi-arrow-left me-2"></i>Back
      </button>

      <div className="row">
        <div className="col-md-6" data-aos="fade-right">
          <img 
            src={product.image} 
            alt={product.name}
            className="img-fluid rounded shadow-lg"
            style={{ width: '100%', height: '400px', objectFit: 'cover' }}
          />
        </div>
        <div className="col-md-6" data-aos="fade-left">
          <div className="ps-md-4">
            <h1 className="mb-3">{product.name}</h1>
            <div className="mb-3">
              <span className="badge bg-primary me-2">{product.category}</span>
              <span className="text-muted">
                <i className="bi bi-star-fill text-warning me-1"></i>
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
            <h2 className="price-tag mb-4">${product.price}</h2>
            <p className="lead mb-4">{product.description}</p>

            {product.inStock ? (
              <div className="mb-4">
                <span className="badge bg-success fs-6">
                  <i className="bi bi-check-circle me-1"></i>In Stock
                </span>
              </div>
            ) : (
              <div className="mb-4">
                <span className="badge bg-danger fs-6">Out of Stock</span>
              </div>
            )}

            <div className="mb-4">
              <label className="form-label fw-bold">Quantity:</label>
              <div className="quantity-controls">
                <button 
                  className="quantity-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <i className="bi bi-dash"></i>
                </button>
                <span className="mx-3 fs-5 fw-bold">{quantity}</span>
                <button 
                  className="quantity-btn"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <i className="bi bi-plus"></i>
                </button>
              </div>
            </div>

            <div className="d-grid gap-2">
              <button 
                className="btn btn-primary btn-lg"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <i className="bi bi-cart-plus me-2"></i>
                Add to Cart (${(product.price * quantity).toFixed(2)})
              </button>
              <button className="btn btn-outline-success btn-lg">
                <i className="bi bi-lightning me-2"></i>
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Features */}
      <div className="row mt-5">
        <div className="col-12" data-aos="fade-up">
          <h3 className="mb-4">Why Choose This Product?</h3>
          <div className="row">
            <div className="col-md-4">
              <div className="text-center p-3">
                <i className="bi bi-shield-check text-primary fs-1"></i>
                <h5 className="mt-2">Quality Guaranteed</h5>
                <p className="text-muted">Premium quality products with warranty</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center p-3">
                <i className="bi bi-truck text-success fs-1"></i>
                <h5 className="mt-2">Fast Shipping</h5>
                <p className="text-muted">Free delivery on orders over $50</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center p-3">
                <i className="bi bi-headset text-info fs-1"></i>
                <h5 className="mt-2">24/7 Support</h5>
                <p className="text-muted">Round-the-clock customer service</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails