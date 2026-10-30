export interface ApiError {
  message?: string
  status?: number
  data?: {
    message?: string
  }
}

export default function getErrorMessage(error: unknown): string {
  if (error === null || error === undefined) {
    return 'An unknown error occurred'
  }
  if (typeof error === 'string') {
    return error.trim() ? error : 'An unknown error occurred'
  }
  if (error instanceof Error) {
    return error.message.trim() ? error.message : 'An unknown error occurred'
  }
  if (typeof error === 'object') {
    const errObj = error as Record<string, unknown>
    if (
      errObj.data &&
      typeof errObj.data === 'object' &&
      'message' in errObj.data &&
      typeof (errObj.data as Record<string, unknown>).message === 'string'
    ) {
      return (errObj.data as Record<string, unknown>).message as string
    }
    if ('message' in errObj && typeof errObj.message === 'string') {
      return errObj.message
    }
    if ('error' in errObj && typeof errObj.error === 'string') {
      return errObj.error
    }
  }
  return 'An unknown error occurred'
}
