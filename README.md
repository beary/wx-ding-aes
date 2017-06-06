# wx-ding-aes

企业微信、钉钉第三方回调接口 AES 加密解密库

## Usage

```shell
npm install wx-ding-aes --save
```

```javascript
/* javascript */
const aes = require('wx-ding-aes')

/* typescript */
import * as aes from 'wx-ding-aes'
```

## API

### decode\(text, encodingAESKey\): string

> `text`: 微信/钉钉发送给回调接口的密文
> `encodingAESKey`: 创建套件时的 encodingAESKey

> `return`: 对于钉钉，返回值为一个 JSON 字符串，使用 `JSON.parse` 即可拿到 JSON 对象。对于企业微信，返回值为被加密的 xml 字符串，可以使用 xml 解析的库来进行处理。



```javascript
let text = 'xxx'
let encodingAESKey = 'xxx'
let res = aes.decode(text, encodingAESKey)
```

### encode\(text, encodingAESKey, key\): string

> `text`: 需要加密的内容
> `encodingAESKey`: 创建套件时的 encodingAESKey
> `key`: 对于钉钉参考[官方文档](https://open-doc.dingtalk.com/docs/doc.htm?articleId=104945&docType=1#s12)中的`$key`，对于企业微信参考[官方文档](https://work.weixin.qq.com/api/doc#10127)中的`$CorpID`

> `return`: 加密后的密文

```javascript
let text = 'xxx'
let encodingAESKey = 'xxx'
let key = 'xxx'
let res = aes.encode(text, encodingAESKey, key)
```

