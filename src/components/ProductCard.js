import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

function ProductCard({ product }) {
  // Get backend URL from environment
  const BACKEND_URL = process.env.REACT_APP_API_URL?.replace('/api', '') || 'http://localhost:3001';
  
  // Check if user is logged in
  const isLoggedIn = !!localStorage.getItem('token');
  
  // Construct full image URL
  // If image_url starts with http/https, use it as is (external URL)
  // Otherwise, prepend backend URL (uploaded image)
  const imageUrl = product.image_url 
    ? (product.image_url.startsWith('http') 
        ? product.image_url 
        : `${BACKEND_URL}${product.image_url}`)
    : 'https://placehold.co/300x200/95a5a6/white?text=No+Image';

  return (
    <div className="product-card">
      <div className="product-image">
        <img 
          src={imageUrl} 
          alt={product.name}
          onError={(e) => {
            e.target.src = 'https://placehold.co/300x200/95a5a6/white?text=No+Image';
          }}
        />
      </div>
      
      <div className="product-details">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        
        <div className="product-footer">
          <span className="product-price">${product.price}</span>
          <span className="product-stock">
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </span>
        </div>
        
        {product.category && (
          <span className="product-category">{product.category}</span>
        )}
        
        {isLoggedIn && (
          <Link to={`/edit-product/${product.id}`} className="btn-edit">
            Edit
          </Link>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
