import { MouseEventHandler } from "react";
import "../lib/styles.css";

export default function Square ({widthPercentage, heightPercentage, onSquareMouseDown, onSquareMouseUp, onSquareHover, state, symbol, displaySymbol} : {widthPercentage: number, heightPercentage: number, onSquareMouseDown: MouseEventHandler, onSquareMouseUp: MouseEventHandler, onSquareHover: MouseEventHandler, state: string | null, symbol: string, displaySymbol: boolean}) {
    if (symbol == 'up') symbol = '&uarr;';
    else if (symbol == 'left') symbol = '&larr;';
    else if (symbol == "down") symbol = '&darr;';
    else if (symbol == 'right') symbol = '&rarr;';
    
    return (
        <button className={"grid-cell " + (state ? state : "")} 
                onMouseDown={onSquareMouseDown}
                onMouseUp={onSquareMouseUp}
                onMouseOver={onSquareHover}
                onContextMenu={(e)=>e.preventDefault()}>
                    {displaySymbol ? symbol : ""}
        </button>
    )
}