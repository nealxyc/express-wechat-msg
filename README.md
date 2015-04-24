# express-wechat-msg
ExpressJS middleware for parsing Wechat message.

## Usage
```js
var getRawBody = require('raw-body')
var wechatMsg = require('wechat-msg')

app.use(getRawBody())
app.use(wechatMsg())

app.post('/wechat', function(req, res) {
  // req.body is an object like
  //  {
	//		'ToUserName': 'gh_028d8d8d8',
	//		'FromUserName': 'gdagdsadggdfgdgd',
	//		'CreateTime': '222222222',
	//		'MsgType':'text',
	//		'Content': 'Hey',
	//		'MsgId': '111111111111'
	//	}
  console.log(JSON.stringify(req.body))
})

```
