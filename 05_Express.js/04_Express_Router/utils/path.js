const path = require('path')

// to assist in the pathing, we can use 


module.exports = path.dirname(require.main.filename);

// now that we have this we can import from this file