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
const auth_1 = __importDefault(require("../config/auth"));
const prisma = new client_1.PrismaClient();
function errorHandler(err, req, res, next) {
    console.error("err", err);
    res.status(500).json({ message: "An error occurred during authentication." });
}
// function errorMsg
// user sign up route
// user sign in route
const signin = (name) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(auth_1.default);
    yield auth_1.default.authenticate(name, (err, user, info) => {
        if (err) {
            console.error(err);
            return next(err);
        }
        if (!user) {
            // If authentication fails, return error message
            return res.status(401).json({ message: info === null || info === void 0 ? void 0 : info.message });
        }
        // If authentication is successful, return user object
        res.json(req.user);
    })(req, res, next);
});
const users_routes = (app) => {
    app.post("/users/signup", signin("signup"));
    app.post("/users/signin", signin("signin"));
    app.get("/", (req, res) => {
        var _a;
        console.log(req.session);
        req.session.views = ((_a = req.session.views) !== null && _a !== void 0 ? _a : 0) + 1;
        res.send(`yuo visited this site ${req.session.views} times`);
    });
};
exports.default = users_routes;
