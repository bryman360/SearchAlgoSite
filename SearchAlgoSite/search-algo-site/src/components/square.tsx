import { MouseEventHandler } from "react";
import "../lib/styles.css";

export default function Square ({widthPercentage, heightPercentage, onSquareMouseDown, onSquareMouseUp, onSquareHover, state} : {widthPercentage: number, heightPercentage: number, onSquareMouseDown: MouseEventHandler, onSquareMouseUp: MouseEventHandler, onSquareHover: MouseEventHandler, state: string | null}) {
        
    return (
        <button className={"grid-cell " + (state ? state : "")} 
                onMouseDown={onSquareMouseDown}
                onMouseUp={onSquareMouseUp}
                onMouseOver={onSquareHover}
                onContextMenu={(e)=>e.preventDefault()}>
        </button>
    )
}