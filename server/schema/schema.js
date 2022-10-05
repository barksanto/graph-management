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
  GraphQLNonNull,
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

// @ Mutations - add, update, delete
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {  // @ this is where we actually add the client to the db
        // # we pass in args/ key values these will come from front end 
        let client = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone
        })
        return client.save() // take client we created and saveit to the db
      }
    },
  },
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
})
