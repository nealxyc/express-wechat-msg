// Parse wechat's xml body
function read(xmlmsg){
    var ret = {}
    var lines = xmlmsg.split('\n')
    for(var i = 0 ; i < lines.length; i ++){
        var line = lines[i]
        if(line == '<xml>' || line == '</xml>') continue;
        var kv = readline(line)
        if (kv){
            ret[kv.k] = kv.v
        }
    }
    return ret
}
 
function readline(line){
    var m = matchCData(line)
    if (!m){
        m = matchXmlData(line)
    }
    if (m){
        return {k: m[1], v: m[2] }
    }
    return null
}
 
function matchCData(line){
    var r = /<([a-zA-z0-9_]+)><!\[CDATA\[(.+)\]\]><\/[a-zA-z0-9_]+>/
    return r.exec(line)
}
 
function matchXmlData(line){
    var r = /<([a-zA-Z0-9_]+)>([^<>]+)<\/[a-zA-z0-9_]+>/
    return r.exec(line)
}
 
var wechatJs = function(){
    return  function(req, res, next){
        if (req.body){

            req.body = read(req.body.toString())
        }
        if(next){
            next()
        }
    }
    
}

wechatJs.read = read
wechatJs.readLine = readline
wechatJs.matchCData = matchCData
wechatJs.matchXmlData = matchXmlData

module.exports = wechatJs