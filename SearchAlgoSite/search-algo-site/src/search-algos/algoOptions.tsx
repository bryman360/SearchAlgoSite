import { aStarStep } from "./aStarStep";
import { bfsStep } from "./bfsStep";
import { dfsStep } from "./dfsStep";
import { greedyBestStep } from "./greedyBestStep";




export const algoOptions = [
    {algorithmName: "Breadth First Search", algorithmStep: bfsStep, dataStructureType: "array", videoEmbedFunc: bfsVideoEmbed},
    {algorithmName: "Depth First Search", algorithmStep: dfsStep, dataStructureType: "array", videoEmbedFunc: dfsVideoEmbed},
    {algorithmName: "A*", algorithmStep: aStarStep, dataStructureType: "minHeap", videoEmbedFunc: aStarVideoEmbed},
    {algorithmName: "Greedy Best First", algorithmStep: greedyBestStep, dataStructureType: "array", videoEmbedFunc: greedyBestFirstVideoEmbed}
];

function bfsVideoEmbed() {
    return (
        <iframe width="464" height="261" src="https://www.youtube.com/embed/HZ5YTanv5QE?si=WWUuaFwkovUy1u6Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    )
}

function dfsVideoEmbed() {
    return (
        <iframe width="464" height="261" src="https://www.youtube.com/embed/Urx87-NMm6c?si=n5ixdgcG4zovoQn5" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    )
}

function aStarVideoEmbed() {
    return (
        <iframe width="464" height="261" src="https://www.youtube.com/embed/ySN5Wnu88nE?si=--UbM3XiJKreK9mc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    )
}

function greedyBestFirstVideoEmbed() {
    return (
        <iframe width="464" height="261" src="https://www.youtube.com/embed/dv1m3L6QXWs?si=2aDWfn--5mhq6vip" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    )
}