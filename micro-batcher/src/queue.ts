/**
 * Queue class for handle job queues
 * 
 * @typeParam Job type of job to queue
 */
export class Queue<Job> {
  private queue: Job[]

  constructor() {
    this.queue = []
  }

  /**
   * Enqueues a job
   * @param job job to enqueue
   */
  enqueue(job: Job) {
    this.queue.push(job)
  }

  /**
   * Dequeues jobs less than or equal to given batch size
   * @param batchSize job count to dequeue
   * @returns jobs
   */
  dequeue(batchSize: number): Job[] {
    return this.queue.splice(0, batchSize)
  }

  /**
   * 
   * @returns queue length
   */
  getLength() {
    return this.queue.length
  }
}
