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
exports.profile = exports.signin = exports.signup = void 0;
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// METHOD FOR CREATING A NEW USER
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // saving a new user
    const user = new User_1.default({
        userName: req.body.userName,
        password: req.body.password
    });
    user.password = yield user.encryptPassword(user.password);
    const savedUser = yield user.save();
    // token
    const token = jsonwebtoken_1.default.sign({ _id: savedUser._id }, process.env.SECRET_KEY || 'tokentest', {
        expiresIn: 60 * 60 * 3
    });
    res.header('auth-token', token).json(savedUser);
});
exports.signup = signup;
// METHOD FOR LOGIN A USER
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({ userName: req.body.userName });
    if (!user) {
        return res.status(400).json('Name or password are wrong.');
    }
    const correctPassword = yield user.validatePassword(req.body.password);
    if (!correctPassword) {
        return res.status(400).json('Invalid Password');
    }
    const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.SECRET_KEY || 'tokentest', {
        expiresIn: 60 * 60 * 3
    });
    res.header('auth-token', token).json(user);
});
exports.signin = signin;
// METHOD FOR SEE A USER PROFILE
const profile = (req, res) => {
    res.send('profile');
};
exports.profile = profile;
//# sourceMappingURL=auth.controller.js.map