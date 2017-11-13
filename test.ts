import { expect } from 'chai'
import { decode, encode, simple } from './src'

describe('钉钉', () => {
  const dingEncrypt = '1a3NBxmCFwkCJvfoQ7WhJHB+iX3qHPsc9JbaDznE1i03peOk1LaOQoRz3+nlyGNhwmwJ3vDMG+OzrHMeiZI7gTRWVdUBmfxjZ8Ej23JVYa9VrYeJ5as7XM/ZpulX8NEQis44w53h1qAgnC3PRzM7Zc/D6Ibr0rgUathB6zRHP8PYrfgnNOS9PhSBdHlegK+AGGanfwjXuQ9+0pZcy0w9lQ=='
  const dingAESkey = '4g5j64qlyl3zvetqxz5jiocdr586fn2zvjpa8zls3ij'
  const dingSuiteId = 'xxxxxxxxxxxxxx'
  it('解密', () => {
    const msg = decode(dingEncrypt, dingAESkey)
    const res = JSON.parse(msg)
    expect(res.TestSuiteKey).to.equal('suite4xxxxxxxxxxxxxxx')
  })
  it('加密', () => {
    const msg = decode(dingEncrypt, dingAESkey)
    // 开始加密
    const target = encode(msg, dingAESkey, dingSuiteId)
    const msg2 = decode(target, dingAESkey)
    expect(msg).to.equal(msg2)
  })
})

describe('simple', () => {
  const text = 'testtest|1510565812088'
  const AESkey = '4g5j64qlyl3zvetqxz5jiocdr586fn2zvjpa8zls3ij'
  it('加解密', () => {
    const msg = simple.encode(text, AESkey)
    const res = simple.decode(msg, AESkey)
    expect(res.toString()).to.equal(text)
  })
})
