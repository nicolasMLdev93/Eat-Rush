"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(401).json({
                error: "No se proporcionó token de autenticación",
                success: false,
            });
            return;
        }
        const parts = authHeader.split(" ");
        if (parts.length !== 2 || !/^Bearer$/i.test(parts[0])) {
            res.status(401).json({
                error: "Formato de token incorrecto. Debe ser: Bearer <token>",
                success: false,
            });
            return;
        }
        const token = parts[1];
        if (!process.env.JWT_SECRET) {
            console.error("ERROR: JWT_SECRET no configurado en las variables de entorno");
            res.status(500).json({
                error: "Error de configuración del servidor",
                success: false,
            });
            return;
        }
        const JWT_SECRET = process.env.JWT_SECRET || "secret";
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = decoded;
        if (process.env.NODE_ENV === "development") {
            console.log("Token validado correctamente para usuario:", decoded);
        }
        next();
    }
    catch (error) {
        console.error("Error al validar token:", error.message);
        if (error.name === "TokenExpiredError") {
            res.status(401).json({
                error: "Token expirado. Por favor, inicia sesión nuevamente",
                success: false,
            });
            return;
        }
        if (error.name === "JsonWebTokenError") {
            res.status(401).json({
                error: "Token inválido o malformado",
                success: false,
            });
            return;
        }
        console.error("Error inesperado en validateToken:", error);
        res.status(500).json({
            error: "Error interno del servidor al validar token",
            success: false,
        });
    }
};
exports.validateToken = validateToken;
