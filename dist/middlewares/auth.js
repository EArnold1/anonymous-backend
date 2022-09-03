"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function default_1(req, res, next) {
    // Get token
    let token = null;
    if (req.headers['authorization'] &&
        req.headers['authorization'].split(' ')[0] === 'Bearer') {
        token = req.headers['authorization'].split(' ')[1];
    }
    if (token === null) {
        return res.status(401).json({ errors: [{ msg: 'Not authorized' }] });
    }
    try {
        // decode user
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    }
    catch (err) {
        return res.status(401).json({ errors: [{ msg: 'Invalid token' }] });
    }
}
exports.default = default_1;
