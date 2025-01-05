import { moves } from "@/lib/common";
import { GridCell } from "../../types";

export function revealPathStep(gridState: Array<Array<GridCell>>, lastPathStep: Array<number | null>) {
    if (lastPathStep[0] == null || lastPathStep[1] == null) return [null, null];
    var arrowString = "";
    const parentRow = gridState[lastPathStep[0]][lastPathStep[1]].parentRow;
    const parentCol = gridState[lastPathStep[0]][lastPathStep[1]].parentCol;
    if (parentRow == null || parentCol == null) return [null, null];
    if (parentRow  < lastPathStep[0]) arrowString = "down";
    else if (parentRow > lastPathStep[0]) arrowString = "up";
    else if (parentCol < lastPathStep[1]) arrowString = "right";
    else if (parentCol > lastPathStep[1]) arrowString = "left";

    return [[parentRow, parentCol], arrowString]

}