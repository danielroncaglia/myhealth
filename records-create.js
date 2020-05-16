const faunadb = require('faunadb')
const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.SECRET
})
exports.handler = async(event) => {
  const data = JSON.parse(event.body)
  const Item = {
    data: data
  }
  return client.query(q.Create(q.Collection('records'), Item))
    .then((response) => {
      return {
        statusCode: 200,
        body: JSON.stringify(response)
      }
    })
}