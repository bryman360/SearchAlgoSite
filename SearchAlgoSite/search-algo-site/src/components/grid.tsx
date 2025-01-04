'use client';
import { useEffect, useState } from "react";
import "../lib/styles.css";
import Square from "./square";
import { GridCell } from "../../types";
import { revealPathStep } from "@/search-algos/revealPathStep";

const dataStructure = new Array<Array<number>>();
var startLoc = [10, 10];
var goalLoc = [10, 20];
dataStructure.push(startLoc);
var needGridStateReset = true;
var goalFound: boolean | undefined = false;
var pathCompletelyShown = false;
var lastPathStep = new Array<number>();

export default function Grid ({rows, cols, playing, algoStepFunction, stepCounter, findMaxMemory, pathCounter}: {rows: number, cols: number, playing: boolean, algoStepFunction: Function, stepCounter: Function, findMaxMemory: Function, pathCounter: Function}) {
    const [time, setTime] = useState(Date.now());
    const initialGrid = new Array<Array<GridCell>>();
    completeGridReset(initialGrid, rows, cols);
    
    const [gridState, setGridState] = useState(initialGrid);
    const [leftMouseDownState, setLeftMouseDownState] = useState(false);
    const [rightMouseDownState, setRightMouseDownState] = useState(false);
    const [altKeyDownState, setAltKeyDownState] = useState(false);

    useEffect(()=> {
        if (!playing) {
            dataStructure.length = 0;
            dataStructure.push(startLoc);
            if (needGridStateReset){
                stepCounter(true);
                pathCounter(true);
                findMaxMemory(0, true);
                var gridStateCopy = gridState.slice();
                resetGridBeforePlay(gridStateCopy, rows, cols);
                setGridState(gridStateCopy);
                needGridStateReset = false;
            }
            goalFound = false;
            pathCompletelyShown = false;
            return;
        }
        var gridStateCopy = gridState.slice();
        
        if (!goalFound) {
            if (dataStructure.length == 0) return;
            goalFound = algoStepFunction(gridStateCopy, dataStructure, goalLoc);
            stepCounter();
            findMaxMemory(dataStructure.length);
            if (goalFound) lastPathStep = [goalLoc[0], goalLoc[1]];
            const interval = setInterval(() => setTime(Date.now()), 50);
            if (!needGridStateReset) needGridStateReset = true;
            return () => {
                clearInterval(interval);
            }
        }
        else if (!pathCompletelyShown) {
            //@ts-ignore: Should only perform if goal found, so everything in path should always have a last path step
            lastPathStep = revealPathStep(gridStateCopy, lastPathStep);
            pathCounter();
            if (lastPathStep[0] == startLoc[0] && lastPathStep[1] == startLoc[1]){
                pathCompletelyShown = true;
            }
            else {
                if (gridStateCopy[lastPathStep[0]][lastPathStep[1]].state == 'mudExplored') {
                    gridStateCopy[lastPathStep[0]][lastPathStep[1]].state = "mudPathStep";
                }
                else {
                    gridStateCopy[lastPathStep[0]][lastPathStep[1]].state = "pathStep";
                }
                const interval = setInterval(() => setTime(Date.now()), 25);
                return () => {
                    clearInterval(interval);
                }
            }
        }
      })
    const cellWidthPercentage = Math.round((100 / cols) * 10) / 10;
    const cellHeightPercentage = Math.round((100 / rows) * 10) / 10;

    function changeSquareState(row: number, col: number, newState: string | null) {
        var gridStateCopy = gridState.slice();
        if (newState == 'start') {
            gridStateCopy[startLoc[0]][startLoc[1]].state = null;
            if (goalLoc[0] == row && goalLoc[1] == col) {
                goalLoc = startLoc;
                gridStateCopy[goalLoc[0]][goalLoc[1]].state = 'goal';
            }
            startLoc = [row, col];
        }
        else if (newState == 'goal') {
            gridStateCopy[goalLoc[0]][goalLoc[1]].state = null;
            if (startLoc[0] == row && startLoc[1] == col) {
                startLoc = goalLoc;
                gridStateCopy[startLoc[0]][startLoc[1]].state = 'start';
            }
            goalLoc = [row, col];
        }
        const currentTileState = gridStateCopy[row][col].state;
        if ((currentTileState == 'start' && newState != 'goal')  || (currentTileState == 'goal' && newState != 'start')) return;
        gridStateCopy[row][col].state = newState;
        setGridState(gridStateCopy);
    }

    function handleSquareMouseDown(event: MouseEvent, row: number, col: number) {
        if (playing || leftMouseDownState || rightMouseDownState) return;
        if (event.ctrlKey) {
            changeSquareState(row, col, 'start');
        }
        else if (event.shiftKey) {
            changeSquareState(row, col, 'goal');
        }
        else if (event.altKey) {
            setLeftMouseDownState(true);
            setAltKeyDownState(true);
            changeSquareState(row, col, 'mud');
        }
        else if (event.button === 0) {
            setLeftMouseDownState(true);
            changeSquareState(row, col, 'wall');
        }
        else if (event.button === 2) {
            setRightMouseDownState(true);
            changeSquareState(row, col, null);
        }
    }

    function handleSquareMouseUp(event: MouseEvent) {
        if (playing) return;
        if (event.button === 0) {
            setLeftMouseDownState(false);
        }
        else if (event.button === 2) {
            setRightMouseDownState(false);
        }
        setAltKeyDownState(false);
    }


    function handleSquareHover(row: number, col: number) {
        if (playing || (!leftMouseDownState && !rightMouseDownState) || (leftMouseDownState && rightMouseDownState)) return;
        if (leftMouseDownState && !altKeyDownState) {
            changeSquareState(row, col, 'wall');
        }
        else if (leftMouseDownState && altKeyDownState) {
            changeSquareState(row, col, 'mud');
        }
        else {changeSquareState(row, col, null);}
    }

    return (
        <div className="grid">
            {gridState.map((gridRow: Array<GridCell>, row)=>{
                return (gridRow.map((gridCell: GridCell, col)=> {
                    //@ts-ignore: Generic MouseEvent has all we require. The larger MouseEvent has extras we don't care about.
                    return (<Square key={'square-' + row + '-' + col} widthPercentage={cellWidthPercentage} heightPercentage={cellHeightPercentage} onSquareMouseDown={(event)=>handleSquareMouseDown(event, row, col)} onSquareMouseUp={(event)=>handleSquareMouseUp(event)} onSquareHover={()=>handleSquareHover(row, col)} state={gridCell.state} />)
                }))
            })}
        </div>
    )
}


