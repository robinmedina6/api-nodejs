const create = (req, res) => {
  res.send('create')
}

const deleteById = (req, res) => {
  res.send('deleteById')
}

const getAll = (req, res) => {
  res.send('getAll')
}

const getById = (req, res) => {
  res.send('getById')
}

const update = (req, res) => {
  res.send('update')
}

module.exports = {
  create,
  deleteById,
  getAll,
  getById,
  update
}
