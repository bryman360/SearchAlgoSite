import { MouseEventHandler } from "react";
import "../lib/styles.css";

export default function Square ({widthPercentage, heightPercentage, onSquareMouseDown, onSquareMouseUp, onSquareHover, state, symbol, displaySymbol} : {widthPercentage: number, heightPercentage: number, onSquareMouseDown: MouseEventHandler, onSquareMouseUp: MouseEventHandler, onSquareHover: MouseEventHandler, state: string | null, symbol: string, displaySymbol: boolean}) {
    
    return (
        <button className={"grid-cell " + (state ? state : "")} 
                onMouseDown={onSquareMouseDown}
                onMouseUp={onSquareMouseUp}
                onMouseOver={onSquareHover}
                onContextMenu={(e)=>e.preventDefault()}>
                    <Arrow symbol={displaySymbol ? symbol : ""}/>
        </button>
    )
}

function Arrow({symbol}: {symbol: string}) {
    if (symbol == "left") {
        return (<div className="text-black">&larr;</div>)
    }
    else if (symbol == "right") {
        return (<div className="text-black">&rarr;</div>)
    }
    else if (symbol == "up") {
        return (<div className="text-black">&uarr;</div>)
    }
    else if (symbol == "down") {
        return (<div className="text-black">&darr;</div>)
    }
    
    else return (<>{symbol}</>)
}