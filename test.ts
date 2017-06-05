import { expect } from 'chai'
import { decode } from './src'

describe('解密', () => {
  it('钉钉', () => {
    let encrypt = '1a3NBxmCFwkCJvfoQ7WhJHB+iX3qHPsc9JbaDznE1i03peOk1LaOQoRz3+nlyGNhwmwJ3vDMG+OzrHMeiZI7gTRWVdUBmfxjZ8Ej23JVYa9VrYeJ5as7XM/ZpulX8NEQis44w53h1qAgnC3PRzM7Zc/D6Ibr0rgUathB6zRHP8PYrfgnNOS9PhSBdHlegK+AGGanfwjXuQ9+0pZcy0w9lQ=='
    let msg = decode(encrypt, '4g5j64qlyl3zvetqxz5jiocdr586fn2zvjpa8zls3ij')
    let res = JSON.parse(msg)
    expect(res.TestSuiteKey).to.equal('suite4xxxxxxxxxxxxxxx')
  })
})
