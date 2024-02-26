const finnhub = require('finnhub');

function FinnHubClient() {
   let api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = "cnadcrhr01qg60jaeol0cnadcrhr01qg60jaeolg";
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