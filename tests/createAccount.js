const expect = require('chai').expect
const TESTING_URL = 'http://localhost:9020/api/v1/account/';
const request = require('request');


describe('Create Account API', () =>{
    describe('Create User', () =>{
        describe('Create user invalid email Error', ()=>{
            describe('Create user with null field error', ()=>{
                const payload = {
                    firstName: null,
                    lastName: "James",
                    email: "james@com",
                    password: "1234"
                }

                it('Message', done=>{
                    request.post(`${TESTING_URL}/create-account`,{
                        json: payload
                    }, (_,response)=>{
                        expect(response.message);
                        done();
                    })
                })
                it('Message', done=>{
                    request.post(`${TESTING_URL}/create-account`,{
                        json: payload
                    }, (_,response)=>{
                        expect(response.message);
                        done();
                    })
                })
            })
        })
    })
})