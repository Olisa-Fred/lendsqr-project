const expect = require('chai').expect
const TESTING_URL = 'http://localhost:9020/api/v1/account/';
const request = require('request');


describe('Fund Account API', () =>{
    describe('Credit fund with null field error', ()=>{
        const payload = {
            amount: null,
        }

        it('Message', done=>{
            request.post(`${TESTING_URL}/credit-account`,{
                json: payload
            }, (_,response)=>{
                expect(response.message);
                done();
            })
        })
        
    }) 
    describe('Credit fund passing in a string error', ()=>{
        const payload = {
            amount: "200",
        }

        it('Message', done=>{
            request.post(`${TESTING_URL}/credit-account`,{
                json: payload
            }, (_,response)=>{
                expect(response.message);
                done();
            })
        })
        
    }) 
})