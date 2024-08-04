import { BatchProcessor } from '@micro-batcher-ts/micro-batcher'

export interface StringJob {
  id: number
  str: string
}

export interface StringResult {
  jobId: number
  result: string
}

export class StringReverseProcessor extends BatchProcessor<StringJob, StringResult> {
  async process(job: StringJob): Promise<StringResult> {
    const { id, str } = job
    const result = str.split('').reverse().join('')

    return { jobId: id, result }
  }
}
