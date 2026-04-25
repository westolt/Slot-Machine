import express from 'express';
import { spinGame } from '../game/logic';
const router = express.Router();

router.post('/', (_req, res) => {
    const { spin, win } = spinGame();

    res.json({
        outcome: spin,
        win: win
    });
});

export default router;