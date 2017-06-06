import { expect } from 'chai'
import { decode, encode } from './src'

describe('钉钉', () => {
  let dingEncrypt = '1a3NBxmCFwkCJvfoQ7WhJHB+iX3qHPsc9JbaDznE1i03peOk1LaOQoRz3+nlyGNhwmwJ3vDMG+OzrHMeiZI7gTRWVdUBmfxjZ8Ej23JVYa9VrYeJ5as7XM/ZpulX8NEQis44w53h1qAgnC3PRzM7Zc/D6Ibr0rgUathB6zRHP8PYrfgnNOS9PhSBdHlegK+AGGanfwjXuQ9+0pZcy0w9lQ=='
  let dingAESkey = '4g5j64qlyl3zvetqxz5jiocdr586fn2zvjpa8zls3ij'
  let dingSuiteId = 'xxxxxxxxxxxxxx'
  it('解密', () => {
    let msg = decode(dingEncrypt, dingAESkey)
    let res = JSON.parse(msg)
    expect(res.TestSuiteKey).to.equal('suite4xxxxxxxxxxxxxxx')
  })
  it('加密', () => {
    let msg = decode(dingEncrypt, dingAESkey)
    // 开始加密
    let target = encode(msg, dingAESkey, dingSuiteId)
    let msg2 = decode(target, dingAESkey)
    expect(msg).to.equal(msg2)
  })
})
