import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'

const ProductCard = ({ product }) => {
  const { addItem } = useCart()

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
  }

  return (
    <div className="col" data-aos="fade-up">
      <Link to={`/product/${product.id}`} className="text-decoration-none">
        <div className="card h-100 product-card">
          <div className="position-relative">
            <img 
              src={product.image} 
              className="card-img-top" 
              alt={product.name}
              style={{ height: '200px', objectFit: 'cover' }}
            />
            {product.inStock && (
              <span className="position-absolute top-0 end-0 badge bg-success m-2">
                In Stock
              </span>
            )}
          </div>
          <div className="card-body d-flex flex-column">
            <h6 className="card-title text-dark">{product.name}</h6>
            <p className="card-text text-muted small flex-grow-1">
              {product.description.substring(0, 80)}...
            </p>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="price-tag">${product.price}</span>
              <div className="text-muted small">
                <i className="bi bi-star-fill text-warning"></i>
                {product.rating} ({product.reviews})
              </div>
            </div>
            <button 
              className="btn btn-primary w-100"
              onClick={handleAddToCart}
            >
              <i className="bi bi-cart-plus me-2"></i>
              Add to Cart
            </button>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard