const finnhubApiClient= require("../../clients/finnhub")
const finnhubClient= require("../../clients/finnhub_client")


jest.mock("../../clients/finnhub")

test('should execute callback function',() => {
    const d = {
        o: 182.24,
        h: 182.75,
        l: 180.65,
        c: 181.4399,
        pc: 182.52,
        d: -1.0801,
        dp: -0.5918
      }
    finnhubClient.getStockDetails('AAPL',jest.fn())
    expect(finnhubApiClient.quote.mock.calls).toHaveLength(1);
})