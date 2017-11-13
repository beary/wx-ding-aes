import { encrypt, decrypt } from './aes'
import { randomStr } from './utils'

const defaultRandomStringLength = 4

export const encode = (text: string, encodingAESKey: string, randomLength?: number) =>
  encrypt(
    Buffer.from(
      `${randomStr(
        randomLength === undefined ?
          defaultRandomStringLength :
          randomLength)}${text}`)
    , encodingAESKey
  )

export const decode = (text: string, encodingAESKey: string, randomLength?: number) =>
  decrypt(text, encodingAESKey)
    .slice(
    randomLength === undefined ?
      defaultRandomStringLength :
      randomLength)
