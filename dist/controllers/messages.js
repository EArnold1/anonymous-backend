"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMessage = void 0;
const express_validator_1 = require("express-validator");
const messageSchema_1 = __importDefault(require("../models/messageSchema"));
const userSchema_1 = __importDefault(require("../models/userSchema"));
const addMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { text, username } = req.body;
    try {
        const user = yield userSchema_1.default.findOne({ username });
        if (!user)
            return res.status(404).json({ errors: [{ msg: 'User does not exist' }] });
        const messageBody = {
            text,
            userId: user.id,
        };
        const message = new messageSchema_1.default(messageBody);
        yield message.save();
        res.status(200).json({ msg: 'Sent' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ errors: [{ msg: 'Server Error' }] });
    }
});
exports.addMessage = addMessage;
