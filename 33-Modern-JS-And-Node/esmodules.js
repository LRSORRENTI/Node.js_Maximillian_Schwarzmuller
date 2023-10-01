
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLtoPath } from 'url';

// Now we can construct variables from those imports: 

const __filename = fileURLtoPath(import.meta.url);
const __dirname = dirname(__filename);


// const resHandler = (req, res, next) => {
//     fs.readFile('my-page.html', 'utf8', (err, data) => {
//         res.send(data)
//     });
// };

// module.exports = {resHandler}

// export default { resHandler };

// We can send the file back in a different way: 

export const resHandler = (req, res, next) => {
   // The res object we get above from express 
   // exposes a sendFile method: 

    // To do this we'll need to pass in an absolute 
    // path, so we'll need to import path, then 
    // inside the join method we pass __dirname 
    // and the filename

   // res.sendFile(path.join(__dirname, 'my-page.html'))
    // If the file is inside of a directory like htmlfiles:
    res.sendFile(path.join(__dirname, 'htmlfiles/my-page.html'))
};
