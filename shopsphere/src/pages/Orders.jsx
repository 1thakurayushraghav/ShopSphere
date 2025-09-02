import React, { useState, useEffect } from 'react'
import { api } from '../services/api'

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    try {
      const response = await api.getOrders()
      if (response.success) {
        setOrders(response.data)
      }
    } catch (error) {
      console.error('Error loading orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status) => {
    const statusClasses = {
      'pending': 'bg-warning',
      'confirmed': 'bg-info',
      'shipped': 'bg-primary',
      'delivered': 'bg-success',
      'cancelled': 'bg-danger'
    }
    return `badge ${statusClasses[status] || 'bg-secondary'}`
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

  return (
    <div className="container py-5">
      <h2 className="mb-4" data-aos="fade-up">My Orders</h2>

      {orders.length === 0 ? (
        <div className="text-center" data-aos="fade-up">
          <i className="bi bi-box-seam fs-1 text-muted"></i>
          <h4 className="mt-3">No orders yet</h4>
          <p className="text-muted mb-4">You haven't placed any orders yet.</p>
          <Link to="/" className="btn btn-primary">Start Shopping</Link>
        </div>
      ) : (
        <div className="row">
          {orders.map((order, index) => (
            <div key={order.id} className="col-12 mb-4">
              <div className="card order-card" data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="card-header d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-1">Order #{order.id}</h6>
                    <small className="text-muted">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </small>
                  </div>
                  <span className={getStatusBadge(order.status)}>
                    {order.status.toUpperCase()}
                  </span>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-8">
                      <h6>Items:</h6>
                      {order.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="d-flex justify-content-between mb-1">
                          <span>{item.name} x{item.quantity}</span>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="col-md-4 text-md-end">
                      <h5 className="text-success">Total: ${order.total.toFixed(2)}</h5>
                      <button className="btn btn-sm btn-outline-primary mt-2">
                        <i className="bi bi-eye me-1"></i>View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Orders
