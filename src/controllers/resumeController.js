const data = require('../models/resumeAccess')

class resumeController {

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
}

module.exports = new resumeController()