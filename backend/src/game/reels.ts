import { ResultSymbol } from '../../../shared/types';

export const symbols: ResultSymbol[] = ['S', 'C', 'Q'];

export const symbolWeights: Record<ResultSymbol, number> = {
    'S': 10,
    'C': 20,
    'Q': 20
};
