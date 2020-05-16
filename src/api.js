const create = (data) => {
  return fetch('/.netlify/records-create', {
    body: JSON.stringify(data),
    method: 'POST'
  }).then(response => {
    return response.json()
  })
}

const readAll = (data) => {
  return fetch('/.netlify/records-read-all').then((response) => {
    return response.json()
  })
}

export default {
  create: create,
  readAll: readAll,
}
