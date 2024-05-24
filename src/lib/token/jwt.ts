export const decode = async <T = never>(token: string): Promise<T> => {
  const payload = token.split('.')[1]!

  let base64String = payload.replace(/-/g, '+').replace(/_/g, '/')

  const padding = base64String.length % 4
  if (padding) {
    base64String += '='.repeat(4 - padding)
  }

  const decodedString = decodeURIComponent(
    atob(base64String)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join(''),
  )

  return JSON.parse(decodedString) as unknown as T
}
