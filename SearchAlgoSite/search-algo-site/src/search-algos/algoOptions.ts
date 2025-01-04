import { aStarStep } from "./aStarStep";
import { bfsStep } from "./bfsStep";
import { dfsStep } from "./dfsStep";
import { greedyBestStep } from "./greedyBestStep";




export const algoOptions = [
    {algorithmName: "Breadth First Search", algorithmStep: bfsStep, dataStructureType: "array", videoSrc: "https://www.youtube.com/embed/HZ5YTanv5QE?si=WWUuaFwkovUy1u6Y"},
    {algorithmName: "Depth First Search", algorithmStep: dfsStep, dataStructureType: "array", videoSrc: "https://www.youtube.com/embed/Urx87-NMm6c?si=n5ixdgcG4zovoQn5"},
    {algorithmName: "A*", algorithmStep: aStarStep, dataStructureType: "minHeap", videoSrc: "https://www.youtube.com/embed/ySN5Wnu88nE?si=--UbM3XiJKreK9mc"},
    {algorithmName: "Greedy Best First", algorithmStep: greedyBestStep, dataStructureType: "array", videoSrc: "https://www.youtube.com/embed/dv1m3L6QXWs?si=2aDWfn--5mhq6vip"}
];