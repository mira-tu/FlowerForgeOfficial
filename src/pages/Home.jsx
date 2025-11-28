import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import eventImg from '../assets/pictures/EVENTSPECIFIC.jpg';
import customImg from '../assets/pictures/CUSTOMIZED.jpg';
import specialImg from '../assets/pictures/SPECIALORDERPAGE.jpg';

const products = [
    { id: 1, name: 'Elegant Sympathy Bouquet', price: 1200, category: 'Sympathy', image: '/Pictures/HOME1.jpg' },
    { id: 2, name: 'Tranquil White Lilies', price: 1500, category: 'Sympathy', image: '/Pictures/HOME2.jpg' },
    { id: 3, name: 'Radiant Wedding Roses', price: 1800, category: 'Wedding', image: '/Pictures/HOME3.jpg' },
    { id: 4, name: 'Sunlit Wedding Peonies', price: 1400, category: 'Wedding', image: '/Pictures/HOME4.jpg' },
    { id: 5, name: 'Comfort Garden Mix', price: 1600, category: 'Sympathy', image: '/Pictures/HOME2.jpg' },
    { id: 6, name: 'Classic Bridal Bouquet', price: 2100, category: 'Wedding', image: '/Pictures/HOME3.jpg' },
    { id: 7, name: 'Graceful Remembrance', price: 1350, category: 'Sympathy', image: '/Pictures/HOME1.jpg' },
    { id: 8, name: 'Blushing Bride Arrangement', price: 1950, category: 'Wedding', image: '/Pictures/HOME4.jpg' },
];

const Home = ({ addToCart, searchTerm }) => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const filteredProducts = products
        .filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter(product => selectedCategory === 'All' || product.category === selectedCategory);

    return (
        <div>
            {/* Hero Carousel */}
            <div id="heroCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <Link to="/book-event">
                            <img src={eventImg} className="d-block w-100" alt="Event Flowers" />
                        </Link>
                        <div className="carousel-caption">
                            <h2>Book Your Event Now</h2>
                            <p>Booking early helps us craft your perfect floral experience</p>
                            <Link to="/book-event" className="btn btn-hero">Book An Event</Link>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <Link to="/customized">
                            <img src={customImg} className="d-block w-100" alt="Custom Flowers" />
                        </Link>
                        <div className="carousel-caption">
                            <h2>Design Your Own Bouquet</h2>
                            <p>Choose your favorite flowers, colors, and ribbons</p>
                            <Link to="/customized" className="btn btn-hero">Start Customizing</Link>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <Link to="/special-order">
                            <img src={specialImg} className="d-block w-100" alt="Special Orders" />
                        </Link>
                        <div className="carousel-caption">
                            <h2>Special Orders</h2>
                            <p>Add chocolates, teddy bears, and personalized gifts</p>
                            <Link to="/special-order" className="btn btn-hero">Start to Craft</Link>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            {/* Categories */}
            <div className="container">
                <div className="category-nav text-center">
                    {['All', 'Sympathy', 'Wedding'].map((category) => (
                        <button
                            key={category}
                            type="button"
                            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Featured Products */}
            <section className="py-5">
                <div className="container">
                    <h2 className="text-center mb-5 fw-bold" style={{ color: 'var(--text-dark)' }}>Featured Collections</h2>
                    <div className="row g-4" id="productList">
                        {filteredProducts.map((product, index) => (
                            <div key={index} className="col-md-3 col-sm-6">
                                <div className="product-card">
                                    <div className="product-img-wrapper">
                                        <img src={product.image} alt={product.name} />
                                    </div>
                                    <div className="product-body">
                                        <h5 className="product-title">{product.name}</h5>
                                        <p className="product-price">₱{product.price.toLocaleString()}</p>
                                        <button
                                            className="btn-add-cart"
                                            onClick={() => addToCart(product.name, product.price, product.image)}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
