const http = require('http');
const URL = require('url');
const data = require('./urls.json');
const path = require('path');
const fs = require('fs');

function writeFile(cb){
    fs.writeFile(
        path.join(__dirname,"urls.json"),
        JSON.stringify(data,null,2),
        err => {
            if(err) throw err;

            cb(JSON.stringify({message: "Ok"}))
        })
}

http.createServer((req,res)=>{

    res.writeHead(200,{'Access-Control-Allow-Origin': '*'})

    
    const {name, url, del} = URL.parse(req.url,true).query;

    //all resources
    if(!name || !url)
        res.end(JSON.stringify(data));

    if(del){
        data.urls = data.urls.filter(item => String(item.url) !== String(url));

        return writeFile((message) => res.end(message))

    }

        data.urls.push({name,url})

    return writeFile((message) => res.end(message))

}).listen(3000,() => console.log('Api is running...')) 