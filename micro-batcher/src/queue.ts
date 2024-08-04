export class Queue<J> {
  private queue: J[]

  constructor() {
    this.queue = []
  }

  enqueue(job: J) {
    this.queue.push(job)
  }

  dequeue(batchSize: number): J[] {
    return this.queue.splice(0, batchSize)
  }

  get length() {
    return this.queue.length
  }
}
