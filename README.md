# GraphQL + IEX Cloud

## What is this?

This is an Apollo GraphQL server that can be used to fetch financial data from IEX Cloud. It is built on top of IEX Cloud's REST API, and allows you to combine data from multiple REST endpoints with one query. Also, you can limit the fields returned for each query to that which is only needed by the client. It is deployed using [Now 2.0](https://zeit.co/blog/now-2).

Here is an example query for getting data on `AMZN` from a variety of IEX Cloud API endpoints:

```
query {
  security(ticker: "AMZN") {
    symbol
    volume
    lastSalePrice
    estimates {
      consensusEPS
      numberOfEstimates
    }
    earnings {
      actualEPS
      EPSReportDate
    }
  }
}
```

[Data provided by IEX Cloud](https://iexcloud.io)