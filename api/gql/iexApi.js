const { RESTDataSource } = require('apollo-datasource-rest')

class IexApi extends RESTDataSource {
  constructor() {
    super()
  }

  willSendRequest(request) {
    request.params.set('token', process.env.IEX_PUBLIC)
  }

  get baseURL() {
    return `https://cloud.iexapis.com/stable/`
  }

  async getEstimates(symbol) {
    return this.get(
      `stock/${symbol}/estimates`,
    )
  }

  async getEarnings(symbol) {
    return this.get(
      `stock/${symbol}/earnings/4`
    )
  }

  async getTops(symbol) {
    return this.get(`tops?symbols=${symbol}`)
  }
}

module.exports = IexApi