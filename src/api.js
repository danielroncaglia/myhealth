const create = (data) => {
  return fetch('/.netlify/functions/records-create', {
    body: JSON.stringify(data),
    method: 'POST'
  }).then(response => {
    return response.json()
  })
}

const readAll = (data) => {
  return fetch('/.netlify/functions/records-read-all').then((response) => {
    return response.json()
  })
}

export default {
  create: create,
  readAll: readAll,
}