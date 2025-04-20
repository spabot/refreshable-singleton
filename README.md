# refreshable-singleton

## Installation

`bun add refreshable-singleton`

## Example

```typescript
import { Singleton, type IFactory } from 'refreshable-singleton'

let createdCount = 0

const factory: IFactory<number> = {
    create() {
        await Bun.sleep(100)
        return Promise.resolve(++createdCount)
    }
}

const value = new Singleton(factory)

console.log(createdCount) // 0
console.log(await value.get()) // 1
console.log(await value.get()) // 1
console.log(await value.invalidate()) // 2
console.log(await value.get()) // 2
console.log(await value.get()) // 2

// It prevents concurrency calls to invalidate()
console.log(await Promise.all([value.invalidate(), value.invalidate()])) // [3, 3]
```

## Dependencies

* [p-lazy](https://github.com/sindresorhus/p-lazy)

## Appendix

This project was created using `bun init` in bun v1.2.8. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
