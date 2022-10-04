const mongoose = require("mongoose")
// This mongoose layer is to create the schema that included the fields for the db collections
const ProjectSchema = mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Not Started", "In Progress", "Completed"], // limit what we want to use
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId, // when wecreate a new Record in collection, it always gets assigned an ID (created automatically)
    ref: "Client", // this client id should pertain to ClientID of Client model
  },
})

module.exports = mongoose.model("Project", ProjectSchema)
