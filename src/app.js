const express = require('express')

class AppControll {
  constructor(){
    this.express = express()

    this.middlewares()
    this.routes()
  }

  middlewares(){
    this.express.use(express.json())
    this.express.set('view engine','ejs')
    this.express.set('views',__dirname + '/views')
  }

  routes(){
    this.express.use(require('./routes'))
  }
}

module.exports = new AppControll().express