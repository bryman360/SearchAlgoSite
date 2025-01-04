import { moves } from "@/lib/common";
import { GridCell } from "../../types";
import * as minheap from "@/lib/heap";

export function greedyBestStep(gridState: Array<Array<GridCell>>, heap: Array<Array<number>>, goalLoc: Array<number>) {
    const heappeak = minheap.heappeak(heap);
    if (heappeak == null) return;
    else if (heappeak.length == 2) {
        heap[0] = [10, ...heappeak];
    }
    const heapTop = minheap.heappop(heap);
    const currentSquare = [heapTop[1], heapTop[2]];
    if (gridState[currentSquare[0]][currentSquare[1]].state == 'explored') return false;

    if (gridState[currentSquare[0]][currentSquare[1]].state == 'goal') {
        console.log("GOAL FOUND!!!!");
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
            (gridState[nextMove[0]][nextMove[1]].state == null || gridState[nextMove[0]][nextMove[1]].state == 'goal' || gridState[nextMove[0]][nextMove[1]].state == 'frontier')) {
                if (gridState[nextMove[0]][nextMove[1]].state == null) gridState[nextMove[0]][nextMove[1]].state = 'frontier';
                const heuristicValue = Math.sqrt((nextMove[0] - goalLoc[0]) ** 2 + (nextMove[1] - goalLoc[1]) ** 2);
                gridState[nextMove[0]][nextMove[1]].parentRow = currentSquare[0];
                gridState[nextMove[0]][nextMove[1]].parentCol = currentSquare[1];
                // TODO: Instead of what's here and line 17, need to compare explorationCost and assign here if it is less than current value
                //       and if it isn't, don't need to add it to the heap
                minheap.heappush(heap, heuristicValue, nextMove[0], nextMove[1]);
            }
    }

    if (gridState[currentSquare[0]][currentSquare[1]].state != 'start') gridState[currentSquare[0]][currentSquare[1]].state = 'explored';

    return false;

}