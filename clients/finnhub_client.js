const finnhubApiClient = require('./finnhub')
function FinnHubClient() {
    //  let api_key = finnhub.ApiClient.instance.authentications[FINHUB_KEY_VAR];
    //   api_key.apiKey = process.env.FINHUB_API_KEY
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