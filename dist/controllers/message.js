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
exports.getLatestMessage = exports.getMessages = exports.addMessage = void 0;
const express_validator_1 = require("express-validator");
const messageSchema_1 = __importDefault(require("../models/messageSchema"));
const userSchema_1 = __importDefault(require("../models/userSchema"));
const sendNotification_1 = __importDefault(require("../notification/sendNotification"));
const addMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { text } = req.body;
    const username = req.params.username;
    try {
        // find username
        const user = yield userSchema_1.default.findOne({ username });
        if (!user)
            return res.status(404).json({ errors: [{ msg: 'User does not exist' }] });
        // save message
        const messageBody = {
            text,
            userId: user.id,
        };
        const message = new messageSchema_1.default(messageBody);
        yield message.save();
        (0, sendNotification_1.default)(username);
        res.status(200).json({ msg: 'Message sent succesfully', sent: true });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ errors: [{ msg: 'Server Error' }] });
    }
});
exports.addMessage = addMessage;
const getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const { page = 1, limit = 4 } = req.query;
    const startIndex = (+page - 1) * +limit;
    const endIndex = +page * +limit;
    let nextPage = {
        page: 0,
        limit: 0,
    };
    let prevPage = {
        page: 0,
        limit: 0,
    };
    try {
        // get messages
        const messages = yield messageSchema_1.default.find({ userId: id })
            .sort({ date: -1 })
            .skip(startIndex)
            .limit(+limit)
            .exec();
        if (!messages)
            return res.status(404).json({ errors: [{ msg: 'Nothing found' }] });
        // where to end
        if (startIndex > 0) {
            prevPage.page = +page - 1;
            prevPage.limit = +limit;
        }
        // where to stop
        if (endIndex < (yield messageSchema_1.default.find({ userId: id })).length) {
            nextPage.page = +page + 1;
            nextPage.limit = +limit;
        }
        res.status(200).json({ messages, nextPage, prevPage });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ errors: [{ msg: 'Server Error' }] });
    }
});
exports.getMessages = getMessages;
const getLatestMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    try {
        // find messages & sort by date (asc)
        let message = yield messageSchema_1.default.find({ userId: id });
        if (!message || message.length === 0)
            return res
                .status(404)
                .json({ errors: [{ msg: 'No message was found' }] });
        message = message[message.length - 1];
        // get first element in array
        res.status(200).json({ message });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ errors: [{ msg: 'Server Error' }] });
    }
});
exports.getLatestMessage = getLatestMessage;
