'use client'
import Image from "next/image";
import "../lib/styles.css";
import Grid from "@/components/grid";
import PlayButton from "@/components/playButton"
import { KeyboardEvent, useState } from "react";
import ResetButton from "@/components/resetButton";
import AlgoDropdown from "@/components/algoDropdown";
import { algoOptions } from "@/search-algos/algoOptions";
import {VideoModal} from "@/components/videoModal";

var intervalCounter = 0;

export default function Home() {
  const [playing, setPlaying] = useState(false);
  const [algoChoice, setAlgoChoice] = useState(3);
  const [stepCount, setStepCount] = useState(0);
  const [pathCount, setPathCount] = useState(0);
  const [maxMemory, setMaxMemory] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);
  const [displaySymbolsEnabled, setDisplaySymbols] = useState(true);

  
  function handleClickPlaying() {
    setPlaying(!playing);
  }

  function handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      setPlaying(!playing);
    }
  }

  function handleAlgoChange(algoChoiceIndex: number) {
    setAlgoChoice(algoChoiceIndex);
  }

  function stepCounter(reset=false) {
    if (reset) setStepCount(0);
    else setStepCount(stepCount + 1);
  }
  
  function pathCounter(reset=false) {
    if (reset) setPathCount(0);
    else setPathCount(pathCount + 1);
  }

  function findMaxMemory(currentMemorySize: number, reset=false) {
    if (reset) setMaxMemory(0);
    else setMaxMemory(maxMemory >= currentMemorySize ? maxMemory : currentMemorySize);
  }

  return (
    <main className="h-lvh" onKeyUp={handleKeyPress} tabIndex={0} >
      <div className="relative h-1/6 bg-slate-600 flex flex-row">
        <div className="h-full w-60 flex-row absolute bottom-0 right-0 ">
          <div className="w-full">
            Search Algorithm:
          </div>
          <div className="w-full">
          <AlgoDropdown options={algoOptions} algoChoice={algoChoice} handleAlgoSelect={handleAlgoChange}/>
          </div>
          <div className="">
                <button className="text-white rounded-lg" onClick={() => setModalOpen(true)}>
                    Video Explanation
                </button>
                <VideoModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} algorithmName={algoOptions[algoChoice].algorithmName} algorithmVideoSrc={algoOptions[algoChoice].videoSrc} />

          </div>
        </div>
        <div className="h-5/6 w-32 flex items-center">
          <PlayButton onPlayButtonClick={handleClickPlaying} playing={playing} />
        </div>
      </div>
      <div className="h-2/3 bg-slate-400">
        <Grid rows={20} cols={40} playing={playing} algoStepFunction={algoOptions[algoChoice].algorithmStep} stepCounter={stepCounter} findMaxMemory={findMaxMemory} pathCounter={pathCounter} displaySymbols={displaySymbolsEnabled}/>
      </div>
      <div className="h-1/6 bg-slate-900 whitespace-pre-line flex flex-row">
        <div className="w-1/6">
          Controls:{'\n'}
          Left Click = Set Block{'\n'}
          Right Click = Remove Block{'\n'}
          Ctrl + Left Click = Set Start{'\n'}
          Shift + Left Click = Set Goal
        </div>
        <div>
          Stats: {'\n'}
          Step Counter: {stepCount}{'\n'}
          Max Memory Allocation: {maxMemory}{'\n'}
          Path Cost: {pathCount}
        </div>
      </div>
    </main>
  );
}
