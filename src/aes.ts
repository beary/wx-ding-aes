/**
 * parser 模块，用于解析服务器发来的密文
 * @module parser
 */
import { createDecipheriv, createCipheriv } from 'crypto'
import * as pkcs from './pkcs7'

/**
 * @description 解密方法
 * @author beary
 * @param text 需要解密的密文，必须是 base64 编码的
 * @param encodingAESKey AES 密钥
 */
export const decode = (text: string, encodingAESKey: string) => {
  const AESKey = Buffer.from(encodingAESKey, 'base64')
  const iv = AESKey.slice(0, 16)
  const decipher = createDecipheriv('aes-256-cbc', AESKey, iv)
  decipher.setAutoPadding(false)
  const decrypt_content = Buffer.concat([decipher.update(text, 'base64'), decipher.final()])
  const msg = pkcs.decode(decrypt_content).slice(16)
  const len = msg.slice(0, 4).readUInt32BE(0)
  return msg.slice(4, 4 + len).toString()
}

/**
 * @description 加密方法
 * @author beary
 * @param text 需要加密的文本
 * @param encodingAESKey AES 秘钥
 * @param key 放在加密内容的尾部作为校验的字符串，如果不是开发企业微信或者钉钉，则不是必须的
 */
export const encode = (text: string, encodingAESKey: string, key?: string) => {
  const randomStr = (len: number) => {
    const base = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const str = []
    while (str.length < len)
      str.push(base[Math.floor(Math.random() * base.length)])
    return str.join('')
  }

  const AESKey = Buffer.from(encodingAESKey, 'base64')
  const iv = AESKey.slice(0, 16)
  const cipher = createCipheriv('aes-256-cbc', AESKey, iv)
  cipher.setAutoPadding(false)
  const data = [
    Buffer.from(randomStr(16)),
    Buffer.from(text.length.toString(16).padStart(8, '0'), 'hex'),
    Buffer.from(text)
  ]
  if (key)
    data.push(Buffer.from(key))
  const toCipher = Buffer.from(pkcs.encode(Buffer.concat(data)))
  return Buffer
    .concat([cipher.update(toCipher), cipher.final()])
    .toString('base64')
}
