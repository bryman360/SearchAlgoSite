import Image from "next/image";
import { MouseEventHandler } from "react";
import "../lib/styles.css";
import RandomizeIcon from './icons/random-symbol.svg'

export default function RandomizeButton ({onRandomizeButtonClick} : {onRandomizeButtonClick: MouseEventHandler}) {
    return (
        <button className={"bg-slate-500 rounded-md h-full w-full flex justify-center align-middle"} onClick={onRandomizeButtonClick}>
          <Image src={RandomizeIcon} alt={"Randomize Icon"} className="w-3/4 h-3/4 invert button-icon" />
        </button>
    )
}