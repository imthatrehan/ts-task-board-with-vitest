import { describe, expect, it } from 'vitest'
import generateId from './generateId'

describe('Basic Setup Test', () => {
  it('should return a string that starts with tsk_', () => {
    const id = generateId()
    expect(typeof id).toBe('string')
    expect(id.startsWith('tsk_')).toBe(true)
  })
  it('should generate 100 unique ids without duplicates', () => {
    const totalCount = 100
    const ids = Array.from({ length: totalCount }, () => generateId())
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(totalCount)
  })
})
