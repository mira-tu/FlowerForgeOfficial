import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Customized.css';

const placeholderStemImg = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

const customizationData = {
  flowers: [
    {
      id: 'f1',
      name: 'Red Rose',
      price: 150,
      img: './vecteezy_ai-generated-rose-png-isolated-on-transparent-background_36113190.png',
      layerImg: './vecteezy_ai-generated-rose-png-isolated-on-transparent-background_36113190.png',
      stemImg: './vecteezy_ai-generated-rose-png-isolated-on-transparent-background_36113190.png'
    },
    {
      id: 'f1-pink',
      name: 'Pink Rose',
      price: 150,
      img: './vecteezy_delicate-pink-rose-with-a-single-petal-resting-on-a-soft_54798755.png',
      layerImg: './vecteezy_delicate-pink-rose-with-a-single-petal-resting-on-a-soft_54798755.png',
      stemImg: './vecteezy_delicate-pink-rose-with-a-single-petal-resting-on-a-soft_54798755.png'
    },
    {
      id: 'f1-white',
      name: 'White Rose',
      price: 150,
      img: './vecteezy_single-white-rose-with-green-stem-and-delicate-petals-petals_68072715.png',
      layerImg: './vecteezy_single-white-rose-with-green-stem-and-delicate-petals-petals_68072715.png',
      stemImg: './vecteezy_single-white-rose-with-green-stem-and-delicate-petals-petals_68072715.png'
    },
    {
      id: 'f2',
      name: 'Sunflowers',
      price: 120,
      img: '../Pictures/HOME4.jpg',
      layerImg: '../Pictures/HOME4.jpg',
      stemImg: '../Pictures/HOME4.jpg'
    },
    {
      id: 'f3',
      name: 'Tulips',
      price: 180,
      img: '../Pictures/ASDay1.png',
      layerImg: '../Pictures/ASDay1.png',
      stemImg: '../Pictures/ASDay1.png'
    },
    {
      id: 'f4',
      name: 'Lilies',
      price: 160,
      img: '../Pictures/Sympathy1.png',
      layerImg: '../Pictures/Sympathy1.png',
      stemImg: '../Pictures/Sympathy1.png'
    },
    {
      id: 'f5',
      name: 'Mixed',
      price: 200,
      img: '../Pictures/MFDay1.png',
      layerImg: '../Pictures/MFDay1.png',
      stemImg: '../Pictures/MFDay1.png'
    }
  ],
  wrappers: [
    { id: 'w1', name: 'Kraft Paper', price: 50, img: './wrapper-removebg-preview.png', layerImg: './wrapper-removebg-preview.png' },
    { id: 'w2', name: 'Pink Matte', price: 80, img: 'https://via.placeholder.com/100/FFC0CB/FFFFFF?text=Pink', layerImg: 'https://via.placeholder.com/500/FFC0CB/FFFFFF?text=%20' },
    { id: 'w3', name: 'Black Elegant', price: 100, img: 'https://via.placeholder.com/100/000000/FFFFFF?text=Black', layerImg: 'https://via.placeholder.com/500/000000/FFFFFF?text=%20' },
    { id: 'w4', name: 'White Classic', price: 60, img: 'https://via.placeholder.com/100/FFFFFF/000000?text=White', layerImg: 'https://via.placeholder.com/500/FFFFFF/000000?text=%20' }
  ],
  ribbons: [
    { id: 'r1', name: 'Red Satin', price: 30, img: 'https://via.placeholder.com/100/FF0000/FFFFFF?text=Red', layerImg: 'https://via.placeholder.com/500/FF0000/FFFFFF?text=%20' },
    { id: 'r2', name: 'Gold Silk', price: 50, img: 'https://via.placeholder.com/100/FFD700/FFFFFF?text=Gold', layerImg: 'https://via.placeholder.com/500/FFD700/FFFFFF?text=%20' },
    { id: 'r3', name: 'Pink Bow', price: 30, img: 'https://via.placeholder.com/100/FF69B4/FFFFFF?text=Pink', layerImg: 'https://via.placeholder.com/500/FF69B4/FFFFFF?text=%20' }
  ]
};

