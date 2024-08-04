# Micro Batching example library in Typescript

An example implemenation of micro batching library written in typescrpt.

Micro-batch processing is the practice of collecting data in small groups (“batches”) for the purposes of taking action on (processing) that data. More details about the concept is available [here](https://hazelcast.com/glossary/micro-batch-processing/).

## Getting started

Install dependencies

```
npm install
```

Build the project

```
npm run build
```

Run the test

```
npm run test
```

## Run the examples

**Square the numbers batch**

```
npm start -w @micro-batcher-ts/sqNumBatch
```

In this example, I have implemented a batch processor which returns the square of a given number. In this example, I have also tried to emulate a forceful shutdown when the batch is in progress, just to show case that the micro batch completes all the remaining process before shutdown completes. I have also emulated a scenario where a job fails and its handling.

**Reversing the string batch**

```
npm start -w @micro-batcher-ts/strRevBatch
```

In this example, I have implemented a batch processor which returns the reverse of a given string. In this example, I hve also tried to emulate calling shutdown of the micro batch after all the jobs have run successfully.
