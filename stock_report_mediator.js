const stockReportDbClient = require('./clients/db/dbClient')
function StockReportMediator(){
    let latestRecord = {}
    let addedStockRecord = null;
    this.processRecordForSymbol = function(symbol,record){
        if (record.c !== latestRecord.c){
            latestRecord = record;
            addedStockRecord = stockReportDbClient.addStockRecord(symbol,record);
            addedStockRecord.then(resolvedData => console.log(resolvedData))
        }
    }
}
module.exports = new StockReportMediator();