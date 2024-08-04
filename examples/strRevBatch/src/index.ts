import { MicroBatch, MicroBatcherOptions } from '@micro-batcher-ts/micro-batcher'
import { StringJob, StringResult, StringReverseProcessor } from './stringReverseProcessor'

const main = () => {
  const stringProcessor = new StringReverseProcessor()
  const options: MicroBatcherOptions = {
    batchSize: 3,
    frequency: 1000,
    maxRetryAttempts: 2
  }

  const mb = new MicroBatch<StringJob, StringResult>(stringProcessor, options)

  const stringBatch = [
    'lorem',
    'ipsum',
    'distinctio',
    'sunt',
    'et',
    'qui',
    'mollitia',
    'iste',
    'dolorem',
    'iste',
    'deleniti',
    'autem'
  ]
  stringBatch.forEach((str, index) => mb.submit({ id: index + 1, str }))
  console.log('submitted string batch')

  mb.onResult(
    (result: StringResult) => {
      console.log(`Job completed ${JSON.stringify(result)}`)

      // shutdown when all jobs are processed
      if (stringBatch.length === result.jobId) {
        mb.shutdown()
      }
    },
    (error: string) => {
      console.error(`Job error ${error}`)
    }
  )

  mb.onShutdown(() => {
    console.log('shutting down the string reverse batch process')
  })
}

main()
