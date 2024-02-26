const { PrismaClient } = require('@prisma/client')

function StockReportDbClient() {
    const prisma = new PrismaClient()
    let result = null;
    this.addStockRecord = async function(symbol,record){
        console.log(record)
        result = await prisma.stock_report.create({
            data: {
                high: record.h,
                low: record.l,
                current: record.c,
                symbol,
            },
        
    })
    return result;
    }
}
module.exports=new StockReportDbClient()