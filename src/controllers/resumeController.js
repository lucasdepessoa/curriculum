const data = require('../models/resumeAccess')
const moment = require('moment')

class resumeController {

  getMain(req, res){

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
        birth: now.diff(data.getContactInfo().birthDate,'years'),
        skillsLength: Math.ceil(data.getSkillsInfo().skills.length / 2)
      }
      
    })
  }

  getContact(req, res){

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

  getAcademic(req, res){

    //Bring me the data//
    let academic = data.getAcademicInfo()

    //message start//
    let message = 
    `<dl style="list-style-type:none;">
    <dt>FORMAÇÃO</dt>`

    //scroll through the array/object to build a message//
    for(let i=0; i<academic.length; i++){
      message += `<dd>${academic[i].school}, ${academic[i].adressSchool} - ${academic[i].status} em ${academic[i].name} - ${academic[i].dateEnd}</dd>`  
    }

    //message end//
    message += '</dl>'


    //send status 200 and message//
    res.status(200).send(message)
  }

  getExperience(req, res){

    //bring me data of job experience//
    const experience = data.getExperienceInfo()

    //message start//
    let message = 
    `<dl style="list-style-type:none">
      <dt>EXPERIÊNCIA PROFISSIONAL</dt>
    `
    //build a message with arrray/object/array//
    for(let i=0; i<experience.length; i++){
      message += `<dd> ${experience[i].company.toUpperCase()}, ${experience[i].companyAdress} - ${experience[i].office} DESDE ${experience[i].dateStart} </dd>`
      
      //scroll through the array of tasks//
      for(let j=0; j<experience[i].jobDescription.length; j++){
        message += `<dd> ${experience[i].jobDescription[j]} </dd>`
      }
    }
    
    //message end//
    message += `</dl>`
  
    //send status and a message//
    res.status(200).send(message)
  }

  getSkills(req, res){

    //bring me data//
    const skills = data.getSkillsInfo()

    //message start//
    let message = `<dl style="list-style-type:none">
    <dt>HABILIDADES</dt>`


    //scroll through the array to build the message"
    for(let i=0; i<skills.length; i++){
      message += `<dd>${skills[i]}</dd>`
    }

    //message end//
    message += '</dl>'

    res.status(200).send(message)
  }

  getQualifications(req, res){
    
    //bring me data//
    const qualification = data.getQualificationsInfo()

    //message start//
    let message = `<dl style="list-style-type:none">
    <dt>QUALIFICAÇÕES TÉCNICAS</dt>`

    qualification.forEach((element,index,arr) => {
      message += `<dd> ${element} </dd>` 
    });
    
    //message end//
    message += '</dl>'

    //send status and a message//
    res.status(200).send(message)
  }
}

module.exports = new resumeController()