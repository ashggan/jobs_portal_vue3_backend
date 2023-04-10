"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jobsRoutes_1 = __importDefault(require("./routes/jobsRoutes"));
const usersRoute_1 = __importDefault(require("./routes/usersRoute"));
const express_session_1 = __importDefault(require("express-session"));
const prisma_session_store_1 = require("@quixo3/prisma-session-store");
const client_1 = require("@prisma/client");
// import categories_routes from "./routes/categoryRoute";
const app = (0, express_1.default)();
app.use(express_1.default.json());
const prisma = new client_1.PrismaClient();
app.use((0, express_session_1.default)({
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    secret: "a santa at nasa",
    resave: true,
    saveUninitialized: true,
    store: new prisma_session_store_1.PrismaSessionStore(prisma, {
        checkPeriod: 10 * 60 * 1000, // 10 minutes
    }),
}));
// prisma migrate dev --name sessions
// routes
(0, jobsRoutes_1.default)(app);
(0, usersRoute_1.default)(app);
// categories_routes(app);
const PORT = 5000;
app.listen(PORT, () => console.log(`SERVER RUNNING on http://localhost:${PORT}`));
exports.default = app;
