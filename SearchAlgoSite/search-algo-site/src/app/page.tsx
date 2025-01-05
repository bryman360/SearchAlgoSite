'use client'
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
  const [algoChoice, setAlgoChoice] = useState(0);
  const [stepCount, setStepCount] = useState(0);
  const [pathCost, setPathCost] = useState(0);
  const [pathLength, setPathLength] = useState(0);
  const [maxMemory, setMaxMemory] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);
  const [displaySymbolsEnabled, setDisplaySymbols] = useState(false);
  const [previousStats, setPreviousStats] = useState(["None", 0, 0, 0, 0])

  
  function handleClickPlaying() {
    if (playing) storePreviousRun();
    setPlaying(!playing);
  }

  function handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      setPlaying(!playing);
    }
    else if (event.key === "i") {
      setDisplaySymbols(!displaySymbolsEnabled);
    }
  }

  function handleAlgoChange(algoChoiceIndex: number) {
    setAlgoChoice(algoChoiceIndex);
  }

  function stepCountIncrementer(countsToAdd=1, reset=false) {
    if (reset) setStepCount(0);
    else setStepCount(stepCount + countsToAdd);
  }
  
  function pathCostCounter(countsToAdd=1, reset=false) {
    if (reset) setPathCost(0);
    else setPathCost(pathCost + countsToAdd);
  }
    
  function pathLengthCounter(countsToAdd=1, reset=false) {
    if (reset) setPathLength(0);
    else setPathLength(pathLength + countsToAdd);
  }

  function findMaxMemory(currentMemorySize: number, reset=false) {
    if (reset) setMaxMemory(0);
    else setMaxMemory(maxMemory >= currentMemorySize ? maxMemory : currentMemorySize);
  }

  function storePreviousRun() {
    setPreviousStats([algoOptions[algoChoice].algorithmName, stepCount, maxMemory, pathCost, pathLength]);
  }

  return (
    <main className="h-lvh" onKeyUp={handleKeyPress} tabIndex={0} >
      <div className="relative h-1/6 bg-slate-600 flex flex-row">
        <div className="h-full w-60 flex-row absolute bottom-0 right-0 ">
          <div className="w-full">
            Search Algorithm:
          </div>
          <div className="w-full">
          <AlgoDropdown options={algoOptions} algoChoice={algoChoice} handleAlgoSelect={handleAlgoChange} playing={playing}/>
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
        <Grid rows={20} cols={40} playing={playing} algoStepFunction={algoOptions[algoChoice].algorithmStep} stepCounter={stepCountIncrementer} findMaxMemory={findMaxMemory} pathCostCounter={pathCostCounter} pathLengthCounter={pathLengthCounter} displaySymbols={displaySymbolsEnabled}/>
      </div>
      <div className="h-1/6 bg-slate-900 whitespace-pre-line flex flex-row">
        <div className="w-1/3">
          Controls:{'\n'}
          Left Click = Set Wall{'\n'}
          Right Click = Remove Wall{'\n'}
          Ctrl + Left Click = Set Start{'\n'}
          Ctrl + Right Click = Set Goal{'\n'}
          Enter = Start/Stop{'\n'}
          I = Info Mode
        </div>
        <div className="w-1/3">
          Current Run Stats: {'\n'}
          Algo Step Counter: {stepCount}{'\n'}
          Max Memory Allocation: {maxMemory}{'\n'}
          Path Cost: {pathCost}{'\n'}
          Path Length: {pathLength}
        </div>
        <div className="w-1/3">
          Previous Run Stats: {'\n'}
          Algorithm Chosen: {previousStats[0]}{'\n'}
          Algo Step Counter: {previousStats[1]}{'\n'}
          Max Memory Allocation: {previousStats[2]}{'\n'}
          Path Cost: {previousStats[3]}{'\n'}
          Path Length: {previousStats[4]}
        </div>
      </div>
    </main>
  );
}
