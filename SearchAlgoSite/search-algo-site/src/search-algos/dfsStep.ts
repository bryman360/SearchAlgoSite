import { moves } from "@/lib/common";
import { GridCell } from "../../types";

export function dfsStep(gridState: Array<Array<GridCell>>, stack: Array<Array<number>>, goalLoc: Array<number>) {
    const currentSquare = stack.pop();
    
    if (currentSquare == null) return;

    if (gridState[currentSquare[0]][currentSquare[1]].state == 'goal') return true;

    if (!currentSquare) throw Error('Trying to move through a DFS with no stack.');
    
    for(const move of moves) {
        const nextMove = [currentSquare[0] + move[0], currentSquare[1] + move[1]];
        if (nextMove[0] >= 0 &&
            nextMove[0] < gridState.length &&
            nextMove[1] >= 0 &&
            nextMove[1] < gridState[0].length &&
            (gridState[nextMove[0]][nextMove[1]].state != 'wall' && gridState[nextMove[0]][nextMove[1]].state != 'start' && gridState[nextMove[0]][nextMove[1]].state != 'explored' && gridState[nextMove[0]][nextMove[1]].state != 'mudExplored')) {
                gridState[nextMove[0]][nextMove[1]].parentRow = currentSquare[0];
                gridState[nextMove[0]][nextMove[1]].parentCol = currentSquare[1];
                if (gridState[nextMove[0]][nextMove[1]].state == 'mud') gridState[nextMove[0]][nextMove[1]].state = 'mudFrontier';
                else if (gridState[nextMove[0]][nextMove[1]].state == null) gridState[nextMove[0]][nextMove[1]].state = 'frontier';
                else if (gridState[nextMove[0]][nextMove[1]].state == 'goal') return true;
                stack.push(nextMove);
            }
    }

    if (gridState[currentSquare[0]][currentSquare[1]].state == 'mudFrontier') gridState[currentSquare[0]][currentSquare[1]].state = 'mudExplored';
    else if (gridState[currentSquare[0]][currentSquare[1]].state != 'start') gridState[currentSquare[0]][currentSquare[1]].state = 'explored';

    return false;

}