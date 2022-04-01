const expect = require('chai').expect
const TESTING_URL = 'http://localhost:9020/api/v1/account/';
const request = require('request');


describe('Withdraw Account API', () =>{
    describe('Withdraw fund with null field error', ()=>{
        const payload = {
            amount: null,
        }

        it('Message', done=>{
            request.post(`${TESTING_URL}/debit-account`,{
                json: payload
            }, (_,response)=>{
                expect(response.message);
                done();
            })
        })
        
    }) 
    describe('Withdraw fund passing in a string error', ()=>{
        const payload = {
            amount: "200",
        }

        it('Message', done=>{
            request.post(`${TESTING_URL}/debit-account`,{
                json: payload
            }, (_,response)=>{
                expect(response.message);
                done();
            })
        })
        
    }) 
})