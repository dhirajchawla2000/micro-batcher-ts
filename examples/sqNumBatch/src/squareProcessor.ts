import { BatchProcessor } from '@micro-batcher-ts/micro-batcher'

export interface SquareJob {
  id: number
  value: number
}

export interface SquereResult {
  jobId: number
  result: number
}

export class SquareProcessor extends BatchProcessor<SquareJob, SquereResult> {
  async process(job: SquareJob): Promise<SquereResult> {
    const { id, value } = job
    const result = value * value

    // simulate a retryable error
    if (id === 4) {
      throw new Error('error processing the batch')
    }

    return { jobId: id, result }
  }
}
