import React from "react";
import { useState, useEffect } from "react";
import get_ordersUser from "../services/get_ordersIDUser";
import { jwtDecode } from "jwt-decode";
import type { OrderApi } from "../interfaces/interfaces";
import '../styles/orders.css';
import Footer from "../components/footer";

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<OrderApi[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("authToken");
        
        if (!token) {
          setError("No hay token de autenticación");
          setLoading(false);
          return;
        }
        const decoded = jwtDecode(token);
        const userId = decoded.userId || decoded.id;

        if (!userId) {
          setError("No se pudo obtener el ID del usuario");
          setLoading(false);
          return;
        }
        const ordersData = await get_ordersUser(userId);
        setOrders(ordersData);
      } catch (err) {
        setError("Error al cargar las órdenes");
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-wrapper">
          <div className="spinner"></div>
        </div>
        <p className="spinner-text">Cargando tus órdenes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <div className="error-icon">⚠️</div>
        <h2 className="error-title">Error de conexión</h2>
        <p className="error-description">{error}</p>
        <button 
          className="retry-button"
          onClick={() => window.location.reload()}
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📦</div>
        <h2 className="empty-title">No hay órdenes registradas</h2>
        <p className="empty-description">
          Aún no has realizado ninguna compra. ¡Explora nuestros productos!
        </p>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-container">
        <header className="orders-header">
          <h1 className="orders-title">Mis Pedidos</h1>
          <p className="orders-subtitle">
            {orders.length} {orders.length === 1 ? 'orden registrada' : 'órdenes registradas'}
          </p>
        </header>

        <div className="orders-grid">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-card-header">
                <div className="order-id-container">
                  <div className="order-id">
                    ORDEN <span className="order-id-number">#{order.id}</span>
                  </div>
                  <div className="order-date">
                    {new Date().toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </div>
                </div>

                <div className="status-badge status-completed">
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </div>
              </div>

              <div className="order-card-body">
                <div className="order-details">
                  <div className="detail-row">
                    <div className="detail-icon address">📍</div>
                    <div className="detail-content">
                      <div className="detail-label">Dirección de entrega</div>
                      <div className="detail-value">{order.deliveryAddress}</div>
                    </div>
                  </div>

                  <div className="detail-row">
                    <div className="detail-icon payment">💳</div>
                    <div className="detail-content">
                      <div className="detail-label">Método de pago</div>
                      <div className="detail-value">
                        {order.paymentMethod.charAt(0).toUpperCase() + order.paymentMethod.slice(1)}
                      </div>
                      <div className={`status-badge ${
                        order.paymentStatus === 'paid' ? 'status-completed' :
                        order.paymentStatus === 'pending' ? 'status-pending' :
                        'status-cancelled'
                      }`}>
                        {order.paymentStatus}
                      </div>
                    </div>
                  </div>

                  <div className="order-total-section">
                    <div className="total-label">Total del pedido</div>
                    <div className="total-amount">
                      <span className="total-currency">$</span>
                      {order.totalAmount.toFixed(2)}
                    </div>
                  </div>

                  {order.deliveryNotes && (
                    <div className="notes-section">
                      <div className="notes-label">Notas especiales</div>
                      <div className="notes-content">
                        "{order.deliveryNotes}"
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="order-card-footer">
                <button className="action-button">
                  📄 Ver detalles
                </button>

              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Orders;