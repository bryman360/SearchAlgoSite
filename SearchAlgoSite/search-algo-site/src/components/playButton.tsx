import { MouseEventHandler } from "react";
import "../lib/styles.css";
import { PlayIcon, StopIcon } from "@heroicons/react/20/solid";

export default function PlayButton ({onPlayButtonClick, playing} : {onPlayButtonClick: MouseEventHandler, playing: boolean}) {
    let buttonIcon = (<PlayIcon aria-hidden="true" />)
    let buttonBGColor = 'bg-green-600';
    if (playing) {
        buttonIcon = (<StopIcon aria-hidden="true" />)
        buttonBGColor = "bg-red-600";
    }
    else {
        buttonIcon = (<PlayIcon aria-hidden="true" />)
        buttonBGColor = 'bg-green-600';
    }
    return (
        <button className={buttonBGColor + " rounded-md h-full w-full"} onClick={onPlayButtonClick}>
          {buttonIcon}
        </button>
    )
}