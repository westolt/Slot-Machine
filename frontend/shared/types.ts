export type GameSymbol = 'S' | 'C' | 'Q';

export interface Spin {
    outcome: GameSymbol[];
    win: boolean;
}