const graphql = require("graphql");
const { db } = require("../pgAdaptor");


const {
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema, 
    GraphQLID, 
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;


const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: {type: GraphQLID},
        email: {type: GraphQLString},
        gender: {type: GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: {email: {type: GraphQLString}},
            resolve(parent, args){
                const query = `SELECT * FROM "user" where email = $1`;
                let values = [
                    args.email
                ]
                console.log(args.email);
                return db
                .one(query, values)
                .then(res => res)
                .catch(err => err);
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args){
                const query = `SELECT * FROM "user" `;
                
                return db
                .one(query)
                .then(res => console.log("res", res))
                .catch(err => console.log(err));
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addUser: {
            type: UserType,
            args: {
                email: {type: new GraphQLNonNull(GraphQLString)},
                password: {type: new GraphQLNonNull(GraphQLString)},
                gender: {type: new GraphQLNonNull(GraphQLString)},
                country: {type: new GraphQLNonNull(GraphQLString)},
                state: {type: new GraphQLNonNull(GraphQLString)},
                city: {type: new GraphQLNonNull(GraphQLString)},
                skills: {type: new GraphQLNonNull(GraphQLString)},
                contactNumber: {type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(parent, args){
                console.log(args);
                const query = `INSERT INTO "user" (email, password, gender, country, state, city, skills, phone) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING email`;
                let values = [
                    args.email,
                    args.password,
                    args.gender,
                    args.country,
                    args.state,
                    args.city,
                    args.skills,
                    args.contactNumber
                ]
                return db
                .one(query, values)
                .then(res => res)
                .catch(err => err);
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});