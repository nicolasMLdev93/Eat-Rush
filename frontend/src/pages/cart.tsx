import React, { useState } from "react";
import "../styles/cart.css";
import Footer from "../components/footer";
import { products_images } from "../data/images";
import { useDispatch, useSelector } from "react-redux";
import type { Product_cart } from "../interfaces/interfaces";
import { useNavigate } from "react-router-dom";
import {
  delete_product,
  increase_quantity,
  decrease_quantity,
  clear_cart,
  login_user,
  logout_user,
} from "../cart/slice";
import {
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cart, total, logged,total_products } = useSelector((state) => state.cart);

  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({
    open: false,
    title: "",
    message: "",
    onConfirm: () => {},
  });

  const getProdImg = (id: number) => {
    const img = products_images.find((prod) => prod.id === id);
    return img?.image;
  };

  const showNotification = (
    message: string,
    severity: "success" | "error" | "info" | "warning"
  ) => {
    setNotification({
      open: true,
      message,
      severity,
    });
  };

  const showConfirmDialog = (
    title: string,
    message: string,
    onConfirm: () => void
  ) => {
    setConfirmDialog({
      open: true,
      title,
      message,
      onConfirm,
    });
  };

  const handleIncreaseQuantity = (id: number) => {
    dispatch(increase_quantity({ id }));
  };

  const handleDecreaseQuantity = (id: number) => {
    dispatch(decrease_quantity({ id }));
  };

  const handleRemoveItem = (id: number) => {
    dispatch(delete_product({ id }));
    showNotification("Producto eliminado del carrito", "success");
  };

  const handleClearCart = () => {
    showConfirmDialog(
      "Vaciar carrito",
      "¿Estás seguro de que quieres vaciar el carrito?",
      () => {
        dispatch(clear_cart());
        showNotification("Carrito vaciado", "success");
      }
    );
  };


  const handleContinueShopping = () => {
    navigate("/");
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      showNotification(
        "Tu carrito está vacío. Agrega productos antes de proceder al pago.",
        "warning"
      );
      return;
    }

    if (!logged) {
      showConfirmDialog(
        "Iniciar sesión",
        "Debes iniciar sesión para proceder al pago. ¿Quieres iniciar sesión ahora?",
        () => {
          navigate("/login");
        }
      );
    } else {
      navigate("/checkout");
    }
  };

  const handleLogin = () => {
    dispatch(login_user());
    showNotification("Sesión iniciada (simulación)", "success");
  };

  const handleLogout = () => {
    showConfirmDialog(
      "Cerrar sesión",
      "¿Estás seguro de que quieres cerrar sesión?",
      () => {
        dispatch(logout_user());
        showNotification("Sesión cerrada", "info");
      }
    );
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const handleCloseConfirmDialog = () => {
    setConfirmDialog({ ...confirmDialog, open: false });
  };

  const subtotal = total;
  const tax = subtotal * 0.08;
  const total_price = subtotal + tax;
  const shipping = subtotal > 50 ? 0 : 5.99;

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <div className="cart-content">
          <div className="cart-header">
            <h1 className="cart-title">
              <span className="cart-icon">🛒</span>
              Tu Carrito
            </h1>
            <div className="auth-buttons">
              {logged ? (
                <button className="logout-btn" onClick={handleLogout}>
                  Cerrar Sesión
                </button>
              ) : (
                <button className="login-btn" onClick={handleLogin}>
                  Iniciar Sesión
                </button>
              )}
            </div>
          </div>

          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h2 className="empty-cart-title">Tu carrito está vacío</h2>
            <p className="empty-cart-message">
              {logged
                ? "¡Hola de nuevo! Tu carrito está vacío, agrega algunos productos."
                : "Parece que aún no has agregado productos a tu carrito. ¡Explora nuestros productos!"}
            </p>
            <button
              className="continue-shopping-btn"
              onClick={handleContinueShopping}
            >
              ← Comenzar a Comprar
            </button>
            {!logged && (
              <p className="login-suggestion">
                ¿Tienes una cuenta?{" "}
                <button className="text-login-btn" onClick={handleLogin}>
                  Inicia sesión
                </button>{" "}
                para ver tu historial de compras.
              </p>
            )}
          </div>
        </div>
        <Footer />

        <Snackbar
          open={notification.open}
          autoHideDuration={1500}
          onClose={handleCloseNotification}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={handleCloseNotification}
            severity={notification.severity}
            sx={{ width: "100%" }}
          >
            {notification.message}
          </Alert>
        </Snackbar>

        <Dialog open={confirmDialog.open} onClose={handleCloseConfirmDialog}>
          <DialogTitle>{confirmDialog.title}</DialogTitle>
          <DialogContent>
            <DialogContentText>{confirmDialog.message}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirmDialog}>Cancelar</Button>
            <Button
              onClick={() => {
                confirmDialog.onConfirm();
                handleCloseConfirmDialog();
              }}
              autoFocus
            >
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-content">
        <div className="cart-header">
          <div className="cart-header-left">
            <h1 className="cart-title">
              <span className="cart-icon">🛒</span>
              Tu Carrito
            </h1>
            <p className="cart-subtitle">
              {cart.length} {cart.length === 1 ? "producto" : "productos"} en el
              carrito
            </p>
          </div>

          <div className="cart-header-right">
            <div className="auth-status">
              {logged ? (
                <>
                  <span className="user-status">👤 Conectado</span>
                  <button className="logout-btn small" onClick={handleLogout}>
                    Salir
                  </button>
                </>
              ) : (
                <button className="login-btn small" onClick={handleLogin}>
                  Iniciar Sesión
                </button>
              )}
            </div>
            <button
              className="clear-cart-btn"
              onClick={handleClearCart}
              title="Vaciar todo el carrito"
            >
              🗑️ Vaciar Todo
            </button>
          </div>
        </div>

        <div className="cart-items">
          {cart.map((item: Product_cart) => (
            <div key={item.id} className="cart-item">
              <div className="item-image">
                <img src={getProdImg(item.id)} alt={item.name} />
                {item.quantity > 1 && (
                  <span className="quantity-badge">{item.quantity}</span>
                )}
              </div>

              <div className="item-details">
                <div className="item-header">
                  <div className="item-info">
                    <h3 className="item-name">{item.name}</h3>
                  </div>
                  <div className="item-price-section">
                    <span className="item-unit-price">
                      ${item.price.toFixed(2)} c/u
                    </span>
                    <span className="item-total-price">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>

                {item.description && (
                  <p className="item-description">{item.description}</p>
                )}

                <div className="item-controls">
                  <div className="quantity-section">
                    <div className="quantity-controls">
                      <button
                        className="quantity-btn minus"
                        onClick={() => handleDecreaseQuantity(item.id)}
                        disabled={item.quantity <= 1}
                        aria-label="Reducir cantidad"
                      >
                        −
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button
                        className="quantity-btn plus"
                        onClick={() => handleIncreaseQuantity(item.id)}
                        aria-label="Aumentar cantidad"
                      >
                        +
                      </button>
                    </div>
                    <span className="quantity-label">Cantidad</span>
                  </div>

                  <div className="item-subtotal">
                    <span className="subtotal-label">Subtotal:</span>
                    <span className="subtotal-amount">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => handleRemoveItem(item.id)}
                    title="Eliminar producto"
                    aria-label="Eliminar producto"
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="order-summary">
          <h2 className="summary-title">
            <span className="summary-icon">📋</span>
            Resumen del Pedido
          </h2>

          <div className="summary-details">
            <div className="summary-row">
              <span>
                Subtotal ({cart.reduce((acc, item) => acc + item.quantity, 0)}{" "}
                items)
              </span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Costo de envío</span>
              <span>
                {shipping === 0 ? (
                  <span className="free-shipping">🎉 Gratis</span>
                ) : (
                  `$${shipping.toFixed(2)}`
                )}
              </span>
            </div>

            <div className="summary-row">
              <span>Impuestos (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            {subtotal < 50 && shipping > 0 && (
              <div className="shipping-notice">
                <span className="notice-icon">🚚</span>
                <span>
                  ¡Agrega ${(50 - subtotal).toFixed(2)} más para envío gratis!
                </span>
              </div>
            )}

            <div className="summary-divider"></div>

            <div className="summary-row total">
              <span>Total</span>
              <span className="total-amount">${total_price.toFixed(2)}</span>
            </div>
          </div>

          <div className="summary-actions">
            <button
              className="checkout-btn"
              onClick={handleCheckout}
              disabled={cart.length === 0}
            >
              {logged ? "🛒 Proceder al Pago" : "🔐 Iniciar Sesión para Pagar"}
            </button>

            <button className="continue-btn" onClick={handleContinueShopping}>
              ← Seguir Comprando
            </button>
          </div>

          {!logged && (
            <div className="login-prompt">
              <p>
                <span className="prompt-icon">🔐</span>
                Inicia sesión para guardar tu carrito y acceder a ofertas
                exclusivas.
              </p>
              <button className="prompt-login-btn" onClick={handleLogin}>
                Iniciar Sesión
              </button>
            </div>
          )}

          <div className="payment-methods">
            <span className="payment-label">Métodos de pago aceptados:</span>
            <div className="payment-icons">
              <span>💳</span>
              <span>🏦</span>
              <span>📱</span>
              <span>💰</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      <Snackbar
        open={notification.open}
        autoHideDuration={1500}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>

      <Dialog open={confirmDialog.open} onClose={handleCloseConfirmDialog}>
        <DialogTitle>{confirmDialog.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{confirmDialog.message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog}>Cancelar</Button>
          <Button
            onClick={() => {
              confirmDialog.onConfirm();
              handleCloseConfirmDialog();
            }}
            autoFocus
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Cart;
