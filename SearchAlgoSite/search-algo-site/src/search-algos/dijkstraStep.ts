import { moves } from "@/lib/common";
import { GridCell } from "../../types";
import * as minheap from "@/lib/heap";

export function dijkstraStep(gridState: Array<Array<GridCell>>, heap: Array<Array<number>>, goalLoc: Array<number>) {
    var heapTop = minheap.heappop(heap);
    if (heapTop == null) return;
    else if (heapTop.length == 2) {
        const startDistance = Math.abs((heapTop[0] - goalLoc[0])) + Math.abs(heapTop[1] - goalLoc[1])
        heapTop = [startDistance, ...heapTop];
    }
    
    const currentSquare = [heapTop[1], heapTop[2]];
    if (gridState[currentSquare[0]][currentSquare[1]].state == 'explored' || gridState[currentSquare[0]][currentSquare[1]].state == 'mudExplored') return false;

    else if (gridState[currentSquare[0]][currentSquare[1]].state == 'goal') return true;

    if (!currentSquare) throw Error('Trying to move through a Dijkstra\'s with no heap.');
    
    for(const move of moves) {
        const nextMove = [currentSquare[0] + move[0], currentSquare[1] + move[1]];
        if (nextMove[0] >= 0 &&
            nextMove[0] < gridState.length &&
            nextMove[1] >= 0 &&
            nextMove[1] < gridState[0].length &&
            (gridState[nextMove[0]][nextMove[1]].state != 'wall' && gridState[nextMove[0]][nextMove[1]].state != 'start' && gridState[nextMove[0]][nextMove[1]].state != 'explored' && gridState[nextMove[0]][nextMove[1]].state != 'mudExplored')) {
                var spaceCost = 1;
                if (gridState[nextMove[0]][nextMove[1]].state == 'mud') gridState[nextMove[0]][nextMove[1]].state = 'mudFrontier';
                else if (gridState[nextMove[0]][nextMove[1]].state == null) gridState[nextMove[0]][nextMove[1]].state = 'frontier';
                
                if (gridState[currentSquare[0]][currentSquare[1]].state == 'mudFrontier') spaceCost = 2;

                const parentCost = heapTop[0];
                if (gridState[nextMove[0]][nextMove[1]].explorationCost > parentCost + spaceCost) {
                    gridState[nextMove[0]][nextMove[1]].explorationCost = parentCost + spaceCost;
                    gridState[nextMove[0]][nextMove[1]].parentRow = currentSquare[0];
                    gridState[nextMove[0]][nextMove[1]].parentCol = currentSquare[1];
                }
                minheap.heappush(heap, gridState[nextMove[0]][nextMove[1]].explorationCost, nextMove[0], nextMove[1]);
            }
    }

    if (gridState[currentSquare[0]][currentSquare[1]].state == 'mudFrontier') gridState[currentSquare[0]][currentSquare[1]].state = 'mudExplored';
    else if (gridState[currentSquare[0]][currentSquare[1]].state != 'start') gridState[currentSquare[0]][currentSquare[1]].state = 'explored';

    return false;

}