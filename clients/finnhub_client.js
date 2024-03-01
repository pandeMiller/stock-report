const finnhubApiClient = require('./finnhub')
function FinnHubClient() {
      let count = 0 ;
      this.getStockDetails = function(symbol,io_client_emit_func) {
              finnhubApiClient.quote(symbol, (error, data, response) => {
                  count = count + 1;
                  console.log(count)
                  io_client_emit_func(symbol,data)
                });
          }
  }
module.exports = new FinnHubClient()