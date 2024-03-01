const express = require('express');
const app = express();
const http = require('http')
const cors = require('cors')
const server = http.createServer(app)
const { Server } = require("socket.io")
const faanTickerSymbols = require('./stock_report_mediator').FAANG_TICKER_SYMBOLS 
const mediatorC = require('./stock_report_mediator').StockReportMediator

const STOCK_DATA_EMIT_EVENT_NAME_AAPL = "stockDataAapl"
const STOCK_DATA_EMIT_EVENT_NAME_META = "stockDataMeta"
const STOCK_DATA_EMIT_EVENT_NAME_GOOG = "stockDataGoog"
const STOCK_DATA_EMIT_EVENT_NAME_AMZN = "stockDataAmzn"
const STOCK_DATA_EMIT_EVENT_NAME_NFLX = "stockDataNflx"
const EMIT_DATA_INTERVAL_MS = 5000
const CLIENT_URL = "http://localhost:5173"

const mediator = new mediatorC();

// cors config for socket io
const io = new Server(server, {
    cors: {
    origin: CLIENT_URL,
    }
  })

//cors config for express
var corsOptions = {
    origin: CLIENT_URL,
    optionsSuccessStatus: 200
}

const emitAndProcessData = (symbol,data) => {
    emitData(symbol,data)
    mediator.processRecordForSymbol(symbol,data)
}

const emitData = (symbol,data) => {
    if (symbol === faanTickerSymbols.AAPL){
        io.emit(STOCK_DATA_EMIT_EVENT_NAME_AAPL,data)
    } else if (symbol === faanTickerSymbols.GOOG){
        io.emit(STOCK_DATA_EMIT_EVENT_NAME_GOOG,data)
    } else if (symbol === faanTickerSymbols.META){
        io.emit(STOCK_DATA_EMIT_EVENT_NAME_META,data)
    } else if (symbol === faanTickerSymbols.AMZN){
        io.emit(STOCK_DATA_EMIT_EVENT_NAME_AMZN,data)
    } else if (symbol === faanTickerSymbols.NFLX){
        io.emit(STOCK_DATA_EMIT_EVENT_NAME_NFLX,data)
    }
}

const emitStockData = () => {
    mediator.getQuoteForFAANGTickers(emitAndProcessData)
}

setInterval(() =>
emitStockData(),EMIT_DATA_INTERVAL_MS)

app.get('/',(req,res) => {
    res.send('Hello world!')
});

app.get('/api/v0/stocks/:symbol',cors(corsOptions),(req,res) => {
    const startDate = new Date(req.query.startDate)
    const endDate = req.query.endDate? new Date(req.query.endDate): new Date
    mediator.retrieveBulkRecordsRequest(req.params.symbol,{startDate,endDate}).then(data => res.send(data))
})

const port = process.env.PORT || 3000
server.listen(port, () => console.log(`Listening! ${port}`))
