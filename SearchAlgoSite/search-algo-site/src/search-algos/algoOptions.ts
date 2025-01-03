import { minHeap } from "@/lib/heap";
import { aStarStep } from "./aStarStep";
import { bfsStep } from "./bfsStep";
import { dfsStep } from "./dfsStep";


export const algoOptions = [
    {algorithmName: "Breadth First Search", algorithmStep: bfsStep, dataStructureType: "array"},
    {algorithmName: "Depth First Search", algorithmStep: dfsStep, dataStructureType: "array"},
    {algorithmName: "A*", algorithmStep: aStarStep, dataStructureType: "minHeap"}
];