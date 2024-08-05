import { Queue } from './queue'
import { MicroBatch } from './micro-batcher'
import { BatchProcessor } from './types'

jest.mock('./queue')

const flushPromises = () => {
  return new Promise(resolve => jest.requireActual('timers').setImmediate(resolve))
}

describe('MicroBatch', () => {
  const mockEnqueueFn = jest.fn()

  const mockQueue = Queue as jest.Mocked<typeof Queue>
  mockQueue.prototype.enqueue = mockEnqueueFn

  const getMockProcessor = (throwError: boolean = false) => {
    class MockProcessor extends BatchProcessor<string, string> {
      async process(job: string): Promise<string> {
        if (throwError) {
          throw new Error('error')
        }
        return job
      }
    }
    return new MockProcessor()
  }

  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.clearAllTimers()
    jest.clearAllMocks()
  })

  test('should create an object with methods', () => {
    const mockProcessor = getMockProcessor()
    const mockMB = new MicroBatch(mockProcessor, {
      batchSize: 2,
      frequency: 100
    })
    expect(typeof mockMB.submit).toBe('function')
    expect(typeof mockMB.shutdown).toBe('function')
    expect(typeof mockMB.onResult).toBe('function')
    expect(typeof mockMB.onShutdown).toBe('function')
  })

  test('should allow to submit a job', () => {
    const mockProcessor = getMockProcessor()
    const mockMB = new MicroBatch(mockProcessor, {
      batchSize: 2,
      frequency: 100
    })
    mockMB.submit('abc')
    expect(mockEnqueueFn).toHaveBeenCalled()
  })

  test('should shutdown batch process', () => {
    const mockShutdownCallback = jest.fn()
    const mockProcessor = getMockProcessor()
    const mockMB = new MicroBatch(mockProcessor, {
      batchSize: 2,
      frequency: 100
    })
    mockMB.onShutdown(mockShutdownCallback)
    mockMB.shutdown()
    expect(mockShutdownCallback).toHaveBeenCalledTimes(1)
  })

  test('should return job results', async () => {
    mockQueue.prototype.dequeue = jest.fn().mockReturnValue(['abc', 'def'])
    const mockResultCallback = jest.fn()
    const mockProcessor = getMockProcessor()
    const mockMB = new MicroBatch(mockProcessor, {
      batchSize: 2,
      frequency: 100
    })
    mockMB.onResult(mockResultCallback, jest.fn())
    jest.advanceTimersByTime(100)
    await flushPromises()
    expect(mockResultCallback).toHaveBeenCalledTimes(2)
  })

  test('should handle error jobs', async () => {
    mockQueue.prototype.dequeue = jest.fn().mockReturnValue(['abc'])
    const mockErrorCallback = jest.fn()
    const mockProcessor = getMockProcessor(true)
    const mockMB = new MicroBatch(mockProcessor, {
      batchSize: 2,
      frequency: 100,
      maxRetryAttempts: 1
    })
    mockMB.onResult(jest.fn(), mockErrorCallback)
    jest.advanceTimersByTime(100)
    await flushPromises()
    expect(mockErrorCallback).toHaveBeenCalledWith('[Attempt #1: error]')
  })

  test('should return job results before shutdown', async () => {
    mockQueue.prototype.dequeue = jest.fn().mockReturnValue(['abc', 'def'])
    mockQueue.prototype.getLength = jest.fn().mockReturnValue(2)
    const mockResultCallback = jest.fn()
    const mockShutdownCallback = jest.fn()
    const mockProcessor = getMockProcessor()
    const mockMB = new MicroBatch(mockProcessor, {
      batchSize: 2,
      frequency: 100
    })
    mockMB.onResult(mockResultCallback, jest.fn())
    mockMB.onShutdown(mockShutdownCallback)
    mockMB.shutdown()
    await flushPromises()
    expect(mockResultCallback).toHaveBeenCalledTimes(2)
    expect(mockShutdownCallback).toHaveBeenCalledTimes(1)
  })
})
