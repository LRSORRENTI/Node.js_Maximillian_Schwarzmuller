const chai = require('chai')

const expect = chai.expect;

const authMiddleware = require('../middleware/is-auth.js');


// We'll unit test this specific code from the is-auth.js
// middleware file: 


// module.exports = (req, res, next) => {
//     const authHeader = req.get('Authorization');
//     if (!authHeader) {
//       const error = new Error('Not authenticated.');
//       error.statusCode = 401;
//       throw error;
//     }

describe('Auth middleware', function(){

    it('should throw error if no auth middleware is present', function(){
        const req = {
            get: function() {
                return null;
            }
        }
        expect(authMiddleware.bind(this, req, {}, () => {})).to.throw('Not authenticated.');
    });
    
    it('Should throw err if auth header is single string', function(){
        const req = {
            get: function() {
                return 'xyz';
            }
        }
        expect(authMiddleware.bind(this, req, {}, () => {})).to.throw()
    });

})
