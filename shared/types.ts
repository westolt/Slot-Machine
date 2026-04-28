export type GameSymbol = 'S' | 'C' | 'Q';

export interface Spin {
    outcome: ResultSymbol[];
    win: boolean;
}

export type ResultSymbol = Exclude<GameSymbol, '?'>;