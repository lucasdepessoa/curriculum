const express = require('express')

class AppControll {
  constructor() {
    this.express = express()

    this.middlewares()
    this.routes()
  }

  middlewares() {
    //Enable read JSON///
    this.express.use(express.json())  
    //Enable ejs view engine//
    this.express.set('view engine', 'ejs')
    //Set /views as deafult folder for views//
    this.express.set('views', __dirname + '/views')
    //Enable /assets as static path for static files on /assets//
    this.express.use('/assets', express.static(__dirname + '/assets'))
  }

  routes() {
    this.express.use(require('./routes'))
  }
}

module.exports = new AppControll().express