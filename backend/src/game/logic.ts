import { symbolWeights, symbols } from "../game/reels";
import { ResultSymbol } from "../../../shared/types";

const weights = Object.values(symbolWeights);

const getTotalWeight = () => {
    return weights.reduce((a, b) => a + b, 0);
};

const getRandom = (totalWeight: number) => {
    return Math.floor(Math.random() * totalWeight);
};

const getSymbol = (): ResultSymbol => {
    const target = getRandom(getTotalWeight());
    let compare = 0;
    for (let i = 0; i < symbols.length; i++) {
        const addCompare = weights[i];
        compare += addCompare;
        if (compare > target) {
        return symbols[i];
        }
    };
    return symbols[0];
};

const getSpin = (): ResultSymbol[] => {
    const spin: ResultSymbol[] = [
        getSymbol(),
        getSymbol(),
        getSymbol()
    ];

    return spin;
};

const checkWin = (spin: ResultSymbol[]): boolean => {
    return spin[0] === spin[1] && spin[1] === spin[2];
};

const spinGame = () => {
    const spin = getSpin();
    const win = checkWin(spin);

    return { spin, win };
};

export { spinGame };