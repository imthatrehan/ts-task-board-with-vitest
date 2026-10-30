import { describe, expect, it } from 'vitest'
import getErrorMessage from './getErrorMessage'

describe('getErrorMessage utility', () => {
  it('should handle null without crashing', () => {
    const result = getErrorMessage(null)
    expect(result).toBe('An unknown error occurred')
  })
  it('should handle undefined without crashing', () => {
    const result = getErrorMessage(undefined)
    expect(result).toBe('An unknown error occurred')
  })
  it('should return the string if a plain string error is passed', () => {
    const result = getErrorMessage('Failed to connect to server')
    expect(result).toBe('Failed to connect to server')
  })
  it('should handle an empty string gracefully', () => {
    const result = getErrorMessage('')
    expect(result).toBe('An unknown error occurred')
  })
  it('should extract message from standard JS Error instance', () => {
    const err = new Error('Task not found')
    const result = getErrorMessage(err)
    expect(result).toBe('Task not found')
  })
  it('should handle Error instance with empty message', () => {
    const err = new Error('')
    const result = getErrorMessage(err)
    expect(result).toBe('An unknown error occurred')
  })
  it('should extract message from an object having a direct "message" key', () => {
    const apiError = { message: 'Token expired', status: 401 }
    const result = getErrorMessage(apiError)
    expect(result).toBe('Token expired')
  })
  it('should extract message from nested "data.message" format', () => {
    const axiosStyleError = {
      status: 400,
      data: {
        message: 'Invalid title format',
      },
    }
    const result = getErrorMessage(axiosStyleError)
    expect(result).toBe('Invalid title format')
  })
  it('should extract string from "error" property if present', () => {
    const oauthError = { error: 'invalid_grant' }
    const result = getErrorMessage(oauthError)
    expect(result).toBe('invalid_grant')
  })
  it('should return fallback if given a number, boolean, or unknown structure', () => {
    expect(getErrorMessage(404)).toBe('An unknown error occurred')
    expect(getErrorMessage(false)).toBe('An unknown error occurred')
    expect(getErrorMessage({})).toBe('An unknown error occurred')
  })
})
