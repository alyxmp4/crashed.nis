import zlib from 'zlib'

/*
  NIS mobile app issued tokens are really large, so we have to compress them before sending to the client as cookie, since cookie has 4096 bit size limitation.
  We will use Brotli to compress the token and then convert it to base64 string

  The average compression rate here is about 25% of the original token size.
  It usually takes less than 2 KB of cookie space, whereas the (not compressed) NIS issued tokens are usually 6-8 KB in size,
  which will be rejected to store in browsers due to the limit
 */

export const compress = (token: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const result = zlib
        .brotliCompressSync(Buffer.from(token, 'utf8'))
        .toString('base64')

      resolve(result)
    } catch (e) {
      reject(new Error('INVALID_COMPRESSED_SIGNATURE'))
    }
  })
}

export const decompress = (compressedToken: string): Promise<string> => {
  if (!compressedToken) throw new Error('UNAUTHORIZED')

  return new Promise((resolve, reject) => {
    try {
      const result = zlib
        .brotliDecompressSync(Buffer.from(compressedToken, 'base64'))
        .toString()

      resolve(result)
    } catch (e) {
      reject(new Error('INVALID_COMPRESSED_SIGNATURE'))
    }
  })
}
