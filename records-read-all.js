const faunadb = require('faunadb')
const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.SECRET
})
exports.handler = () => {
  return client.query(q.Paginate(q.Match(q.Ref('indexes/all_records'))))
    .then((response) => {
      const todoRefs = response.data
      const getAllTodoDataQuery = todoRefs.map((ref) => {
        return q.Get(ref)
      })
      return client.query(getAllTodoDataQuery).then((ret) => {
        return {
          statusCode: 200,
          body: JSON.stringify(ret)
        }
      })
    })
}