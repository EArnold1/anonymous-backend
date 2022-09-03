"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MessageSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user',
    },
    text: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
});
const MessageDB = (0, mongoose_1.model)('message', MessageSchema);
exports.default = MessageDB;
