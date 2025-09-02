import React from 'react'

const Footer = () => {
  return (
    <footer className="footer mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6" data-aos="fade-up">
            <h5><i className="bi bi-shop me-2"></i>ShopSphere</h5>
            <p className="mb-3">
              Your ultimate shopping destination for quality products at great prices. 
              We're committed to providing excellent customer service and fast delivery.
            </p>
            <div className="social-links">
              <a href="#"><i className="bi bi-facebook"></i></a>
              <a href="#"><i className="bi bi-twitter"></i></a>
              <a href="#"><i className="bi bi-instagram"></i></a>
              <a href="#"><i className="bi bi-linkedin"></i></a>
            </div>
          </div>
          <div className="col-md-3" data-aos="fade-up" data-aos-delay="100">
            <h6>Quick Links</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white-50">About Us</a></li>
              <li><a href="#" className="text-white-50">Contact</a></li>
              <li><a href="#" className="text-white-50">Privacy Policy</a></li>
              <li><a href="#" className="text-white-50">Terms of Service</a></li>
            </ul>
          </div>
          <div className="col-md-3" data-aos="fade-up" data-aos-delay="200">
            <h6>Customer Service</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white-50">Help Center</a></li>
              <li><a href="#" className="text-white-50">Returns</a></li>
              <li><a href="#" className="text-white-50">Shipping Info</a></li>
              <li><a href="#" className="text-white-50">Track Order</a></li>
            </ul>
          </div>
        </div>
        <hr className="my-4" />
        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="mb-0">&copy; 2024 ShopSphere. All rights reserved.</p>
          </div>
          <div className="col-md-6 text-md-end">
            <p className="mb-0">Made with <i className="bi bi-heart-fill text-danger"></i> by ShopSphere Team</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer