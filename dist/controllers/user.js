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
exports.loginUser = exports.registerUser = void 0;
const express_validator_1 = require("express-validator");
const userSchema_1 = __importDefault(require("../models/userSchema"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { username, email, password } = req.body;
    try {
        if (username.length < 4)
            return res
                .status(401)
                .json({ errors: [{ msg: 'Username is too short' }] });
        // username & email check
        let user_name = yield userSchema_1.default.findOne({ username });
        if (user_name)
            return res
                .status(401)
                .json({ errors: [{ msg: 'Username already exists' }] });
        let user_email = yield userSchema_1.default.findOne({ email });
        if (user_email)
            return res
                .status(401)
                .json({ errors: [{ msg: 'Email already exists' }] });
        let user = {
            username,
            email,
            password,
        };
        // password encryption
        const salt = yield bcryptjs_1.default.genSalt(10);
        user.password = yield bcryptjs_1.default.hash(password, salt);
        // initializing user
        const newUser = new userSchema_1.default(user);
        yield newUser.save();
        // preparing jwt payload
        const payload = {
            user: {
                id: newUser.id,
            },
        };
        // signing jwt token
        jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1d',
        }, (err, token) => __awaiter(void 0, void 0, void 0, function* () {
            if (err)
                throw err;
            res.status(200).json({ token });
        }));
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ errors: [{ msg: 'Server Error' }] });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { username, password } = req.body;
    try {
        // user check
        let user = yield userSchema_1.default.findOne({ username });
        if (!user)
            return res.status(404).json({ errors: [{ msg: 'Invalid credentials' }] });
        // password match
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch)
            return res.status(404).json({ errors: [{ msg: 'Invalid credentials' }] });
        // preparing jwt payload
        const payload = {
            user: {
                id: user.id,
            },
        };
        // signing jwt token
        jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1d',
        }, (err, token) => __awaiter(void 0, void 0, void 0, function* () {
            if (err)
                throw err;
            res.status(200).json({ token });
        }));
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ errors: [{ msg: 'Server Error' }] });
    }
});
exports.loginUser = loginUser;
