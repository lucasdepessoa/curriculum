const routes = require('express').Router()
const resumeController = require('./controllers/resumeController')

//Main route//
routes.get('/', resumeController.getMain)

//Contact Information//
routes.get('/contact-info', resumeController.getContact)

//Academic Information//
routes.get('/academic-info', resumeController.getAcademic)

//Experience Information//
routes.get('/experience-info', resumeController.getExperience)

//Skills Information//
routes.get('/skills-info', resumeController.getSkills)

//Qualifications Information//
routes.get('/qualifications-info', resumeController.getQualifications)

//Post route for send email//
routes.post('/', resumeController.sendMail)

module.exports = routes