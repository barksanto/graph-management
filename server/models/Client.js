const mongoose = require("mongoose")
// This mongoose layer is to create the schema that included the fields for the db collections
const ClientSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
})

module.exports = mongoose.model("Client", ClientSchema)
