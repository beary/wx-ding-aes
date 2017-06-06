/**
 * parser 模块，用于解析服务器发来的密文
 * @module parser
 */
import { createDecipheriv, createCipheriv } from 'crypto'
import * as pkcs from './pkcs7'

/**
 * @description this is hehe
 * @author beary
 * @param text 
 * @param encodingAESKey 
 */
export const decode = (text: string, encodingAESKey: string) => {
  let AESKey = Buffer.from(`${encodingAESKey}=`, 'base64')
  let iv = AESKey.slice(0, 16)
  let decipher = createDecipheriv('aes-256-cbc', AESKey, iv)
  let decrypt_content = decipher.update(text, 'base64')
  let msg = pkcs.decode(decrypt_content).slice(16)
  let len = msg.slice(0, 4).readUInt32BE(0)
  return msg.slice(4, 4 + len).toString()
}

export const encode = (text: string, encodingAESKey: string, key: string) => {
  const randomStr = (len: number) => {
    let base = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let str = []
    while (str.length < len)
      str.push(base[Math.floor(Math.random() * base.length)])
    return str.join('')
  }

  let AESKey = Buffer.from(`${encodingAESKey}=`, 'base64')
  let iv = AESKey.slice(0, 16)
  let cipher = createCipheriv('aes-256-cbc', AESKey, iv)
  let data = [
    Buffer.from(randomStr(16)),
    Buffer.from(text.length.toString(16).padStart(8, '0'), 'hex'),
    Buffer.from(text),
    Buffer.from(key)
  ]
  let toCipher = Buffer.from(pkcs.encode(Buffer.concat(data)))
  return Buffer
    .concat([cipher.update(toCipher), cipher.final()])
    .toString('base64')
}
