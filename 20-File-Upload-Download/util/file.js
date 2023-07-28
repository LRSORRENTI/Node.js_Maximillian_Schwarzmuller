const fs = require('fs');

// we'll add this helper function which will 
// use unlink method, which deletes the file 
// that's passed into it, unlink takes 
// two args, the filepath from above and 
// and error callback function if something 
// goes wrong 
const deleteFile = (filePath) => {
    fs.unlink(filePath, (err ) => {
        if(err){
            throw(err);
        }
    })
}

// Now we can use this helper function insdie of 
// our admin.js controller 