const {expect} = require('chai')
const supertest = require('supertest')
const app = require('../app')

describe('app endpoint', ()=>{
    it('Returns a JSON array of apps',()=>{
        return supertest(app)
            .get('/app')
            .expect(200)
    })
})

describe('GET /sort', ()=>{
    it('Return 400 if no query parameter set',()=>{
        return supertest(app)
            .get('/app')
            .query({sort: null})
            .expect(400, 'Sort must be defined as one of rating or app')
    })
})