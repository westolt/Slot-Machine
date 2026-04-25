export type GameSymbol = '💎' | '🍒' | '🍋' | '?';

export interface Spin {
    outcome: ResultSymbol[];
    win: boolean;
}

export type ResultSymbol = Exclude<GameSymbol, '?'>;