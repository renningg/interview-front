const express = require("express")
const app = express()
app.use(express.static("./public"))
app.get("/",(req,res)=>{
  res.send({ok:1})
})

const { WebSocketServer }  =  require('ws');

const wss = new WebSocketServer({ port: 8080 });
// wss是新建的服务端  ws是客户端
wss.on('connection', function connection(ws) {
  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.send('something');
});

app.listen(3002)