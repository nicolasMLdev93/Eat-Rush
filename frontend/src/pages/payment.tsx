import React, { useState, FormEvent, ChangeEvent } from "react";
import "../styles/payment.css";
import Footer from "../components/footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clear_cart } from "../cart/slice";

const Payment: React.FC = () => {
  const { cart, total, logged, total_products } = useSelector(
    (state) => state.cart
  );
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  useEffect(() => {
    if (!logged || total_products === 0) {
      navigate("/");
    }
  }, [logged, total_products, navigate]);

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    deliveryInstructions: "",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    saveInfo: false,
    tip: 10,
    totalAmount: "",
    status: "Pending",
    paymentMethod: "",
  });

  const orderSummary = {
    subtotal: total,
    deliveryFee: 0,
    tip: formData.tip,
    total: total + formData.tip,
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\s/g, "");
    value = value.replace(/\D/g, "");
    if (value.length > 16) value = value.slice(0, 16);

    const formatted = value.replace(/(.{4})/g, "$1 ").trim();
    setFormData({
      ...formData,
      cardNumber: formatted,
    });
  };

  const handleExpiryDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);

    if (value.length >= 2) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }

    setFormData({
      ...formData,
      expiryDate: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const response = await fetch("http://localhost:3000/new_order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          totalAmount: total + formData.tip,
          status: "Pending",
          deliveryAddress: formData.address,
          deliveryNotes: formData.deliveryInstructions,
          paymentMethod: paymentMethod,
          paymentStatus: "Pending",
          userId: 3,
          restaurantId: null,
          items: cart.map((item) => ({
            quantity: item.quantity,
            unitPrice: item.price,
            subtotal: item.price * item.quantity,
            productId: item.id,
          })),
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setShowSuccessModal(true);
        setTimeout(() => {
          dispatch(clear_cart());
          navigate("/");
        }, 3000);
      } else {
        alert("Error al realizar la compra: " + data.error);
      }
    } catch (error) {
      alert("Error de conexión. Inténtalo de nuevo.");
      console.error("Error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const closeModalAndRedirect = () => {
    setShowSuccessModal(false);
    navigate("/");
  };

  return (
    <>
      <div className="payment-container">
        <div className="payment-content">
          <div className="payment-header">
            <h1 className="payment-title">
              <span className="payment-icon">💳</span>
              Finalizar Compra
            </h1>
            <p className="payment-subtitle">
              Completa tu información para recibir tu pedido
            </p>
          </div>

          <div className="payment-form-container">
            <form onSubmit={handleSubmit} className="payment-form">
              <section className="form-section">
                <h2 className="section-title">
                  <span className="section-icon">📍</span>
                  Información de envío
                </h2>

                <div className="form-grid">
                  <div className="form-group">
                    <label>Nombre completo *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Juan Pérez"
                      required
                      style={{ width: "90%" }}
                    />
                  </div>

                  <div className="form-group">
                    <label>Correo electrónico *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="correo@ejemplo.com"
                      required
                      style={{ width: "90%" }}
                    />
                  </div>

                  <div className="form-group">
                    <label>Teléfono *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
                      required
                      style={{ width: "90%" }}
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Dirección de entrega *</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Calle Principal #123, Colonia"
                      required
                      style={{ width: "90%" }}
                    />
                  </div>

                  <div className="form-group">
                    <label>Ciudad *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Ciudad"
                      required
                      style={{ width: "90%" }}
                    />
                  </div>

                  <div className="form-group">
                    <label>Código Postal *</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      placeholder="12345"
                      required
                      style={{ width: "90%" }}
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Instrucciones de entrega (opcional)</label>
                    <textarea
                      name="deliveryInstructions"
                      value={formData.deliveryInstructions}
                      onChange={handleChange}
                      placeholder="Ej: Llamar antes de llegar, dejar en la puerta, etc."
                      rows="3"
                      style={{ resize: "none", width: "90%" }}
                    />
                  </div>
                </div>
              </section>

              <section className="form-section">
                <h2 className="section-title">
                  <span className="section-icon">💳</span>
                  Método de Pago
                </h2>

                <div className="payment-methods">
                  <button
                    type="button"
                    className={`payment-method-btn ${
                      paymentMethod === "card" ? "active" : ""
                    }`}
                    onClick={() => setPaymentMethod("card")}
                  >
                    💳 Tarjeta de crédito/débito
                  </button>
                  <button
                    type="button"
                    className={`payment-method-btn ${
                      paymentMethod === "cash" ? "active" : ""
                    }`}
                    onClick={() => setPaymentMethod("cash")}
                  >
                    💰 Efectivo al recibir
                  </button>
                </div>

                {paymentMethod === "card" && (
                  <div className="card-form">
                    <div className="form-group">
                      <label>Número de tarjeta *</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                        required
                        style={{ width: "90%" }}
                      />
                    </div>

                    <div className="form-group">
                      <label>Nombre en la tarjeta *</label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        placeholder="JUAN PEREZ"
                        required
                        style={{ width: "90%" }}
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Fecha de expiración *</label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleExpiryDateChange}
                          placeholder="MM/YY"
                          maxLength="5"
                          required
                          style={{ width: "90%" }}
                        />
                      </div>

                      <div className="form-group">
                        <label>CVV</label>
                        <input
                          type="password"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleChange}
                          placeholder="123"
                          maxLength="3"
                          required
                          style={{ width: "90%" }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "cash" && (
                  <div className="cash-message">
                    <p>💰 Pagarás en efectivo cuando recibas tu pedido.</p>
                    <p className="small">
                      Ten el dinero exacto preparado para una entrega más
                      rápida.
                    </p>
                  </div>
                )}
              </section>

              <section className="form-section">
                <h2 className="section-title">
                  <span className="section-icon">💝</span>
                  Propina para el repartidor
                </h2>

                <div className="tip-options">
                  {[0, 10, 15, 20].map((percent) => (
                    <button
                      key={percent}
                      type="button"
                      className={`tip-btn ${
                        formData.tip === percent ? "active" : ""
                      }`}
                      onClick={() => setFormData({ ...formData, tip: percent })}
                    >
                      {percent === 0 ? "Sin propina" : `${percent}%`}
                    </button>
                  ))}
                </div>
              </section>

              <section className="form-section">
                <div className="checkbox-group">
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      name="saveInfo"
                      checked={formData.saveInfo}
                      onChange={handleChange}
                    />
                    <span>Guardar información para futuras compras</span>
                  </label>
                </div>
              </section>

              <div className="form-actions">
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={isProcessing}
                >
                  {isProcessing ? "Procesando..." : "Confirmar y Pagar"}
                </button>
                <button
                  type="button"
                  className="back-btn"
                  onClick={() => navigate("/cart")}
                >
                  ← Volver al carrito
                </button>
              </div>
            </form>
            <div className="order-summary-sidebar">
              <h2 className="summary-title">Resumen del Pedido</h2>

              <div className="restaurant-info">
                <h3>🍔 Solo te falta confirmar!</h3>
                <p>Entrega estimada: 25-35 min</p>
              </div>

              <div className="items-list">
                {cart.map((item, index) => (
                  <div key={index} className="item-row">
                    <span className="item-name">
                      {item.name} x {item.quantity}
                    </span>
                    <span className="item-price">
                      ${(item.price * item.quantity).toFixed(2)}{" "}
                    </span>
                  </div>
                ))}
              </div>

              <div className="summary-details">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${orderSummary.subtotal.toFixed(2)}</span>
                </div>

                <div className="summary-row">
                  <span>Costo de envío</span>
                  <span>${orderSummary.deliveryFee.toFixed(2)}</span>
                </div>

                <div className="summary-row">
                  <span>Propina ({formData.tip}%)</span>
                  <span>${orderSummary.tip.toFixed(2)}</span>
                </div>

                <div className="summary-divider"></div>

                <div className="summary-row total">
                  <span>Total</span>
                  <span>${orderSummary.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="security-info">
                <p>🔒 Pago 100% seguro</p>
                <p className="small">
                  Tu información está protegida con encriptación
                </p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>

      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="success-modal">
            <div className="modal-icon">✅</div>
            <h2 className="modal-title">¡Compra Realizada con Éxito!</h2>
            <p className="modal-message">
              Tu pedido ha sido confirmado y está siendo procesado.
            </p>
            <p className="modal-redirect">
              Serás redirigido a la página principal en 3 segundos...
            </p>
            <button className="modal-button" onClick={closeModalAndRedirect}>
              Ir al inicio ahora
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Payment;
