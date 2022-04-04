import {gql} from 'apollo-server-express';

export default gql`
    extend type Query{
        getAllProvinces: [Province]
        getAllDistricts: [District]
        getAllWards: [Ward]
        getOneProvince(id: String!): Province
        getOneDistrict(id: String!): District
        getOneWard(id: String!): Ward
    }
    type Province{
        id: String,
        name: String,
        view: Int
    }
    type District{
        id: String,
        name: String
    }
    type Ward{
        id: String,
        name: String
    }
`