const bundleOptions = [3, 6, 12];
const steps = [
  { id: 1, icon: 'fas fa-seedling', label: 'Flowers' },
  { id: 2, icon: 'fas fa-scroll', label: 'Wrapper' },
  { id: 3, icon: 'fas fa-ribbon', label: 'Ribbon' }
];

const getInitialPositions = (count) => {
  const positions = [];
  if (count === 3) {
    positions.push({ top: '45%', left: '42%', rotate: -5, zIndex: 1 });
    positions.push({ top: '45%', left: '50%', rotate: 0, zIndex: 2 });
    positions.push({ top: '45%', left: '58%', rotate: 5, zIndex: 1 });
  } else if (count === 6) {
    positions.push({ top: '42%', left: '42%', rotate: -5, zIndex: 1 });
    positions.push({ top: '42%', left: '50%', rotate: 0, zIndex: 1 });
    positions.push({ top: '42%', left: '58%', rotate: 5, zIndex: 1 });
    positions.push({ top: '48%', left: '45%', rotate: -5, zIndex: 2 });
    positions.push({ top: '48%', left: '55%', rotate: 5, zIndex: 2 });
    positions.push({ top: '52%', left: '50%', rotate: 0, zIndex: 3 });
  } else if (count === 12) {
    for (let i = 0; i < 12; i += 1) {
      const row = Math.floor(i / 4);
      const col = i % 4;
      positions.push({
        top: `${38 + row * 8}%`,
        left: `${35 + col * 10}%`,
        rotate: (Math.random() * 10) - 5,
        zIndex: i
      });
    }
  }
  return positions;
};

