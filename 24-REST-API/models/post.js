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
        // type: Object,
        // the type field was a placeholder,
        // what we need is:
        type: Schema.Types.ObjectId,
        // Then we pass in a reference 
        ref: 'User',
        required: true
        // now with the above we'll store the creator 
        // of a post in every created post 
         }
    },
  {timestamps: true}
);

// Remember we don't export the schema directly, 
// but a model, a model based on the schema 
module.exports = mongoose.model('Post', postSchema)
// We pass in posts, which creates a Posts database 
// then we add the postSchema as the second arg

