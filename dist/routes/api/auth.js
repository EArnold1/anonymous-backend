"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const user_1 = require("../../controllers/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = (0, express_1.Router)();
//route POST /api/auth
//@desc login user
//access Public
router.post('/auth', [
    (0, express_validator_1.check)('username', 'Invalid username').not().isEmpty(),
    (0, express_validator_1.check)('password', 'Password too short').isLength({ min: 6 }),
], user_1.loginUser);
//route GET /api/auth
//@desc get user
//access Private
router.get('/auth', auth_1.default, user_1.getUser);
exports.default = router;
