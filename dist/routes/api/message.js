"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const message_1 = require("../../controllers/message");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = (0, express_1.Router)();
//route GET /api/message/:username
//@desc send message
//access Public
router.get('/message/:username', [(0, express_validator_1.check)('text', 'Please add a message').not().isEmpty()], message_1.addMessage);
//route GET /api/message
//@desc get messages
//access Private
router.get('/messages', auth_1.default, message_1.getMessages);
exports.default = router;
