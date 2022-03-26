import {gql} from 'apollo-server-express';

export default gql`extend type Query{
    getAllProvinces: [Province],
    getDistricts(id: String!): [District]
    getWards(id: String!): [Ward]
},
    type Province{
        id: String,
        name: String
    },
    type District{
        id: String,
        name: String
    },
    type Ward{
        id: String,
        name: String
    },
`