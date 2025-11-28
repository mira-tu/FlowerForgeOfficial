import React from 'react';
import { Link } from 'react-router-dom';

const Wishlist = () => {
    // Mock Data
    const wishlistItems = [
        { id: 1, name: 'Red Roses Bouquet', price: 1200, image: '/Pictures/HOME1.jpg', stock: 'In Stock' },
        { id: 2, name: 'Sunflower Arrangement', price: 1400, image: '/Pictures/HOME2.jpg', stock: 'In Stock' },
        { id: 3, name: 'White Lilies', price: 1500, image: '/Pictures/HOME3.jpg', stock: 'Out of Stock' },
    ];

    return (
        <div className="container py-5 mt-5">
            <h2 className="fw-bold mb-4 text-center">My Wishlist</h2>

            {wishlistItems.length === 0 ? (
                <div className="text-center py-5">
                    <i className="far fa-heart fa-3x text-muted mb-3"></i>
                    <p className="text-muted">Your wishlist is empty.</p>
                    <Link to="/" className="btn btn-primary rounded-pill px-4">Continue Shopping</Link>
                </div>
            ) : (
                <div className="row g-4">
                    {wishlistItems.map(item => (
                        <div key={item.id} className="col-md-4 col-lg-3">
                            <div className="card h-100 border-0 shadow-sm product-card">
                                <div className="position-relative" style={{ height: '250px', overflow: 'hidden' }}>
                                    <img
                                        src={item.image}
                                        className="card-img-top w-100 h-100"
                                        style={{ objectFit: 'cover' }}
                                        alt={item.name}
                                        onError={(e) => e.target.src = 'https://via.placeholder.com/250'}
                                    />
                                    <button className="btn btn-light rounded-circle position-absolute top-0 end-0 m-2 shadow-sm text-danger">
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                                <div className="card-body text-center">
                                    <h5 className="card-title fw-bold mb-1">{item.name}</h5>
                                    <p className="text-primary fw-bold mb-2">₱{item.price.toLocaleString()}</p>
                                    <span className={`badge ${item.stock === 'In Stock' ? 'bg-success-subtle text-success' : 'bg-secondary-subtle text-secondary'} mb-3`}>
                                        {item.stock}
                                    </span>
                                    <button
                                        className="btn btn-outline-primary w-100 rounded-pill"
                                        disabled={item.stock !== 'In Stock'}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;
