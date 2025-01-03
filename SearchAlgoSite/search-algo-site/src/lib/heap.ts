export function heappeak(heap: Array<Array<number>>) {
    if (heap.length > 0) return heap[0];
    else return null;
}

export function heappush(heap: Array<Array<number>>, value: number, row: number, col: number) {
    const newElement = [value, row, col]
    heap.push(newElement);
    shiftUp(heap);
}

export function heappop(heap: Array<Array<number>>) {
    if (heap.length == 0) return null;
    else if (heap.length == 1) return heap.pop();
    else {
        const last_index = heap.length - 1;
        [heap[0], heap[last_index]] = [heap[last_index], heap[0]];
        var smallest_value = heap.pop();
        shiftDown(heap);
        return smallest_value;
    }
}

function shiftDown(heap: Array<Array<number>>) {
    if (heap.length <= 1) return;
    else if (heap.length == 2) {
        if (heap[0] > heap[1]) [heap[0], heap[1]] = [heap[1], heap[0]];
        return;
    }

    var parent_i = 0;
    var left_child_i = 1;
    var right_child_i = 2;
    while (left_child_i < heap.length) {
        if (right_child_i >= heap.length) {
            if (heap[parent_i][0] > heap[left_child_i][0]) [heap[parent_i], heap[left_child_i]] = [heap[left_child_i], heap[parent_i]];
            break;
        }
        else if (heap[parent_i][0] <= heap[left_child_i][0] && heap[parent_i][0] <= heap[right_child_i][0]) break;
        else if (heap[left_child_i][0] <= heap[right_child_i][0]) {
            [heap[parent_i], heap[left_child_i]] = [heap[left_child_i], heap[parent_i]];
            parent_i = left_child_i;
        }
        else {
            [heap[parent_i], heap[right_child_i]] = [heap[right_child_i], heap[parent_i]];
            parent_i = right_child_i;
        }
        left_child_i = (parent_i * 2) + 1;
        right_child_i = left_child_i + 1;
    }
    
}

function shiftUp(heap: Array<Array<number>>) {
    if (heap.length <= 1) return;
    // else if (this.heap.length <= 3) {
    //     if (this.heap[this.heap.length - 1][0] < this.heap[0][0]) [this.heap[0], this.heap[this.heap.length - 1]] = [this.heap[this.heap.length - 1], this.heap[0]];
    //     return;
    // }
    var child_i = heap.length - 1;
    var parent_i = Math.floor((child_i - 1) / 2);

    console.log("SHIFTING UP");
    while (child_i > 0) {
        if (heap[child_i][0] > heap[parent_i][0]) {
            printHeap(heap);
            return;
        }
        [heap[parent_i], heap[child_i]] = [heap[child_i], heap[parent_i]];
        child_i = parent_i;
        parent_i = Math.floor((child_i - 1) / 2);

    }
    printHeap(heap);

}

function printHeap(heap: Array<Array<number>>) {
    for (let i=0; i < heap.length; i+=1) {
        console.log(i + 1, heap[i])
    }
}