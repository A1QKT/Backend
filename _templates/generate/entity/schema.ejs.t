---
to <%= h.dir(name) %> / <%= h.name(name, true) %>.schema.ts
---
import { gql } from "apollo-server-express";

export default gql`
    extend type Query{
        getAll<%= h.name(name) %>s(query: QueryInput): <%= h.name(name)%>Pagination
        getOne<%= h.name(name) %>(id: String!): <%= h.name(name)%>
    }
    extend type Mutation{
        create<%= h.name(name)%>(data: Create<%= h.name(name)%>Input!): <%= h.name(name)%>
        update<%= h.name(name)%>(id: String!, data: Update<%= h.name(name)%>Input): <%= h.name(name)%>
        delete<%= h.name(name)%>(id: String!): <%= h.name(name)%> 
    }
    type <%= h.name(name)%> {
        id: String!
        createdAt: DateTime
        updatedAt: DateTime
    }
    type <%= h.name(name)%>Pagination{
        <%= h.name(name)%>s: [<%= h.name(name)%>],
        pagination: Pagination
    }
    input Create<%= h.name(name)%>Input{
    }
    input Update<%= h.name(name)%>Input{
    }
`