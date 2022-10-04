// Mongoose models
const Project = require("../models/Project")
const Client = require("../models/Client")

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  graphqlSync,
} = require("graphql")

// Client Type
const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
})

// Project type
const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        // return clients.find((client) => client.id === parent.clientId)
        return Client.findById(parent.clientId)
      },
    },
  }),
})

// Root query object
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return Project.findById()
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } }, // we pass in id we want for this client
      resolve(parent, args) {
        // return projects.find((project) => project.id === args.id) // @ find the project with the id that matches the id we passed in
        return Project.findById(args.id)
      },
    },
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        // return clients
        return Client.find()
      },
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } }, // we pass in id we want for this client
      resolve(parent, args) {
        // return clients.find((client) => client.id === args.id) // @ find the client with the id that matches the id we passed in
        return Client.findById(args.id)
      },
    },
  },
})

module.exports = new GraphQLSchema({
  query: RootQuery,
})
