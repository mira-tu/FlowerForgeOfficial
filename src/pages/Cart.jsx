import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
    // Mock Data
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Red Roses Bouquet', price: 1200, image: '/Pictures/HOME1.jpg', qty: 1, selected: true },
        { id: 2, name: 'Sunflower Arrangement', price: 1400, image: '/Pictures/HOME2.jpg', qty: 2, selected: false },
    ]);

    const toggleSelect = (id) => {
        setCartItems(cartItems.map(item =>
            item.id === id ? { ...item, selected: !item.selected } : item
        ));
    };

    const updateQty = (id, change) => {
        setCartItems(cartItems.map(item => {
            if (item.id === id) {
                const newQty = Math.max(1, item.qty + change);
                return { ...item, qty: newQty };
            }
            return item;
        }));
    };

    const removeItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const totalAmount = cartItems
        .filter(item => item.selected)
        .reduce((acc, item) => acc + (item.price * item.qty), 0);

    const totalItems = cartItems.filter(item => item.selected).length;

    return (
        <div className="container py-5 mt-5 bg-light" style={{ minHeight: '80vh' }}>
            <h2 className="fw-bold mb-4"><i className="fas fa-shopping-cart me-2"></i> Shopping Cart</h2>

            {cartItems.length === 0 ? (
                <div className="text-center py-5 bg-white rounded shadow-sm">
                    <img src="https://via.placeholder.com/150?text=Empty+Cart" alt="Empty Cart" className="mb-3 opacity-50" />
                    <h4 className="text-muted">Your cart is empty</h4>
                    <Link to="/" className="btn btn-primary mt-3 px-4 rounded-pill">Go Shopping</Link>
                </div>
            ) : (
                <div className="row">
                    <div className="col-lg-8">
                        {/* Cart Header */}
                        <div className="card border-0 shadow-sm mb-3 d-none d-md-block">
                            <div className="card-body py-2">
                                <div className="row align-items-center text-muted small fw-bold text-uppercase">
                                    <div className="col-6">Product</div>
                                    <div className="col-2 text-center">Unit Price</div>
                                    <div className="col-2 text-center">Quantity</div>
                                    <div className="col-2 text-center">Total Price</div>
                                </div>
                            </div>
                        </div>

                        {/* Cart Items */}
                        {cartItems.map(item => (
                            <div key={item.id} className="card border-0 shadow-sm mb-3">
                                <div className="card-body">
                                    <div className="row align-items-center">
                                        <div className="col-md-6 d-flex align-items-center mb-3 mb-md-0">
                                            <div className="form-check me-3">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    checked={item.selected}
                                                    onChange={() => toggleSelect(item.id)}
                                                />
                                            </div>
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="rounded"
                                                style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                                                onError={(e) => e.target.src = 'https://via.placeholder.com/80'}
                                            />
                                            <div className="ms-3">
                                                <h6 className="mb-1 fw-bold">{item.name}</h6>
                                                <button
                                                    className="btn btn-link text-danger p-0 text-decoration-none small"
                                                    onClick={() => removeItem(item.id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-md-2 text-center mb-2 mb-md-0">
                                            <span className="d-md-none text-muted small me-2">Price:</span>
                                            ₱{item.price.toLocaleString()}
                                        </div>
                                        <div className="col-md-2 text-center mb-2 mb-md-0">
                                            <div className="input-group input-group-sm justify-content-center" style={{ width: '100px', margin: '0 auto' }}>
                                                <button className="btn btn-outline-secondary" onClick={() => updateQty(item.id, -1)}>-</button>
                                                <input type="text" className="form-control text-center bg-white" value={item.qty} readOnly />
                                                <button className="btn btn-outline-secondary" onClick={() => updateQty(item.id, 1)}>+</button>
                                            </div>
                                        </div>
                                        <div className="col-md-2 text-center fw-bold text-primary">
                                            <span className="d-md-none text-muted small me-2">Total:</span>
                                            ₱{(item.price * item.qty).toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="col-lg-4">
                        <div className="card border-0 shadow-sm position-sticky" style={{ top: '100px' }}>
                            <div className="card-body">
                                <h5 className="fw-bold mb-3">Order Summary</h5>

                                {/* Vouchers */}
                                <div className="mb-3">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <small className="text-muted"><i className="fas fa-ticket-alt me-1"></i> Platform Voucher</small>
                                        <button className="btn btn-link p-0 small text-decoration-none">Select Voucher</button>
                                    </div>
                                    <div className="input-group input-group-sm">
                                        <input type="text" className="form-control" placeholder="Enter Code" />
                                        <button className="btn btn-outline-primary">Apply</button>
                                    </div>
                                </div>

                                <hr />

                                <div className="d-flex justify-content-between mb-2">
                                    <span className="text-muted">Selected Items ({totalItems})</span>
                                    <span>₱{totalAmount.toLocaleString()}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-2">
                                    <span className="text-muted">Shipping Fee</span>
                                    <span>₱0</span>
                                </div>

                                <hr />

                                <div className="d-flex justify-content-between mb-4">
                                    <span className="fw-bold fs-5">Total Payment</span>
                                    <span className="fw-bold fs-5 text-primary">₱{totalAmount.toLocaleString()}</span>
                                </div>

                                <button className="btn btn-primary w-100 py-2 fw-bold rounded-pill shadow-sm">
                                    Check Out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
