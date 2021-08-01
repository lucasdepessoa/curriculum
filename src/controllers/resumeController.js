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
          frameworksLength: Math.ceil(data.getSkillsInfo().frameworks.length / 2)
        }

      })
  }

  getContact(req, res) {

    //Bring me the data//
    let contact = data.getContactInfo()

    //build a message//
    let message =
      `
    <dl style="list-style-type:none;">
    <dt>INFORMAÇÕES DE CONTATO</dt>
    <dd>Endereço: ${contact.address}, ${contact.number} - ${contact.district}</dd>
    <dd>Cidade: ${contact.city}, ${contact.state}, ${contact.cep}</dd>
    <dd>Celular: ${contact.whatsApp} (WhatsApp)</dd>
    <dd>E-mail: ${contact.email}</dd>
    </dl>
    `

    //send status 200 and message//
    res.status(200).send(message)
  }

  getAcademic(req, res) {

    //Bring me the data//
    let academic = data.getAcademicInfo()

    //message start//
    let message =
      `<dl style="list-style-type:none;">
    <dt>FORMAÇÃO</dt>`

    //scroll through the array/object to build a message//
    for (let i = 0; i < academic.length; i++) {
      message += `<dd>${academic[i].school}, ${academic[i].adressSchool} - ${academic[i].status} em ${academic[i].name} - ${academic[i].dateEnd}</dd>`
    }

    //message end//
    message += '</dl>'


    //send status 200 and message//
    res.status(200).send(message)
  }

  getExperience(req, res) {

    //bring me data of job experience//
    const experience = data.getExperienceInfo()

    //message start//
    let message =
      `<dl style="list-style-type:none">
      <dt>EXPERIÊNCIA PROFISSIONAL</dt>
    `
    //build a message with arrray/object/array//
    for (let i = 0; i < experience.length; i++) {
      message += `<dd> ${experience[i].company.toUpperCase()}, ${experience[i].companyAdress} - ${experience[i].office} DESDE ${experience[i].dateStart} </dd>`

      //scroll through the array of tasks//
      for (let j = 0; j < experience[i].jobDescription.length; j++) {
        message += `<dd> ${experience[i].jobDescription[j]} </dd>`
      }
    }

    //message end//
    message += `</dl>`

    //send status and a message//
    res.status(200).send(message)
  }

  getSkills(req, res) {

    //bring me data//
    const skills = data.getSkillsInfo()

    //message start//
    let message = `<dl style="list-style-type:none">
    <dt>HABILIDADES</dt>`


    //scroll through the array to build the message"
    for (let i = 0; i < skills.length; i++) {
      message += `<dd>${skills[i]}</dd>`
    }

    //message end//
    message += '</dl>'

    res.status(200).send(message)
  }

  getQualifications(req, res) {

    //bring me data//
    const qualification = data.getQualificationsInfo()

    //message start//
    let message = `<dl style="list-style-type:none">
    <dt>QUALIFICAÇÕES TÉCNICAS</dt>`

    qualification.forEach((element, index, arr) => {
      message += `<dd> ${element} </dd>`
    });

    //message end//
    message += '</dl>'

    //send status and a message//
    res.status(200).send(message)
  }

  sendMail(req, res) {

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
    transporter.sendMail({
      text: `Hello i'am ${req.body.name} and i would like to say:\n ${req.body.message}`,
      from: req.body.email,
      to: [process.env.SMTP_USER, 'ananda.anm@gmail.com'],
      subject: 'New Contact from My Resume'
    }, (error, info) => {
      if (error) {
        console.log(error)
      } else {
        console.log(info)
      }
    })

    res.status(200).send()
  }
}

module.exports = new resumeController()