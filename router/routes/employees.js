import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import graphql, { buildSchema } from 'graphql'
import { searchEmployeesByName, deleteEmployeeById } from '../../controllers/employees.js'

const employeesRouter = express.Router();

const dateValue = (value) => {
  if (value instanceof Date) {
    const day = value.getDay() + 1
    const month = value.getMonth() + 1
    const year = value.getFullYear()
    return `${year}/${month}/${day}`
  }
}

const DateType = new graphql.GraphQLScalarType({
  name: 'Date',
  serialize: dateValue,
  parseValue: dateValue,
  parseLiteral(ast) {
    return dateValue(ast.value);
  }
});

const deleteMessage = new graphql.GraphQLObjectType({
  name: 'delete',
  fields: () => ({
    message: { type: graphql.GraphQLString },
    deleteDate: { type: DateType }
  })
});

const employee = new graphql.GraphQLObjectType({
  name: 'employee',
  fields: () => ({
    id: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString },
    username: { type: graphql.GraphQLString },
    age: { type: graphql.GraphQLInt },
    title: { type: graphql.GraphQLString },
    hiredate: { type: DateType }
  })
});

const RolesEnum = new graphql.GraphQLEnumType({
    name: 'order',
    values: {
      asc: { value: 'ASC' },
      desc: { value: 'DESC' }
    }
})

const searchEmployee = async (_, { name, orderBy }) => {
  return searchEmployeesByName(name, orderBy)
}

const deleteEmployee = async (_, { id, name, orderBy }) => {
  const delete_message = await deleteEmployeeById(id)
  return searchEmployeesByName(name, orderBy)
}

const root = new graphql.GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    getEmployees: {
      type: new graphql.GraphQLList(employee),
      args: {
        name: { type: graphql.GraphQLString },
        orderBy: { type: RolesEnum }
      },
      resolve: searchEmployee
    },
    deleteEmployees: {
      type: new graphql.GraphQLList(employee),
      args: {
        id: { type: graphql.GraphQLString },
        name: { type: graphql.GraphQLString },
        orderBy: { type: RolesEnum }
      },
      resolve: deleteEmployee
    }
  })
})
const schema = new graphql.GraphQLSchema({ query: root, mutation: root });

employeesRouter.use('/search', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));

export default employeesRouter
