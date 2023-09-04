// The resolver is an exported object where we 
// need a hello method from our schema.js definition
const bcrypt = require('bcryptjs')
const validator = require('validator')

const User = require('../models/user')

module.exports = {
    // createUser(args, req){
        
    //      const email = args.userInput.email;
    // }

    // Above is one way to get the data from the schema: 
    // schema.js:
    // type RootMutation {
    //     createUser(userInput: UserInputData): User!
    //  }

    // We can also use object destructuing: 

    createUser: async function({ userInput }, req ){
      // Add validation logic:
      const errors = [];
      if(!validator.default.isEmail(userInput.email)){
        // so if the user input email is not an email 
        // address
        errors.push({message: 'Email invalid!'})
      }
      if(validator.default.isEmpty(userInput.password) || 
      !validator.default.isLength(userInput.password, {min: 5})){
            errors.push({message: 'Password too short!' })    
       }
      // Now that above we have all these if checks, 
      // we check to see if the erorrs array has a lentgth 
      // greater than zero, then  we know we've got 
      // some problems :

      if(errors.length > 0){
        const error = new Error('Invalid Input');
        throw error;
      }
        // const email = userInput.email
        const existingUser = await User.findOne({email: userInput.email})
        if(existingUser){
            // if a user exists, then we know we don't create 
            // a new one 
            const error = new Error('User already exists')
            throw error;
        }
        const hashedPw = await bcrypt.hash(userInput.password, 12)
        // we use bcrypt to hash the password
        const user = new User({
            email: userInput.email,
            name: userInput.name,
            password: hashedPw
        });
        const createdUser = await user.save()
        // the above will return the newly created user object 
        // We also need to return some data, and we 
        // use the data we defined in the schema.js file 

        // we return our createdUser with the spread 
        // operator but also the ._doc, this _doc is 
        // so we only get the data we want otherwise 
        // it'll contain lots of meta data 
        return {...createdUser._doc, _id: createdUser._id.toString()}
    }

};