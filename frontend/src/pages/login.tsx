import React, { useState } from 'react';
import '../styles/login.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isLogin ? 'Login' : 'Register', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Logo */}
        <div className="login-header">
          <h1 className="login-logo">
            <span className="logo-icon">⚡</span>
            <span className="logo-text">EatRush</span>
          </h1>
          <p className="login-subtitle">
            {isLogin ? 'Bienvenido de vuelta' : 'Crea tu cuenta'}
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="login-form">
          {!isLogin && (
            <div className="form-group">
              <label>Nombre completo</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Tu nombre"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>Correo electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <div className="password-input">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div className="form-group">
              <label>Confirmar contraseña</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </div>
          )}

          {isLogin && (
            <div className="form-options">
              <label className="checkbox">
                <input type="checkbox" />
                <span>Recordarme</span>
              </label>
              <a href="#" className="forgot-link">¿Olvidaste tu contraseña?</a>
            </div>
          )}

          <button type="submit" className="submit-btn">
            {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
          </button>
        </form>

        {/* Divisor */}
        <div className="divider">
          <span>o continúa con</span>
        </div>

        {/* Botones sociales */}
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

        {/* Cambiar entre login/register */}
        <div className="switch-form">
          <p>
            {isLogin ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}
            <button
              className="switch-link"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? ' Regístrate' : ' Inicia sesión'}
            </button>
          </p>
        </div>

        {/* Términos */}
        {!isLogin && (
          <p className="terms">
            Al registrarte, aceptas nuestros{' '}
            <a href="#">Términos</a> y <a href="#">Privacidad</a>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;