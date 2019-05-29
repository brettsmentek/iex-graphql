const { ApolloServer, gql } = require('apollo-server-micro')
const IexApi = require('./iexApi')

// The GraphQL schema
const typeDefs = gql`
  type Security {
    lastSalePrice: Float
    volume: Int
    sector: String
    symbol: String!
    securityType: String
    bidPrice: Float
    bidSize: Int
    askPrice: Float
    lastUpdated: Int
    lastSaleSize: Int
    estimates: Estimate
    earnings: [Earnings]
  }

  type Estimate {
    consensusEPS: Float
    announceTime: String
    numberOfEstimates: Int
    reportDate: String
    fiscalPeriod: String
    fiscalEndDate: String
  }

  type Earnings {
    actualEPS: Float
    consensusEPS: Float
    announceTime: String
    numberOfEstimates: Int
    EPSSurpriseDollar: Float
    EPSReportDate: String
    fiscalPeriod: String
    fiscalEndDate: String
    yearAgo: Float
    yearAgoChangePercent: Float
  }

  type Query {
    security(ticker: String!): Security!
  }
`

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    security: async (_source, { ticker }, { dataSources }) => {
      return (await dataSources.iexApi.getTops(ticker))[0]
    },
  },
  Security: {
    estimates: async (parent, args, { dataSources }) => {
      return (await dataSources.iexApi.getEstimates(parent.symbol)).estimates[0]
    },
    earnings: async (parent, args, { dataSources }) => {
      return (await dataSources.iexApi.getEarnings(parent.symbol)).earnings
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      iexApi: new IexApi(),
    }
  },
  introspection: true,
  playground: true,
})

module.exports = server.createHandler({ path: '/api/gql' })