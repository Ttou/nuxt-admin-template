if (!Reflect.has(BigInt.prototype, 'toJSON')) {
  Reflect.defineProperty(BigInt.prototype, 'toJSON', {
    value(this: bigint) {
      return this.toString()
    },
    writable: true,
    enumerable: false,
    configurable: true,
  })
}

export default {}
