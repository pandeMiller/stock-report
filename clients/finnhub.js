const finnhub = require('finnhub')
const FINHUB_KEY_VAR = 'api_key'

function FinnHubApiClient() {
  console.log(finnhub)
  let api_key = finnhub.ApiClient.instance.authentications[FINHUB_KEY_VAR]
    api_key.apiKey = process.env.FINHUB_API_KEY
    return new finnhub.DefaultApi()
}
module.exports = new FinnHubApiClient()
