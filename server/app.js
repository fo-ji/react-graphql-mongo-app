const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const mongoose = require('mongoose')
const schema = require('./schema/schema')
const app = express()

require('dotenv').config()
const env = process.env

mongoose.connect(env.MONGO_DB_URL)
mongoose.connection.once('open', () => {
  console.log('db connected')
})

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
)
app.listen(4000, () => {
  console.log('listening port 4000')
})
