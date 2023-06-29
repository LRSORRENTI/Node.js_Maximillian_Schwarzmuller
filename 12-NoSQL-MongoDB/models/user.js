// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

// const User = sequelize.define('user', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   name: Sequelize.STRING,
//   email: Sequelize.STRING
// });

const mongodb = require('mongodb');

const getDb = require('../util/database').getDb;

const ObjectId = mongodb.ObjectId;

class User {
  constructor(username, email){
    this.name = username;
    this.email = email;
  }
  save(){
    const db = getDb();
      return db.collection('users').insertOne(this);
    // .then()
    // .catch(err => console.log(err))
  }
  static findById(userId){
    const db = getDb();
     return db.collection('users')
              .findOne({_id: new ObjectId(userId)})
              // .then(user => {
              //   console.log(user)
              //   return user
              // })
              //   .catch(err => console.log(err))
          
    }
}

module.exports = User;
