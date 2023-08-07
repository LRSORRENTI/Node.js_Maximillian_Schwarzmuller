const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String, 
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    content: {
        type: String, 
        required: true
    },
    creator: {
        type: Object,
        required: true
         }
    },
  {timestamps: true}
);

// Remember we don't export the schema directly, 
// but a model, a model based on the schema 
module.exports = mongoose.model('post', postSchema)
// We pass in posts, which creates a Posts database 
// then we add the postSchema as the second arg

