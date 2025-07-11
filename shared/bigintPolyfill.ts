if (!Reflect.has(BigInt.prototype, 'toJSON')) {
  Reflect.defineProperty(BigInt.prototype, 'toJSON', {
    value: function (this: bigint) {
      return this.toString()
    },
    writable: true,
    enumerable: false,
    configurable: true,
  })
}
