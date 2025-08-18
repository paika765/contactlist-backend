const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type User {
    id: Int!
    name: String!
    email: String!
  }

  type AuthPayload {
    user: User!
    token: String!
  }

  type Contact {
    id: Int!
    name: String!
    email: String!
    phone: String!
  }

  type Query {
    users: [User!]!
    contacts: [Contact!]!
    contact(id: Int!): Contact
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): AuthPayload
    loginUser(email: String!, password: String!): AuthPayload
    
    addContact(name: String!, email: String!, phone: String!): Contact!
    updateContact(id: Int!, name: String, email: String, phone: String): Contact!
    deleteContact(id: Int!): Boolean!
  }
`);

module.exports = schema;
