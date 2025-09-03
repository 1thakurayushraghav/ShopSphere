import React from 'react'
import { Link } from 'react-router-dom'
import { products, categories } from '../data/products'

const Products = () => {
  return (
    <div className="container py-5">
      <h2 className="mb-4">Our Products</h2>
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <div className="card h-100 shadow-sm">
              <img 
                src={product.image} 
                className="card-img-top" 
                alt={product.name} 
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text text-muted">₹{product.price}</p>
                <Link 
                  to={`/products/${product.id}`} 
                  className="btn btn-primary mt-auto"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Products
