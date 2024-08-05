[@micro-batcher-ts/micro-batcher](../globals.md) / MicroBatch

# Class: MicroBatch\<Job, JobResult\>

Micro batch class that handles micro batching

## Type Parameters

• **Job**

type of job to handle

• **JobResult**

type of job result returned

## Constructors

### new MicroBatch()

> **new MicroBatch**\<`Job`, `JobResult`\>(`processor`, `options`): [`MicroBatch`](MicroBatch.md)\<`Job`, `JobResult`\>

#### Parameters

• **processor**: [`BatchProcessor`](BatchProcessor.md)\<`Job`, `JobResult`\>

batch processor to process a given job

• **options**: [`MicroBatcherOptions`](../interfaces/MicroBatcherOptions.md)

micro batch options

#### Returns

[`MicroBatch`](MicroBatch.md)\<`Job`, `JobResult`\>

#### Defined in

micro-batcher.ts:30

## Methods

### onResult()

> **onResult**(`result`, `error`): `void`

Invokes the result and error callbacks after each job run

#### Parameters

• **result**

result callback

• **error**

error callback

#### Returns

`void`

#### Defined in

micro-batcher.ts:50

***

### onShutdown()

> **onShutdown**(`callback`): `void`

Invokes the shutdown callback when micro batch shutdown is triggered

#### Parameters

• **callback**

shutdown callback

#### Returns

`void`

#### Defined in

micro-batcher.ts:59

***

### shutdown()

> **shutdown**(): `Promise`\<`void`\>

Trigger a micro batch shutdown

#### Returns

`Promise`\<`void`\>

#### Defined in

micro-batcher.ts:74

***

### submit()

> **submit**(`job`): `void`

Adds a job for execution

#### Parameters

• **job**: `Job`

job to execute

#### Returns

`void`

#### Defined in

micro-batcher.ts:67
