const { PrismaClient } = require('@prisma/client')

function StockReportDbClient() {
    const prisma = new PrismaClient()

    this.addStockRecord = async function(symbol,record){
        const result = await prisma.stock_report.create({
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