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
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../app");
const sendNotification = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const notification = {
        contents: {
            en: `Hello ${username}, you have a new message.`,
        },
        web_url: process.env.CLIENT_URL,
        include_external_user_ids: [username],
    };
    yield app_1.client.createNotification(notification);
});
exports.default = sendNotification;