'use strict'

class HyperMap {
  constructor (iterable) {
    this.index = new Map()
    this.buckets = new Map()

    if (iterable) {
      for (let bucket of iterable) {
        this.associate.apply(this, bucket)
      }
    }
  }

  associate () {
    let bucket
    let bucketIndex

    if (arguments.length < 2) {
      throw new Error('HyperMap: Cannot associate less than two items')
    }

    for (let arg of arguments) {
      bucketIndex = this.index.get(arg)
      if (bucketIndex) {
        bucket = this.buckets.get(bucketIndex)
        break
      }
    }

    if (!bucket) {
      bucket = new Set()
      bucketIndex = Math.random()
      while (this.buckets.has(bucketIndex)) {
        bucketIndex = Math.random()
      }
    }

    for (let arg of arguments) {
      if (this.has(arg) && !bucket.has(arg)) {
        throw new Error('HyperMap: Cannot associate item already associated elsewhere')
      }

      bucket.add(arg)
      this.index.set(arg, bucketIndex)
    }

    this.buckets.set(bucketIndex, bucket)
    return this
  }

  disassociate () {
    const itemsToRemove = []
    const ref = arguments[0]
    for (let i = 1; i < arguments.length; i += 1) {
      itemsToRemove.push(arguments[i])
    }

    const bucketIndex = this.index.get(ref)
    if (!bucketIndex) return this // nothing to do

    const bucket = this.buckets.get(bucketIndex)
    for (let item of itemsToRemove) {
      bucket.delete(item)
    }

    // It makes no sense to have a single- or zero- value bucket
    if (bucket.size < 2) {
      this.buckets.delete(bucketIndex)
      for (let item of bucket) {
        this.index.delete(item)
      }
    }

    return this
  }

  get (ref) {
    const bucketIndex = this.index.get(ref)
    if (bucketIndex) return this.buckets.get(bucketIndex)
  }

  has (ref) {
    return this.index.has(ref)
  }
}

module.exports = HyperMap
