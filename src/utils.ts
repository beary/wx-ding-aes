export const randomStr = (len: number) => {
  const base = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const str = []
  while (str.length < len)
    str.push(base[Math.floor(Math.random() * base.length)])
  return str.join('')
}
