const routes = require('express').Router()


routes.get('/', (req, res) => {
  res.send('Ola mundo, résumé.')
})



module.exports = routes