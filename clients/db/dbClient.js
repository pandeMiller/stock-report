const { PrismaClient } = require('@prisma/client')
const lodash = require('lodash')
const DATABASE_URL = process.env.DATABASE_URL

if(lodash.isEmpty(DATABASE_URL)){
    throw 'Database url is missing!'
}

function StockReportDbClient() {
    const prisma = new PrismaClient()
    let result = null;
    this.addStockRecord = async function(symbol,record){
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
    this.getStockRecordList = async function(symbol,startTime,endTime){
        return prisma.stock_report.findMany({
            where: {
                symbol,
                createdAt: {
                    gt: startTime,
                    lt: endTime
                }
            }
        })
    }
}
module.exports=new StockReportDbClient()