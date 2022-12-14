const express = require("express")
require("dotenv").config()
const colors = require("colors")
const { graphqlHTTP } = require("express-graphql")
const schema = require("../server/schema/schema")
const connectDB = require("./config/db")
const { connect } = require("mongoose")
const port = process.env.PORT || 5500
const cors = require("cors")

const app = express()
app.use(cors())

// connect to database
connectDB()

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
)

app.listen(port, console.log(`Server running on ${port}`))