const Customized = ({ addToCart }) => {
  const [activeStep, setActiveStep] = useState(1);
  const [selection, setSelection] = useState({
    flower: null,
    bundleSize: 0,
    wrapper: null,
    ribbon: null
  });

  const handleBundleSelect = (size) => {
    setSelection((prev) => ({ ...prev, bundleSize: size }));
  };

  const handleOptionSelect = (type, id) => {
    const item = customizationData[type].find((entry) => entry.id === id);
    if (!item) return;
    setSelection((prev) => {
      const next = { ...prev, [type === 'flowers' ? 'flower' : type === 'wrappers' ? 'wrapper' : 'ribbon']: item };
      if (type === 'flowers' && prev.bundleSize === 0) {
        next.bundleSize = 3;
      }
      return next;
    });
  };

  const handleReset = () => {
    setSelection({ flower: null, bundleSize: 0, wrapper: null, ribbon: null });
    setActiveStep(1);
  };

  const totalPrice = useMemo(() => {
    let total = 0;
    if (selection.flower && selection.bundleSize) {
      total += selection.flower.price * selection.bundleSize;
    }
    if (selection.wrapper) total += selection.wrapper.price;
    if (selection.ribbon) total += selection.ribbon.price;
    return total;
  }, [selection]);

  const handleAddToCart = () => {
    if (!selection.flower || !selection.bundleSize) {
      alert('Please complete your bouquet selection!');
      return;
    }
    const bouquetName = `${selection.flower.name} Bouquet (${selection.bundleSize} stems)`;
    if (addToCart) {
      addToCart(bouquetName, totalPrice, selection.flower.img);
    }
    alert(`Added to cart! Total: ₱${totalPrice}`);
  };

  const stemImage = selection.flower?.stemImg || selection.flower?.layerImg || placeholderStemImg;
  const stemSlots = selection.flower && selection.bundleSize ? getInitialPositions(selection.bundleSize) : [];
  const isEmpty = !selection.flower || !selection.bundleSize;

  const formatPrice = (value) => `₱${value.toLocaleString('en-PH')}`;

  const renderOptions = (groupKey, selectedId) => (
    <div className="grid-options" id={`${groupKey}Options`}>
      {customizationData[groupKey].map((item) => (
        <button
          key={item.id}
          type="button"
          className={`option-card ${selectedId === item.id ? 'selected' : ''}`}
          onClick={() => handleOptionSelect(groupKey, item.id)}
        >
          <img src={item.img} alt={item.name} className="option-img" />
          <div className="option-name">{item.name}</div>
          <div className="option-price">+{formatPrice(item.price)}{groupKey === 'flowers' ? '/pc' : ''}</div>
        </button>
      ))}
    </div>
  );

  return (
    <div className="customize-page">
      <header className="app-header">
        <div className="header-left">
          <Link to="/" className="back-link">
            <i className="fas fa-chevron-left" /> Back
          </Link>
          <span className="divider" />
          <h3>Customizer Studio</h3>
        </div>
        <div className="header-right">
          <button type="button" className="back-link border-0 bg-transparent" onClick={handleReset}>
            <i className="fas fa-undo" /> Reset
          </button>
          <div className="price-display">
            <span className="label">Total</span>
            <span className="amount">{formatPrice(totalPrice)}</span>
          </div>
          <button type="button" className="btn-action" onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </header>

      <main className="editor-layout">
        <section className="preview-canvas">
          <div className="canvas-container">
            <div className="bouquet-stage">
              {selection.wrapper && (
                <img src={selection.wrapper.layerImg} alt="Wrapper" className="layer" style={{ zIndex: 1 }} />
              )}
              <div id="stem-slots-container" className="layer" style={{ zIndex: 2 }}>
                {stemSlots.map((slot, index) => (
                  <div
                    key={`${slot.left}-${slot.top}-${index}`}
                    className="stem-slot-wrapper"
                    style={{ left: slot.left, top: slot.top, transform: `rotate(${slot.rotate}deg)`, zIndex: slot.zIndex }}
                  >
                    <img src={stemImage} alt="Selected stem" className="stem-slot" />
                  </div>
                ))}
              </div>
              {selection.ribbon && (
                <img src={selection.ribbon.layerImg} alt="Ribbon" className="layer" style={{ zIndex: 3 }} />
              )}
              {isEmpty && (
                <div className="empty-state">
                  <i className="fas fa-seedling" />
                  <p>Select a flower to start</p>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="tools-interface">
          <nav className="vertical-toolbar">
            {steps.map((step) => (
              <button
                key={step.id}
                type="button"
                className={`tool-btn ${activeStep === step.id ? 'active' : ''}`}
                onClick={() => setActiveStep(step.id)}
              >
                <i className={step.icon} />
                <span>{step.label}</span>
              </button>
            ))}
          </nav>

          <div className="options-panel">
            <div className={`panel-content ${activeStep === 1 ? 'active' : ''}`} id="step1">
              <div className="panel-header">
                <h4>Choose Flowers</h4>
                <p>Select your base blooms</p>
              </div>

              <div className="control-group">
                <label>Bundle Size</label>
                <div className="bundle-selector-group">
                  {bundleOptions.map((size) => (
                    <button
                      key={size}
                      type="button"
                      className={`bundle-pill ${selection.bundleSize === size ? 'active' : ''}`}
                      onClick={() => handleBundleSelect(size)}
                    >
                      {size} Stems
                    </button>
                  ))}
                </div>
              </div>

              <div className="control-group">
                <label>Flower Type</label>
                {renderOptions('flowers', selection.flower?.id || null)}
              </div>
            </div>

            <div className={`panel-content ${activeStep === 2 ? 'active' : ''}`} id="step2">
              <div className="panel-header">
                <h4>Select Wrapper</h4>
                <p>Wrap it with style</p>
              </div>
              <div className="control-group">
                <label>Wrapper Style</label>
                {renderOptions('wrappers', selection.wrapper?.id || null)}
              </div>
            </div>

            <div className={`panel-content ${activeStep === 3 ? 'active' : ''}`} id="step3">
              <div className="panel-header">
                <h4>Add Ribbon</h4>
                <p>The finishing touch</p>
              </div>
              <div className="control-group">
                <label>Ribbon Color</label>
                {renderOptions('ribbons', selection.ribbon?.id || null)}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Customized;
