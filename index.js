const express = require('express');
const app = express();
const http = require('http')
const cors = require('cors')
const server = http.createServer(app)
const { Server } = require("socket.io")
const mediator = require('./stock_report_mediator') 
const io = new Server(server, {
    cors: {
    origin: "http://localhost:5173",
    }
  })

const finnhubClient = require('./clients/finnhub_client')

const emitData = (symbol,data) => {
    io.emit('stockData',data)
    mediator.processRecordForSymbol(symbol,data)
} 
const doSomething = () => {
    finnhubClient.getStockDetails("AAPL",emitData)
}

setInterval(() =>
doSomething(),10000)

app.get('/',(req,res) => {
    res.send('Hello world!')
});

const port = process.env.PORT || 3000
server.listen(port, () => console.log(`Listening! ${port}`))
