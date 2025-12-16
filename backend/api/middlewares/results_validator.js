"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vaidate_Results = void 0;
const { query, validationResult } = require("express-validator");
const vaidate_Results = async (req, res, next) => {
    try {
        const errors = await validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                success: false,
                errors: errors.array().map((error) => ({
                    field: error.param,
                    message: error.msg,
                    value: error.value,
                    location: error.location,
                })),
            });
            return;
        }
        else {
            next();
        }
    }
    catch (error) {
        console.error("Validation middleware error:", error);
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
};
exports.vaidate_Results = vaidate_Results;
