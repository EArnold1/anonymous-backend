"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const user_1 = require("../../controllers/user");
const router = (0, express_1.Router)();
//route POST /api/auth
//@desc login user
//access Public
router.post('/auth', [
    (0, express_validator_1.check)('username', 'Invalid username').not().isEmpty(),
    (0, express_validator_1.check)('password', 'Password too short').isLength({ min: 6 }),
], user_1.loginUser);
exports.default = router;
