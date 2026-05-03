import { GameSymbol } from '../../shared/types';

export const symbols: GameSymbol[] = ['S', 'C', 'Q'];

export const symbolWeights: Record<GameSymbol, number> = {
    'S': 10,
    'C': 20,
    'Q': 20
};
