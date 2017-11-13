/**
 * parser 模块，用于解析服务器发来的密文
 * @module parser
 */
import { createDecipheriv, createCipheriv } from 'crypto'
import * as pkcs from './pkcs7'

export const encrypt = (data: Buffer, encodingAESKey: string) => {
  const AESKey = Buffer.from(encodingAESKey, 'base64')
  const iv = AESKey.slice(0, 16)
  const cipher = createCipheriv('aes-256-cbc', AESKey, iv)
  cipher.setAutoPadding(false)
  return Buffer
    .concat([
      cipher.update(pkcs.encode(data)),
      cipher.final()
    ]).toString('base64')
}

export const decrypt = (data: string, encodingAESKey: string) => {
  const AESKey = Buffer.from(encodingAESKey, 'base64')
  const iv = AESKey.slice(0, 16)
  const decipher = createDecipheriv('aes-256-cbc', AESKey, iv)
  decipher.setAutoPadding(false)
  return pkcs.decode(
    Buffer.concat([
      decipher.update(data, 'base64'),
      decipher.final()
    ])
  )
}
