import { EventEmitter } from 'events'
import { Queue } from './queue'
import { BatchExecutionResult, BatchProcessor, MicroBatcherOptions } from './types'

export const MAX_RETRY_ATTEMPTS = 3
export const BATCH_RUN_FREQUENCY = 100

export class MicroBatch<Job, JobResult> {
  private batchSize: number
  private processor: BatchProcessor<Job, JobResult>
  private frequency: number
  private maxRetryAttempts: number

  private jobQueue: Queue<Job>
  private jobResultEvent: EventEmitter
  private batchShutdownEvent: EventEmitter
  private interval!: NodeJS.Timeout

  constructor(processor: BatchProcessor<Job, JobResult>, options: MicroBatcherOptions) {
    const { batchSize, frequency, maxRetryAttempts } = options
    this.batchSize = batchSize
    this.frequency = frequency ?? BATCH_RUN_FREQUENCY
    this.maxRetryAttempts = maxRetryAttempts ?? MAX_RETRY_ATTEMPTS
    this.processor = processor

    this.jobQueue = new Queue()
    this.jobResultEvent = new EventEmitter()
    this.batchShutdownEvent = new EventEmitter()

    // start batch processing engine at initialization
    this.start()
  }

  public onResult(result: (r: JobResult) => void, error: (e: string) => void) {
    this.jobResultEvent.on('result', result)
    this.jobResultEvent.on('error', error)
  }

  public onShutdown(callback: () => void) {
    this.batchShutdownEvent.on('shutdown', callback)
  }

  public submit(job: Job) {
    this.jobQueue.enqueue(job)
  }

  public async shutdown() {
    console.log('Shutdown signal received')
    if (this.jobQueue.getLength() > 0) {
      const batchedJobs = this.generateBatch(this.jobQueue.getLength())
      console.log('Processing jobs', batchedJobs.length, ',', 'Remaining job count', this.jobQueue.getLength())
      await this.process(batchedJobs)
    }
    clearInterval(this.interval)
    this.batchShutdownEvent.emit('shutdown')
  }

  private generateBatch(batchSize: number) {
    return this.jobQueue.dequeue(batchSize)
  }

  private start() {
    this.interval = setInterval(async () => {
      const batchedJobs = this.generateBatch(this.batchSize)
      console.log('Processing jobs', batchedJobs.length, ',', 'Remaining job count', this.jobQueue.getLength())
      await this.process(batchedJobs)
    }, this.frequency)
  }

  private async process(jobs: Job[]) {
    console.log('Processing jobs', jobs)
    await Promise.all(
      jobs.map(async job => {
        const { result, error } = await this.processWithRetry(job)
        if (error) {
          this.jobResultEvent.emit('error', error)
          return
        }

        if (result) {
          this.jobResultEvent.emit('result', result)
        }
      })
    )
  }

  private async processWithRetry(job: Job): Promise<BatchExecutionResult<JobResult>> {
    let attempts = 0
    const errorMessages: string[] = []

    while (attempts < this.maxRetryAttempts) {
      try {
        const result = await this.processor.process(job)
        return { result, error: null }
      } catch (err) {
        const error = err as Error
        errorMessages.push(`Attempt #${attempts + 1}: ${error.message}`)
        attempts++
      }
    }
    return { result: null, error: `[${errorMessages.toString()}]` }
  }
}
