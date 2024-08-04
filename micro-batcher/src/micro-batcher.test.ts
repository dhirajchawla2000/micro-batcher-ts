import { EventEmitter } from 'events'
import { Queue } from './queue'
import { MicroBatch } from './micro-batcher'
import { BatchProcessor } from './types'

jest.mock('events')
jest.mock('./queue')

describe('MicroBatch', () => {
  const mockEnqueueFn = jest.fn()
  const mockEmitFn = jest.fn()

  const mockEventEmitter = EventEmitter as jest.Mocked<typeof EventEmitter>
  const mockQueue = Queue as jest.Mocked<typeof Queue>
  mockQueue.prototype.enqueue = mockEnqueueFn
  mockEventEmitter.prototype.emit = mockEmitFn

  const getMockProcessor = () => {
    class MockProcessor extends BatchProcessor<string, string> {
      async process(job: string): Promise<string> {
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
    const mockProcessor = getMockProcessor()
    const mockMB = new MicroBatch(mockProcessor, {
      batchSize: 2,
      frequency: 100
    })
    mockMB.shutdown()
    expect(mockEmitFn).toHaveBeenLastCalledWith('shutdown')
  })
})
