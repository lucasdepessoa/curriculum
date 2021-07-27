const routes = require('express').Router()
const resumeController = require('./controllers/resumeController')

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

module.exports = routes