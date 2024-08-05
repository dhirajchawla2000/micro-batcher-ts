[@micro-batcher-ts/micro-batcher](../globals.md) / Queue

# Class: Queue\<Job\>

Queue class for handle job queues

## Type Parameters

• **Job**

type of job to queue

## Constructors

### new Queue()

> **new Queue**\<`Job`\>(): [`Queue`](Queue.md)\<`Job`\>

#### Returns

[`Queue`](Queue.md)\<`Job`\>

#### Defined in

queue.ts:9

## Methods

### dequeue()

> **dequeue**(`batchSize`): `Job`[]

Dequeues jobs less than or equal to given batch size

#### Parameters

• **batchSize**: `number`

job count to dequeue

#### Returns

`Job`[]

jobs

#### Defined in

queue.ts:26

***

### enqueue()

> **enqueue**(`job`): `void`

Enqueues a job

#### Parameters

• **job**: `Job`

job to enqueue

#### Returns

`void`

#### Defined in

queue.ts:17

***

### getLength()

> **getLength**(): `number`

#### Returns

`number`

queue length

#### Defined in

queue.ts:34