function completeGridReset (gridArray: Array<Array<GridCell>>, rows: number, cols: number) {
    var state = null;
    var explorationCost = 9999;
    for (let row = 0; row < rows; row++) {
        const gridRow = new Array<GridCell>()
        for (let col = 0; col < cols; col++) {
            if (row == startLoc[0] && col == startLoc[1]) {
                state = "start";
                explorationCost = 0;
            }
            else if (row == goalLoc[0] && col == goalLoc[1]) state = "goal";
            else state = null;
            gridRow.push({
                row: row,
                col: col,
                parentRow: null,
                parentCol: null,
                state: state,
                explorationCost: explorationCost
            });
        }
        gridArray.push(gridRow);
    }
}

function resetGridBeforePlay (gridArray: Array<Array<GridCell>>, rows: number, cols: number) {
    var state = null;
    for (let row = 0; row < rows; row++) {
        const gridRow = new Array<GridCell>()
        for (let col = 0; col < cols; col++) {
            switch (gridArray[row][col].state){
                case('explored'):
                case('frontier'):
                case('pathStep'):
                    state = null;
                    break;
                case('mudPathStep'):
                case('mudFrontier'):
                case('mudExplored'):
                    state = 'mud';
                    break;
                default:
                    state = gridArray[row][col].state;
            }
            gridRow.push({
                row: row,
                col: col,
                parentRow: null,
                parentCol: null,
                state: state,
                explorationCost: 9999
            });
        }
        gridArray[row] = gridRow;
    }
}
