const _isServer = typeof window === 'undefined'

export function isServer () {
  return _isServer
}
