const finnhub = require('finnhub');

const FINHUB_KEY_VAR = 'api_key'
function FinnHubClient() {
   let api_key = finnhub.ApiClient.instance.authentications[FINHUB_KEY_VAR];
    api_key.apiKey = process.env.FINHUB_API_KEY
    const finnhubClient = new finnhub.DefaultApi()
    let count = 0 ;
    this.getStockDetails = function(symbol,io_client_emit_func) {
            finnhubClient.quote(symbol, (error, data, response) => {
                count = count + 1;
                console.log(count)
                io_client_emit_func(symbol,data)
              });
        }
}

module.exports = new FinnHubClient();