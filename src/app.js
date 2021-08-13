const express = require('express')
const session = require('express-session')

class AppControll {
  constructor() {
    this.express = express()

    this.middlewares()
    this.routes()
  }

  middlewares() {
   
    //Enable connect-flash and express-session//
    this.express.use(session({
      secret:'secret',
      cookie: {maxAge: 60000},
      resave: false,
      saveUninitialized: false
    }))
    this.express.use((req,res,next)=>{
      res.locals.message = req.session.message
      delete req.session.message
      next()
    })
    //Enable read JSON///
    this.express.use(express.json())  
    //Enable urlencoded translation//
    this.express.use(express.urlencoded({extended:true}))
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