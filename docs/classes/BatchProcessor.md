[@micro-batcher-ts/micro-batcher](../globals.md) / BatchProcessor

# Class: `abstract` BatchProcessor\<Job, JobResult\>

Batch processor definition

## Type Parameters

• **Job**

type of job to handle

• **JobResult**

type of job result returned

## Constructors

### new BatchProcessor()

> **new BatchProcessor**\<`Job`, `JobResult`\>(): [`BatchProcessor`](BatchProcessor.md)\<`Job`, `JobResult`\>

#### Returns

[`BatchProcessor`](BatchProcessor.md)\<`Job`, `JobResult`\>

## Methods

### process()

> `abstract` **process**(`job`): `Promise`\<`JobResult`\>

#### Parameters

• **job**: `Job`

#### Returns

`Promise`\<`JobResult`\>

#### Defined in

types.ts:7
