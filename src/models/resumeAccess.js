const contact = require('../database/contact-info')
const academic = require('../database/academic-info')
const experience = require('../database/experience-info')
const skills = require('../database/skills-info')
const qualifications = require('../database/qualifications-info')


class AccessResume {

  getContactInfo(){
    return contact
  }

  getAcademicInfo(){
    return academic
  }

  getExperienceInfo(){
    return experience
  }

  getSkillsInfo(){
    return skills
  }

  getQualificationsInfo(){
    return qualifications
  }
}

module.exports = new AccessResume()