import { describe, it, expect } from '@jest/globals'
import { doubleNumber } from '..'

describe('dummy test', () => {
  it('should return double of number provided', async () => {
    const expectedNumber = 4
    const response = doubleNumber(2)
    expect(response).toBe(expectedNumber)
  })
})
