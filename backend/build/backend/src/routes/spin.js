"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logic_1 = require("../game/logic");
const router = express_1.default.Router();
router.post('/', (_req, res) => {
    const { spin, win } = (0, logic_1.spinGame)();
    res.json({
        outcome: spin,
        win: win
    });
});
exports.default = router;
