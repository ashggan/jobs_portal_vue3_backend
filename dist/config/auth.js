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
const client_1 = require("@prisma/client");
const passport_local_1 = require("passport-local");
const jwt_1 = require("./jwt");
const passport_1 = __importDefault(require("passport"));
require("dotenv").config();
// Initialize a prisma client
const prisma = new client_1.PrismaClient();
// Set strategy options
const options = {
    usernameField: "email",
    passwordField: "password",
};
//  create local Strategy sign in
passport_1.default.use("signin", new passport_local_1.Strategy(options, function (email, password, done) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield prisma.user.findUnique({ where: { email } });
            if (!user) {
                return done(null, false, { message: "Incorrect email or password." });
            }
            const isMatch = yield (0, jwt_1.compare)(user.password, password);
            if (!isMatch)
                return done(null, false, { message: "Incorrect email or password." });
            return done(user, null);
        }
        catch (error) {
            return done(error);
        }
    });
}));
passport_1.default.use("signup", new passport_local_1.Strategy(options, function (email, password, done) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield prisma.user.findUnique({ where: { email } });
            if (user) {
                return done(user, false, { message: " email already exist!" });
            }
            const hashed = yield (0, jwt_1.hash)(password);
            const data = {
                name: "",
                email,
                password: hashed,
            };
            const newUser = yield prisma.user.create({ data });
            return done(newUser, null);
        }
        catch (error) {
            return done(error);
        }
    });
}));
exports.default = passport_1.default;
