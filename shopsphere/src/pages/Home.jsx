import React, { useState, useEffect } from 'react'
import { api } from '../services/api'
import { categories } from '../data/products'
import ProductCard from '../components/ProductCard'

const Home = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('name')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProducts()
  }, [])

  useEffect(() => {
    filterAndSortProducts()
  }, [products, selectedCategory, sortBy])

  const loadProducts = async () => {
    try {
      const response = await api.getProducts()
      if (response.success) {
        setProducts(response.data)
      }
    } catch (error) {
      console.error('Error loading products:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterAndSortProducts = () => {
    let filtered = products

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        case 'name':
        default:
          return a.name.localeCompare(b.name)
      }
    })

    setFilteredProducts(filtered)
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section" data-aos="fade-in">
        <div className="container">
          <h1 className="display-4 fw-bold mb-4">Welcome to ShopSphere</h1>
          <p className="lead mb-4">Discover amazing products at unbeatable prices</p>
          <a href="#products" className="btn btn-light btn-lg">
            Shop Now <i className="bi bi-arrow-down ms-2"></i>
          </a>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-5">
        <div className="container">
          <h2 className="text-center mb-5" data-aos="fade-up">Our Products</h2>

          {/* Filters */}
          <div className="category-filter" data-aos="fade-up">
            <div className="row align-items-center">
              <div className="col-md-6">
                <h6 className="mb-3 mb-md-0">Filter by Category:</h6>
                <div className="btn-group flex-wrap" role="group">
                  {categories.map(category => (
                    <button
                      key={category}
                      type="button"
                      className={`btn ${selectedCategory === category ? 'btn-primary' : 'btn-outline-primary'} btn-sm`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              <div className="col-md-6">
                <h6 className="mb-3 mb-md-0">Sort by:</h6>
                <select 
                  className="form-select form-select-sm"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="price-low">Price (Low to High)</option>
                  <option value="price-high">Price (High to Low)</option>
                  <option value="rating">Rating (Highest)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="loading-spinner">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {!loading && filteredProducts.length === 0 && (
            <div className="text-center py-5" data-aos="fade-up">
              <i className="bi bi-search fs-1 text-muted"></i>
              <h4 className="mt-3">No products found</h4>
              <p className="text-muted">Try adjusting your filters or browse all categories</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Home