"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spinGame = void 0;
const reels_1 = require("../game/reels");
const weights = Object.values(reels_1.symbolWeights);
const getTotalWeight = () => {
    return weights.reduce((a, b) => a + b, 0);
};
const getRandom = (totalWeight) => {
    return Math.floor(Math.random() * totalWeight);
};
const getSymbol = () => {
    const target = getRandom(getTotalWeight());
    let compare = 0;
    for (let i = 0; i < reels_1.symbols.length; i++) {
        const addCompare = weights[i];
        compare += addCompare;
        if (compare > target) {
            return reels_1.symbols[i];
        }
    }
    ;
    return reels_1.symbols[0];
};
const getSpin = () => {
    const spin = [
        getSymbol(),
        getSymbol(),
        getSymbol()
    ];
    return spin;
};
const checkWin = (spin) => {
    return spin[0] === spin[1] && spin[1] === spin[2];
};
const spinGame = () => {
    const spin = getSpin();
    const win = checkWin(spin);
    return { spin, win };
};
exports.spinGame = spinGame;
