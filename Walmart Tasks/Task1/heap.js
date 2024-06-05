class PowerOfTwoMaxHeap {
    constructor(powerOfChildren) {
        this.heap = [];
        this.powerOfChildren = powerOfChildren;
        this.numChildren = Math.pow(2, powerOfChildren);
    }

    insert(value) {
        this.heap.push(value);
        this.heapifyUp(this.heap.length - 1);
    }

    popMax() {
        if (this.heap.length === 0) {
            throw new Error("Heap is empty");
        }
        const maxValue = this.heap[0];
        const lastValue = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = lastValue;
            this.heapifyDown(0);
        }
        return maxValue;
    }

    heapifyUp(index) {
        const value = this.heap[index];
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / this.numChildren);
            const parentValue = this.heap[parentIndex];
            if (value > parentValue) {
                this.heap[index] = parentValue;
                index = parentIndex;
            } else {
                break;
            }
        }
        this.heap[index] = value;
    }

    heapifyDown(index) {
        const value = this.heap[index];
        while (true) {
            let largestIndex = index;
            let largestValue = value;
            for (let i = 1; i <= this.numChildren; i++) {
                const childIndex = this.numChildren * index + i;
                if (childIndex < this.heap.length && this.heap[childIndex] > largestValue) {
                    largestValue = this.heap[childIndex];
                    largestIndex = childIndex;
                }
            }
            if (largestIndex !== index) {
                this.heap[index] = largestValue;
                index = largestIndex;
            } else {
                break;
            }
        }
        this.heap[index] = value;
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    size() {
        return this.heap.length;
    }
}

// Testing the PowerOfTwoMaxHeap with different values of powerOfChildren
const heap = new PowerOfTwoMaxHeap(1); // This will create a binary heap
heap.insert(10);
heap.insert(4);
heap.insert(15);
heap.insert(20);
heap.insert(0);

while (!heap.isEmpty()) {
    console.log(heap.popMax());
}
