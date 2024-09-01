const request = require('supertest')
const chai = require('chai')
const chaiJsonSchema = require('chai-json-schema')
const { expect } = chai

chai.use(chaiJsonSchema)
//---------------------------------------------------------// schema
const GetSchema = require('./schema/GETschema.js')
const PostSchema = require('./schema/POSTschema.js')
const PutSchema = require('./schema/PUTschema.js')
//---------------------------------------------------------// baseurl
const { BASE_URL } = require('../baseurl.js')
//---------------------------------------------------------// test case

describe('API Test', () => {
    it('Test case 1 Get Request', async () => {
        const response = await request(BASE_URL)
            .get('/api/users?page=2')
        // console.log(response.statusCode)
        // console.log(response.body)
        //------------------------------------------------// assert 
        expect(response.statusCode).to.equal(200)
        expect(response.body.data[0].first_name).to.equal('Michael')
        expect(response.body).to.be.jsonSchema(GetSchema)
    })
    it('Test case 2 Post Request', async () => {
        const bodyPOST = {
            "name": "morpheus",
            "job": "zion resident"
        }
        const response = await request(BASE_URL)
            .post('/api/users')
            .send(bodyPOST)
        //------------------------------------------------// assert
        expect(response.statusCode).to.equal(201)
        expect(response.body.name).to.equal('morpheus')
        expect(response.body).to.be.jsonSchema(PostSchema)
    })
    it('Test case 3 Put Request', async () => {
        const bodyPUT = {
            "name": "morpheus",
            "job": "zion resident"
        }
        const response = await request(BASE_URL)
            .put('/api/users/2')
            .send(bodyPUT)
        //------------------------------------------------// assert
        expect(response.statusCode).to.equal(200)
        expect(response.body.name).to.equal('morpheus')
        expect(response.body).to.be.jsonSchema(PutSchema)
    })
    it('Test case 4 Delete Request', async () => {
        const response = await request(BASE_URL)
            .delete('/api/users/2')
        //------------------------------------------------// assert
        expect(response.statusCode).to.equal(204)
    })
})