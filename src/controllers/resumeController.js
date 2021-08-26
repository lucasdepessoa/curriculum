const data = require('../models/resumeAccess')
const moment = require('moment')
const nodeMailer = require('nodemailer')
const smtp_config = require('../config/smtp')

class resumeController {

  getMain(req, res) {

    //Get actual date//
    let now = new moment()

    res.render(
      'index',
      {
        contact: data.getContactInfo(),
        academic: data.getAcademicInfo(),
        experience: data.getExperienceInfo(),
        skills: data.getSkillsInfo(),
        qualifications: data.getQualificationsInfo(),
        /*
          customOptions : Opções customizadas pensadas especificamente para esse ponto,
          são alguns valores que dependem de calculos, que é preferível que sejam feitos
          no back end.
        */
        customOptions: {
          birth: now.diff(data.getContactInfo().birthDate, 'years'),
          hardSkillsLength: Math.ceil(data.getSkillsInfo().hardSkills.length / 2),
          softSkillsLength: Math.ceil(data.getSkillsInfo().softSkills.length / 2),
          frameworksLength: Math.ceil(data.getSkillsInfo().frameworks.length / 2),
          qualiLentgh: Math.ceil(data.getQualificationsInfo().length / 2)
        }
      })
  }

  getContact(req, res) {

    res.status(200).json(data.getContactInfo())

  }

  getAcademic(req, res) {

   res.status(200).json(data.getAcademicInfo())

  }

  getExperience(req, res) {

    res.status(200).json(data.getExperienceInfo())

  }

  getSkills(req, res) {

    res.status(200).json(data.getSkillsInfo())

  }

  getQualifications(req, res) {

    res.status(200).json(data.getQualificationsInfo())

  }

  async sendMail(req, res) {

    //Configuration for email transporter//
    const transporter = nodeMailer.createTransport({
      host: smtp_config.host,
      port: smtp_config.port,
      secure: false,
      auth: {
        user: smtp_config.user,
        pass: smtp_config.pass
      },
      tls: { rejectUnauthorized: false }
    })
    
    //Sending an email//
    await transporter.sendMail({
      text: `Hello i'am ${req.body.name} and i mail e-mail is ${req.body.email}, i would like to say:\n ${req.body.message}`,
      from: req.body.email,
      to:process.env.SMTP_USER,
      subject: 'New Contact from My Resume'
    }, (error, info) => {
      if (error) {
     
        let message = {
          "type": 'danger',
          "intro": 'Error: ',
          "message": `e-mail not sent ${error.code}`
        }

        res.status(502).json(message)

      } else {

        let message = {
          "type": 'success',
          "intro": 'Success: ',
          "message": 'e-mail sended succefully'
        }

        res.status(201).json(message)

      }
    })

  }
}

module.exports = new resumeController()