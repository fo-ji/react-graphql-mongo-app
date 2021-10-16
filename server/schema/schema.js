const graphql = require('graphql')
const Movie = require('../models/movie')
const Director = require('../models/director')

const {
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} = graphql

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    // 取得したいデータとその型
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
})

const DirectorType = new GraphQLObjectType({
  name: 'Director',
  fields: () => ({
    // 取得したいデータとその型
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
})

// 外部からデータを取得する為に定義
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parents, args) {
        return Movie.findById(args.id)
      }, // argsで受け取った値を利用してDBからデータを取得する
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parents, args) {
        return Director.findById(args.id)
      },
    },
  },
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addMovie: {
      type: MovieType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
      },
      resolve(parent, args) {
        let movie = new Movie({
          name: args.name,
          genre: args.genre,
        })

        return movie.save()
      },
    },
    addDirector: {
      type: DirectorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parent, args) {
        let director = new Director({
          name: args.name,
          age: args.age,
        })

        return director.save()
      },
    },
  },
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
})
