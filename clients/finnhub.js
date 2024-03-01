const finnhub = require('finnhub')
const lodash =  require('lodash')
const FINHUB_KEY_VAR = 'api_key'
const FINHUB_API_KEY = process.env.FINHUB_API_KEY

if(lodash.isEmpty(FINHUB_API_KEY)){
  throw "FINHUB API key is missing!"
}

function FinnHubApiClient() {
  let api_key = finnhub.ApiClient.instance.authentications[FINHUB_KEY_VAR]
    api_key.apiKey = FINHUB_API_KEY
    return new finnhub.DefaultApi()
}
module.exports = new FinnHubApiClient()
