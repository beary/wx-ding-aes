#
wx-ding-aes
企业微信、钉钉第三方回调接口 AES 解密库

## 用法

```javascript
/* javascrpit */
const aes = require('wx-ding-aes')

let text = 'xxx'
let encodingAESKey = 'xxx'
let res = aes.decode(text, encodingAESKey)
```

```typescript
/* typescript */
import { decode } from 'wx-ding-aes'

let text = 'xxx'
let encodingAESKey = 'xxx'
let res = aes.decode(text, encodingAESKey)

```
对于钉钉，`res`为一个 JSON 字符串，使用 `JSON.parse` 即可拿到 JSON 对象。
对于企业微信，`res`为被加密的 xml 字符串，可以使用 xml 解析的库来进行处理。