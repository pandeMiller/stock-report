const stockReportDbClient = require('./clients/db/dbClient')
const finnhub_client =  require('./clients/finnhub_client')
const FAANG_TICKERS = ['META','AAPL','AMZN','NFLX','GOOG']
const FAANG_TICKER_SYMBOLS = Object.freeze({
    META: 'META',
    AAPL: 'AAPL',
    AMZN: 'AMZN',
    NFLX: 'NFLX',
    GOOG: 'GOOG'
})
function StockReportMediator(){
    let latestRecord = {}
    FAANG_TICKERS.forEach(ticker => {
        latestRecord[ticker] = {
            o: 0,
            h: 0,
            l: 0,
            c: 0,
            pc: 0,
            d: 0,
            dp: 0
          }
    })
    
    this.processRecordForSymbol = function(symbol,record){
        // compare with the previous price record for the ticker and save it to db only where there is a change to the current price
        if (record.c !== latestRecord[symbol].c){
            latestRecord[symbol] = record;
            console.log(`adding record for symbol ${symbol}`)
            stockReportDbClient.addStockRecord(symbol,record).catch((err) => {
                console.error(err)
            });
        }

    }
    this.retrieveBulkRecordsRequest = function(symbol,bulkRecordReq){
        return stockReportDbClient.getStockRecordList(symbol,bulkRecordReq.startDate,bulkRecordReq.endDate).catch(err => console.error(err))
    }
    this.getQuoteForFAANGTickers = function(io_emit_func) {
        FAANG_TICKERS.forEach(ticker => {
            finnhub_client.getStockDetails(ticker,io_emit_func)
        })
    }
}
module.exports = {StockReportMediator, FAANG_TICKER_SYMBOLS}
