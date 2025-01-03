import { moves } from "@/lib/common";
import { GridCell } from "../../types";

export function revealPathStep(gridState: Array<Array<GridCell>>, lastPathStep: Array<number | null>) {
    if (lastPathStep[0] == null || lastPathStep[1] == null) return [null, null];
    return [gridState[lastPathStep[0]][lastPathStep[1]].parentRow, gridState[lastPathStep[0]][lastPathStep[1]].parentCol]

}