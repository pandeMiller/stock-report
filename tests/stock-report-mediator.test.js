const stockReportMediator = require("../stock_report_mediator")
const dbClient = require("../clients/db/dbClient")

jest.mock("../clients/db/dbClient")

test("process stock data when there is a change", () => {
    const d = {
        o: 182.24,
        h: 182.75,
        l: 180.65,
        c: 181.4399,
        pc: 182.52,
        d: -1.0801,
        dp: -0.5918
      }
      const changedD = {
        o: 182.24,
        h: 182.75,
        l: 180.65,
        c: 182.4399,
        pc: 182.52,
        d: -1.0801,
        dp: -0.5918
      }
    stockReportMediator.processRecordForSymbol('AAPL',d)
    expect(dbClient.addStockRecord.mock.calls).toHaveLength(1)
    stockReportMediator.processRecordForSymbol('AAPL',d)
    expect(dbClient.addStockRecord.mock.calls).toHaveLength(1)
    stockReportMediator.processRecordForSymbol('AAPL',changedD)
    expect(dbClient.addStockRecord.mock.calls).toHaveLength(2)

})