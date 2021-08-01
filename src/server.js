const app = require('./app')
const env = require('dotenv')

env.config()

app.listen(process.env.PORT || 3000)