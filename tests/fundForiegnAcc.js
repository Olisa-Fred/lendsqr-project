const expect = require('chai').expect
const TESTING_URL = 'http://localhost:9020/api/v1/account/';
const request = require('request');


describe('Fund Foreign Account API', () =>{
    describe('Fund foreign account with null field error', ()=>{
        const payload = {
            accoutNumber: 63992788,
            amount: null,
        }

        it('Message', done=>{
            request.post(`${TESTING_URL}/credit-foreign-account`,{
                json: payload
            }, (_,response)=>{
                expect(response.message);
                done();
            })
        })
        
    }) 
    describe('Fund foreign account passing in a string error', ()=>{
        const payload = {
            accoutNumber: 63992788,
            amount: "200",
        }

        it('Message', done=>{
            request.post(`${TESTING_URL}/credit-foreign-account`,{
                json: payload
            }, (_,response)=>{
                expect(response.message);
                done();
            })
        })
        
    }) 
    describe('Fund foreign account passing in a wrong account number error', ()=>{
        const payload = {
            accoutNumber: 10992788,
            amount: "200",
        }

        it('Message', done=>{
            request.post(`${TESTING_URL}/credit-foreign-account`,{
                json: payload
            }, (_,response)=>{
                expect(response.message);
                done();
            })
        })
        
    })
})