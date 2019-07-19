import { encrypt, decrypt } from './aes'
import { randomStr } from './utils'

/**
 * @description 加密方法
 * @author beary
 * @param text 需要加密的文本
 * @param encodingAESKey AES 秘钥
 * @param key 放在加密内容的尾部作为校验的字符串，如果不是开发企业微信或者钉钉，则不是必须的
 */
export const encode = (text: string, encodingAESKey: string, key?: string) => {
  const textBuffer = Buffer.from(text)
  const datas = [
    Buffer.from(randomStr(16)),
    Buffer.from(textBuffer.length.toString(16).padStart(8, '0'), 'hex'),
    textBuffer
  ]
  if (key)
    datas.push(Buffer.from(key))
  return encrypt(Buffer.concat(datas), encodingAESKey)
}

/**
 * @description 解密方法
 * @author beary
 * @param text 需要解密的密文，必须是 base64 编码的
 * @param encodingAESKey AES 密钥
 */
export const decode = (text: string, encodingAESKey: string, key?: string) => {
  const decryptContent = decrypt(text, encodingAESKey)
  return decryptContent
    .slice(20, 20 + decryptContent.readUInt32BE(16))
    .toString()
}
