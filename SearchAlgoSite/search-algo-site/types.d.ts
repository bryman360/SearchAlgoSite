export type GridCell = {
    row: number;
    col: number;
    parentRow: number | null;
    parentCol: number | null;
    state: string | null;
    explorationCost: number;
    charSymbol: string;
}