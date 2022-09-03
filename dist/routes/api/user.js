"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const user_1 = require("../../controllers/user");
const router = (0, express_1.Router)();
//route POST /api/user
//@desc register user
//access Public
router.post('/user', [
    (0, express_validator_1.check)('username', 'Invalid username').not().isEmpty(),
    (0, express_validator_1.check)('password', 'Password too short').isLength({ min: 6 }),
    (0, express_validator_1.check)('email', 'Invalid email').isEmail(),
], user_1.registerUser);
//route GET /api/user/:username
//@desc find user
//access Public
router.get('/user/:username', user_1.findUser);
exports.default = router;
