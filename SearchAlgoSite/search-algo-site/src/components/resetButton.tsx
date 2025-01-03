import { MouseEventHandler } from "react";
import "../lib/styles.css";

export default function ResetButton ({onResetButtonClick, playing} : {onResetButtonClick: MouseEventHandler, playing: boolean}) {
    return (
        <button className={"bg-yellow-600 rounded-md h-full w-10 float-right"} onClick={onResetButtonClick}>RESET</button>
    )
}