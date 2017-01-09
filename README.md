# flush-cache
Flushes the internal node cache, useful (and recommended) when testing apps.

The node cache itself is useful and often needed, but when it comes to test you
don't want to cache your modules which you are testing. This forces you to write
isolated tests, which is a good thing.

## usage
### common

Require flush-cache and invoke the function to clear the whole cache.

something.js
```js
console.log('such logs, much wows!')
```

app.js
```js
const flush = require('flush-cache')

require('./something') // such logs, much wows!

flush()

// completely uncached & fresh object here:
require('./something') // such logs, much wows!
```

## examples
### mocha

You should add the flush method in a `beforeEach` in a `describe` or in a separate test file when you want to flush the cache in every single `it`.

```js
const flush = require('flush-cache')

beforeEach(flush)
beforeEach(function () {
  this.myObject = require('...')
})

// or put both methods in a single method

beforeEach(function () {
  flush()

  this.myObject = require('...')
})

it('should test my object', function () {
  // this.myObject is now a fresh object in every single test case!
})
```

### ava
You should add the flush method in a `beforeEach`.

```js
import test from 'ava'
import flush from 'flush-cache'

test.beforeEach(flush)
test.beforeEach(t => {
  t.context.myObject = require('...')
})

test('first', t => {
  // t.context.myObject is now a fresh object in every single test case!
})
```
