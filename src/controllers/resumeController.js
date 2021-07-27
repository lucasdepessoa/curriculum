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

    //build a message//
    let message = 
    `<dl style="list-style-type:none;">
    <dt>FORMAÇÃO</dt>`

    //build a message, cause here it is a array//
    for(let i=0; i<academic.length; i++){
      message += `<dd>${academic[i].school}, ${academic[i].adressSchool} - ${academic[i].status} em ${academic[i].name} - ${academic[i].dateEnd}</dd>`  
    }

    message += '</dl>'


    //send status 200 and message//
    res.status(200).send(message)
  }
}

module.exports = new resumeController()