import { Queue } from './queue'

describe('Queue', () => {
  test('should enqueue item to queue', () => {
    const queue = new Queue<string>()
    queue.enqueue('abc')
    expect(queue.length).toBe(1)
  })

  test('should dequeue items from the queue', () => {
    const queue = new Queue<string>()
    queue.enqueue('abc')
    queue.enqueue('def')
    queue.enqueue('ghi')
    expect(queue.length).toBe(3)
    const items = queue.dequeue(2)
    expect(queue.length).toBe(1)
    expect(items).toEqual(['abc', 'def'])
  })
})
