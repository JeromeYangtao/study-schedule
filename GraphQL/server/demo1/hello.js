var {graphql, buildSchema} = require('graphql')

var schema = buildSchema(`
  type Query {
    hello: String,
    test:String
  }
`)

var root = {
  hello: () => 'Hello world!',
  test: () => {
    return '测试'
  }
}

graphql(schema, '{ test,hello }', root).then((response) => {
  console.log(response)
})