"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const message_1 = require("../../controllers/message");
const router = (0, express_1.Router)();
//route POST /api/message
//@desc send message
//access Public
router.get('/message/:username', [(0, express_validator_1.check)('text', 'Please add a message').not().isEmpty()], message_1.addMessage);
exports.default = router;
