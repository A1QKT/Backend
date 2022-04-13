import { gql } from "apollo-server-express";

export default gql`
    extend type Query{
        getAllUsers(query: QueryInput): UserPagination
        getOneUser(id: String!): User
    }
    extend type Mutation{
        createUser(data: CreateUserInput!): User
        updateUser(id: String!, data: UpdateUserInput): User
        deleteUser(id: String!): User 
    }
    type User {
        id: String!
        createdAt: DateTime
        updatedAt: DateTime
        username: String
        name: String
        phone: String
        password: String
        "ADMIN, USER"
        role: String
    }
    type UserPagination{
        users: [User],
        pagination: Pagination
    }
    input CreateUserInput{
        username: String!
        name: String!
        password: String!
        phone: String
        email: String!
        role: String!
    }
    input UpdateUserInput{
        name: String 
        phone: String 
        email: String
    }
`