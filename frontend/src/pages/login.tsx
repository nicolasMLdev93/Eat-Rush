import React, { useState, FormEvent, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { login_user } from "../cart/slice";
import { useEffect } from "react";
import "../styles/login.css";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showCredentialsModal, setShowCredentialsModal] =
    useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [formData_login, setformData_login] = useState({
    email: "",
    password: "",
  });
  const [formData_register, setformData_register] = useState({
    firstName: "",
    surName: "",
    email: "",
    password: "",
    isActive: true,
    role: "user",
  });

  const testCredentials = [
    { email: "nico.bauza@example.com", password: "Contraseña26@" },
  ];

  const handleSubmit_login = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData_login),
      });
      const data = await response.json();
      if (response.ok) {
        setModalMessage("¡Inicio de sesión exitoso!");
        localStorage.setItem("authToken", data.token);
        dispatch(login_user());
        setShowModal(true);
        setformData_login({ email: "", password: "" });
      } else {
        const error_msg: string = String(data.error);
        setModalMessage(error_msg);
        setShowModal(true);
      }
    } catch (error) {
      setModalMessage("Error de conexión. Intenta nuevamente.");
      setShowModal(true);
    }
  };

  const handleSubmit_register = async (e: FormEvent) => {
    e.preventDefault();
    setModalMessage(
      "La base de datos es limitada por lo tanto a modo de prueba esta acción esta restringida."
    );
    setShowModal(true);
  };

  const handleChange_login = (e: ChangeEvent<HTMLInputElement>) => {
    setformData_login({
      ...formData_login,
      [e.target.name]: e.target.value,
    });
  };

  const handleChange_register = (e: ChangeEvent<HTMLInputElement>) => {
    setformData_register({
      ...formData_register,
      [e.target.name]: e.target.value,
    });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closeCredentialsModal = () => {
    setShowCredentialsModal(false);
  };

  const handleShowCredentials = () => {
    setShowCredentialsModal(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  return (
    <>
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1 className="login-logo">
              <span className="logo-icon">⚡</span>
              <span className="logo-text">EatRush</span>
            </h1>
            <p className="login-subtitle">
              {isLogin ? "Bienvenido de vuelta" : "Crea tu cuenta"}
            </p>
          </div>

          <form
            onSubmit={isLogin ? handleSubmit_login : handleSubmit_register}
            className="login-form"
          >
            {!isLogin && (
              <>
                <div className="form-group">
                  <label>Nombre</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData_register.firstName}
                    onChange={handleChange_register}
                    placeholder="Tu nombre"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Apellido</label>
                  <input
                    type="text"
                    name="surName"
                    value={formData_register.surName}
                    onChange={handleChange_register}
                    placeholder="Tu apellido"
                    required
                  />
                </div>
              </>
            )}

            <div className="form-group">
              <label>Correo electrónico</label>
              <input
                type="email"
                name="email"
                value={isLogin ? formData_login.email : formData_register.email}
                onChange={isLogin ? handleChange_login : handleChange_register}
                placeholder="correo@ejemplo.com"
                required
              />
            </div>

            <div className="form-group">
              <label>Contraseña</label>
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={
                    isLogin
                      ? formData_login.password
                      : formData_register.password
                  }
                  onChange={
                    isLogin ? handleChange_login : handleChange_register
                  }
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "👁️‍🗨️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="form-options">
                <label className="checkbox">
                  <input type="checkbox" />
                  <span>Recordarme</span>
                </label>
                <a href="#" className="forgot-link">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            )}

            <button type="submit" className="submit-btn">
              {isLogin ? "Iniciar Sesión" : "Registrarse"}
            </button>
          </form>

          {isLogin && (
            <div className="credentials-hint">
              <button
                className="credentials-btn"
                onClick={handleShowCredentials}
              >
                📋 Mostrar credenciales de prueba
              </button>
              <p className="credentials-note">
                Usa estas credenciales para probar la aplicación
              </p>
            </div>
          )}

          <div className="divider">
            <span>o continúa con</span>
          </div>

          <div className="social-buttons">
            <button className="social-btn google">
              <span className="social-icon">G</span>
              Google
            </button>
            <button className="social-btn facebook">
              <span className="social-icon">f</span>
              Facebook
            </button>
          </div>

          <div className="switch-form">
            <p>
              {isLogin ? "¿No tienes una cuenta? " : "¿Ya tienes una cuenta? "}
              <button
                className="switch-link"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "  Regístrate" : " Inicia sesión"}
              </button>
            </p>
          </div>

          {!isLogin && (
            <p className="terms">
              Al registrarte, aceptas nuestros <a href="#">Términos</a> y{" "}
              <a href="#">Privacidad</a>
            </p>
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{modalMessage.includes("¡") ? "Éxito" : "Error"}</h3>
              <button className="modal-close" onClick={closeModal}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <p>{modalMessage}</p>
            </div>
            <div className="modal-footer">
              <button className="modal-btn" onClick={closeModal}>
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}

      {showCredentialsModal && (
        <div className="modal-overlay" onClick={closeCredentialsModal}>
          <div
            className="modal-content credentials-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>🔐 Credenciales de Prueba</h3>
              <button className="modal-close" onClick={closeCredentialsModal}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <p className="credentials-instruction">
                Usa cualquiera de estas credenciales para iniciar sesión:
              </p>

              <div className="credentials-list">
                {testCredentials.map((cred, index) => (
                  <div key={index} className="credential-item">
                    <div className="credential-row">
                      <span className="credential-label">Email:</span>
                      <span className="credential-value">{cred.email}</span>
                    </div>
                    <div className="credential-row">
                      <span className="credential-label">Contraseña:</span>
                      <span className="credential-value">{cred.password}</span>
                    </div>
                    <div className="credential-actions">
                      <button
                        className="use-credential-btn"
                        onClick={() => {
                          setformData_login({
                            email: cred.email,
                            password: cred.password,
                          });
                          closeCredentialsModal();
                        }}
                      >
                        Usar estas credenciales
                      </button>
                    </div>
                    {index < testCredentials.length - 1 && (
                      <hr className="credential-divider" />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="modal-btn secondary"
                onClick={closeCredentialsModal}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
