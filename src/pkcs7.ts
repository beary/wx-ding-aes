/**
 * PKCS7 模块，用于进行 PKCS7 偏移的编码和解码
 * @module pkcs7
 */
const defaultSize = 32

/**
 * @description PKCS7 编码
 * @author beary
 * @param buf { Buffer } 需要进行编码的 Buffer
 * @param blockSize { string } 偏移块大小
 */
export const encode = (buf: Buffer, blockSize?: number) => {
  blockSize = blockSize || defaultSize
  const padLen = (blockSize - buf.length % blockSize) || blockSize
  const padBuf = Buffer.alloc(padLen)
  padBuf.fill(padLen)
  return Buffer.concat([buf, padBuf])
}

/**
 * @description PKCS7 解码
 * @author beary
 * @param buf { Buffer } 需要进行解码的 Buffer
 * @param blockSize { string } 偏移块大小
 */
export const decode = (buf: Buffer, blockSize?: number) => {
  blockSize = blockSize || defaultSize
  let padLen = buf[buf.length - 1]
  if (padLen < 1 || padLen > blockSize)
    padLen = 0
  return buf.slice(0, buf.length - padLen)
}
