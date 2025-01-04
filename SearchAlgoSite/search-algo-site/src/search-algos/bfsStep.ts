import { moves } from "@/lib/common";
import { GridCell } from "../../types";

export function bfsStep(gridState: Array<Array<GridCell>>, queue: Array<Array<number>>, goalLoc: Array<number>) {
    const currentSquare = queue.shift();

    if (currentSquare == null) return;

    if (gridState[currentSquare[0]][currentSquare[1]].state == 'goal') {
        return true;
    }

    if (!currentSquare) {
        throw Error('Trying to move through a BFS with no queue.');
    }
    for(const move of moves) {
        const nextMove = [currentSquare[0] + move[0], currentSquare[1] + move[1]];
        if (nextMove[0] >= 0 &&
            nextMove[0] < gridState.length &&
            nextMove[1] >= 0 &&
            nextMove[1] < gridState[0].length &&
            gridState[nextMove[0]][nextMove[1]].parentCol == null &&
            (gridState[nextMove[0]][nextMove[1]].state == null || gridState[nextMove[0]][nextMove[1]].state == 'goal' || gridState[nextMove[0]][nextMove[1]].state == 'frontier')) {
                gridState[nextMove[0]][nextMove[1]].parentRow = currentSquare[0];
                gridState[nextMove[0]][nextMove[1]].parentCol = currentSquare[1];
                if (gridState[nextMove[0]][nextMove[1]].state == null) gridState[nextMove[0]][nextMove[1]].state = 'frontier';
                queue.push(nextMove);
            }
    }

    if (gridState[currentSquare[0]][currentSquare[1]].state != 'start') gridState[currentSquare[0]][currentSquare[1]].state = 'explored';

    return false;

}