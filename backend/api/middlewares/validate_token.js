"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserToken = exports.validateAdminToken = void 0;
const jwt = require("jsonwebtoken");
const validateTokenBase = (requiredRole, errorMessage) => {
    return async (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                return res
                    .status(401)
                    .json({ error: "No token provided", success: false });
            }
            const parts = authHeader.split(" ");
            if (parts.length !== 2 || !/^Bearer$/i.test(parts[0])) {
                return res
                    .status(401)
                    .json({ error: "Token malformed", success: false });
            }
            const token = parts[1];
            if (!process.env.JWT_SECRET) {
                return res
                    .status(500)
                    .json({ error: "Server configuration error", success: false });
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            if (decoded.role !== requiredRole) {
                return res.status(403).json({ error: errorMessage, success: false });
            }
            next();
        }
        catch (error) {
            if (error.name === "TokenExpiredError") {
                return res.status(401).json({ error: "Expired token", success: false });
            }
            if (error.name === "JsonWebTokenError") {
                return res.status(401).json({ error: "Invalid token", success: false });
            }
            return res
                .status(500)
                .json({ error: "Internal Server Error", success: false });
        }
    };
};
exports.validateAdminToken = validateTokenBase("admin", "Access only for Admin");
exports.validateUserToken = validateTokenBase("user", "Access only for users");
