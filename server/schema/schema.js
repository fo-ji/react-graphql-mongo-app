const graphql = require('graphql')
const Movie = require('../models/movie')

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema } = graphql

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    // 取得したいデータとその型
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
})

// 外部からデータを取得する為に定義
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLString } },
      resolve(parents, args) {
        return Movie.findById(args.id)
      }, // argsで受け取った値を利用してDBからデータを取得する
    },
  },
})

module.exports = new GraphQLSchema({
  query: RootQuery,
})
