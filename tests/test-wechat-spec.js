describe('testing testing', function(){
	it('shoud work', function(){
		expect(true).toEqual(true)
	})
})

describe('test wechat msg', function(){
	var wechat = require('wechat-msg')

	it('shoud match CData', function(){
		var m = wechat.matchCData('<Key><![CDATA[value]]></Key>')
		expect(m[1]).toEqual('Key')
		expect(m[2]).toEqual('value')

		var m = wechat.matchCData('<FromUserName><![CDATA[oaNqBt2pCid3HnUUcbFcB2zeOtPQ]]></FromUserName>')
		expect(m[1]).toEqual('FromUserName')
		expect(m[2]).toEqual('oaNqBt2pCid3HnUUcbFcB2zeOtPQ')

		//<MsgType><![CDATA[text]]></MsgType>
		var m = wechat.matchCData('<MsgType><![CDATA[text]]></MsgType>')
		expect(m[1]).toEqual('MsgType')
		expect(m[2]).toEqual('text')

		//<ToUserName><![CDATA[gh_025385b4906c]]></ToUserName>
		var m = wechat.matchCData('<ToUserName><![CDATA[gh_025385b4906c]]></ToUserName>')
		expect(m[1]).toEqual('ToUserName')
		expect(m[2]).toEqual('gh_025385b4906c')

		//<Content><![CDATA[P]]></Content>
		var m = wechat.matchCData('<Content><![CDATA[P]]></Content>')
		expect(m[1]).toEqual('Content')
		expect(m[2]).toEqual('P')
	})

	it('shoud match XML data', function(){
		var m = wechat.matchXmlData('<Key>value</Key>')
		expect(m[1]).toEqual('Key')
		expect(m[2]).toEqual('value')

		var m = wechat.matchXmlData('<FromUserName>oaNqBt2pCid3HnUUcbFcB2zeOtPQ</FromUserName>')
		expect(m[1]).toEqual('FromUserName')
		expect(m[2]).toEqual('oaNqBt2pCid3HnUUcbFcB2zeOtPQ')

		var m = wechat.matchXmlData('<MsgId>6141110369361573532</MsgId>')
		expect(m[1]).toEqual('MsgId')
		expect(m[2]).toEqual('6141110369361573532')

		//<CreateTime>1429838680</CreateTime>
		var m = wechat.matchXmlData('<CreateTime>1429838680</CreateTime>')
		expect(m[1]).toEqual('CreateTime')
		expect(m[2]).toEqual('1429838680')
	})

	it('should match nothing', function(){
		var m = wechat.matchCData('<xml></xml>')
	})

	it('should generate a map', function(){
		var body = '<xml>\n<ToUserName><![CDATA[gh_025385b4906c]]></ToUserName>\n\
<FromUserName><![CDATA[oaNqBt2pCid3HnUUcbFcB2zeOtPQ]]></FromUserName>\n\
<CreateTime>1429839577</CreateTime>\n\
<MsgType><![CDATA[text]]></MsgType>\n\
<Content><![CDATA[Hey]]></Content>\n\
<MsgId>6141114221947238307</MsgId>\n\
</xml>'
		var m = wechat.read(body)
		var o = {
			'ToUserName': 'gh_025385b4906c',
			'FromUserName': 'oaNqBt2pCid3HnUUcbFcB2zeOtPQ',
			'CreateTime': '1429839577',
			'MsgType':'text',
			'Content': 'Hey',
			'MsgId': '6141114221947238307'
		}
		expect(m).toEqual(o)
	})

	it('should generate a map as well', function(){
		var body = '<xml><ToUserName><![CDATA[gh_025385b4906c]]></ToUserName>\n\
<FromUserName><![CDATA[oaNqBt2pCid3HnUUcbFcB2zeOtPQ]]></FromUserName>\n\
<CreateTime>1429839577</CreateTime>\n\
<MsgType><![CDATA[text]]></MsgType>\n\
<Content><![CDATA[Hey]]></Content>\n\
<MsgId>6141114221947238307</MsgId>\n\
</xml>'
		var m = wechat.read(body)
		var o = {
			'ToUserName': 'gh_025385b4906c',
			'FromUserName': 'oaNqBt2pCid3HnUUcbFcB2zeOtPQ',
			'CreateTime': '1429839577',
			'MsgType':'text',
			'Content': 'Hey',
			'MsgId': '6141114221947238307'
		}
		expect(m).toEqual(o)
	})

	it('should change req.body', function(){
		var req = {body: '<xml><ToUserName><![CDATA[gh_025385b4906c]]></ToUserName>\n\
<FromUserName><![CDATA[oaNqBt2pCid3HnUUcbFcB2zeOtPQ]]></FromUserName>\n\
<CreateTime>1429839577</CreateTime>\n\
<MsgType><![CDATA[text]]></MsgType>\n\
<Content><![CDATA[Hey]]></Content>\n\
<MsgId>6141114221947238307</MsgId>\n\
</xml>'}
		var o = {
			'ToUserName': 'gh_025385b4906c',
			'FromUserName': 'oaNqBt2pCid3HnUUcbFcB2zeOtPQ',
			'CreateTime': '1429839577',
			'MsgType':'text',
			'Content': 'Hey',
			'MsgId': '6141114221947238307'
		}
		wechat()(req)
		expect(req.body).toEqual(o)
	})
})