const routes = require('express').Router()
const resumeController = require('./controllers/resumeController')

//Contact Information//
routes.get('/contact-info',resumeController.getContact)

//Academic Information//
routes.get('/academic-info',resumeController.getAcademic)

module.exports = routes