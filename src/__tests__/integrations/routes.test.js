const request = require('supertest')
const app = require('../../app')

describe('GET routes without data input', () => {

  test('GET / should return all data froma all endpoints listed below in json format and render the view to the user', async () => {

    const response = await request(app)
      .get('/')
      .expect(200)

    expect(response.type).toEqual('text/html')
  })

  test('GET /contact-info should return all endpoint-related data in json format', async () => {

    const response = await request(app)
      .get('/contact-info')
      .expect(200)

    const json = JSON.parse(response.text)

    expect(json).toMatchObject(require('../../database/contact-info'))
  })

  test('GET /academic-info should return all endpoint-related data in json format', async () => {

    const response = await request(app)
      .get('/academic-info')
      .expect(200)

    const json = JSON.parse(response.text)

    expect(json).toMatchObject(require('../../database/academic-info'))
  })

  test('GET /experience-info should return all endpoint-related data in json format', async () => {

    const response = await request(app)
      .get('/experience-info')
      .expect(200)

    const json = JSON.parse(response.text)

    expect(json).toMatchObject(require('../../database/experience-info'))
  })

  test('GET /skills-info should return all endpoint-related data in json format', async () => {

    const response = await request(app)
      .get('/skills-info')
      .expect(200)

    const json = JSON.parse(response.text)

    expect(json).toMatchObject(require('../../database/skills-info'))
  })

  test('GET /qualifications-info should return all endpoint-related data in json format', async () => {

    const response = await request(app)
      .get('/qualifications-info')
      .expect(200)

    const json = JSON.parse(response.text)

    expect(json).toMatchObject(require('../../database/qualifications-info'))
  })
})

describe('POST routes with data input', () => {
  test('POST / should send an e-mail to lpessoadev and return a message to the user', async () => {
    const response = await request(app)
      .post('/')
      .send({
        name: 'Lucas Fernandes Pessoa',
        email: 'lucasdepessoa@gmail.com',
        message: 'Testing with Jest haha.'
      })
      .expect(201)

    expect(response.statusCode).toBe(201)
  })
})