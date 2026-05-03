"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const spin_1 = __importDefault(require("./routes/spin"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: [
        'http://localhost:5173',
        'http://localhost:4173',
        'https://slot-machine-pink-rho.vercel.app'
    ]
}));
const PORT = process.env.PORT || 3000;
app.get('/ping', (_req, res) => {
    res.send('pong');
});
app.use('/api/spin', spin_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
