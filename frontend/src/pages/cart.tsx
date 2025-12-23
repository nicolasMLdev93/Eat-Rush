import React from 'react';
import '../styles/cart.css';
import Footer from '../components/footer';

const Cart = () => {
  
  const cartItems = [
    {
      id: 1,
      name: 'Classic Burger',
      price: 12.99,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Carne 100% res, lechuga, tomate, cebolla, queso cheddar'
    },
    {
      id: 2,
      name: 'Papas Fritas Clásicas',
      price: 5.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Porción grande de papas fritas crujientes'
    },
    {
      id: 3,
      name: 'Coca-Cola',
      price: 3.99,
      quantity: 3,
      image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Refresco de 500ml'
    }
  ];

 
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const deliveryFee = 2.99;
  const tax = subtotal * 0.08; 
  const total = subtotal + deliveryFee + tax;

  return (
    <div className="cart-container">
      <div className="cart-content">
       
        <div className="cart-header">
          <h1 className="cart-title">
            <span className="cart-icon">🛒</span>
            Tu Carrito
          </h1>
          <p className="cart-subtitle">
            {cartItems.length} {cartItems.length === 1 ? 'producto' : 'productos'} en el carrito
          </p>
        </div>

   
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="item-image">
                <img src={item.image} alt={item.name} />
              </div>
              
              <div className="item-details">
                <div className="item-header">
                  <h3 className="item-name">{item.name}</h3>
                  <span className="item-price">${item.price.toFixed(2)}</span>
                </div>
                
                <p className="item-description">{item.description}</p>
                
                <div className="item-controls">
                  <div className="quantity-controls">
                    <button className="quantity-btn minus">-</button>
                    <span className="quantity">{item.quantity}</span>
                    <button className="quantity-btn plus">+</button>
                  </div>
                  
                  <div className="item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  
                  <button className="remove-btn">
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

  
        <div className="order-summary">
          <h2 className="summary-title">Resumen del Pedido</h2>
          
          <div className="summary-details">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            
            <div className="summary-row">
              <span>Costo de envío</span>
              <span>${deliveryFee.toFixed(2)}</span>
            </div>
            
            <div className="summary-row">
              <span>Impuestos (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            
            <div className="summary-divider"></div>
            
            <div className="summary-row total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          
          <button className="checkout-btn">
            Proceder al Pago
          </button>
          
          <button className="continue-btn">
            ← Seguir Comprando
          </button>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Cart;