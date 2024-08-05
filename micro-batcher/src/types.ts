/**
 * Batch processor definition
 * @typeParam Job type of job to handle
 * @typeParam JobResult type of job result returned
 */
export abstract class BatchProcessor<Job, JobResult> {
  abstract process(job: Job): Promise<JobResult>
}

export interface MicroBatcherOptions {
  batchSize: number
  frequency?: number
  maxRetryAttempts?: number
}

export interface BatchExecutionResult<JobResult> {
  result: JobResult | null
  error: string | null
}
