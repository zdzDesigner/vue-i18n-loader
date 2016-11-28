var url = require('url')
var fs = require('fs')

module.exports = function (source,map) {
    var callback = this.async()
    var type = url.parse(this.query,true).query.type
    
    fs.readFile(this.resourcePath.match(/.+\//g)+'i18n.json', (err, data) => {
        if (err) {
            callback(null,source)
        }else{
            // console.log(data.toString())
            // console.log(data.toJSON())
            var i18ns = JSON.parse(data.toString())[type]
            source = source.replace(/\({2}(.+?)\){2}/g,function(arg,$1){
                // console.log('langs.'+$1)
                // console.log(eval('('+'langs.'+$1+')'))
                return eval('('+'i18ns.'+$1+')')
            })
            // console.log(source)
            callback(null,source)    
        }
        
    })
    
}
