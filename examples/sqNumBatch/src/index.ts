import { MicroBatch, MicroBatcherOptions } from '@micro-batcher-ts/micro-batcher'
import { SquareJob, SquareProcessor, SquereResult } from './squareProcessor'

const main = () => {
  const squareProcessor = new SquareProcessor()

  const options: MicroBatcherOptions = {
    batchSize: 5,
    frequency: 2000,
    maxRetryAttempts: 2
  }

  const mb = new MicroBatch<SquareJob, SquereResult>(squareProcessor, options)
  mb.onResult(
    (result: SquereResult) => {
      console.log(`Job completed ${JSON.stringify(result)}`)
    },
    (error: string) => {
      console.error(`Job error ${error}`)
    }
  )

  mb.onShutdown(() => {
    console.log('shutting down the batch process')
  })

  for (let i = 1; i <= 20; i++) {
    mb.submit({ id: i, value: i })
  }

  // emulating forceful shutdown of micro batcher
  setTimeout(async () => {
    console.log('interrupting the job after 6 sec')
    await mb.shutdown()
  }, 6000)
}

main()
