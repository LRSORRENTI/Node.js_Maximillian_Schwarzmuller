import fs from 'fs/promises'

// IMPORTANT TO NOTE: if using require to bring in 
// the fs module, needs to look like: 
// const fs = require('fs').promises;

import path, { dirname } from 'path';
import { fileURLtoPath } from 'url';

const __filename = fileURLtoPath(import.meta.url);
const __dirname = dirname(__filename);

export const resHandler = (req, res, next) => {
    // USING PROMISE BASED APPROACH:    
    fs.readFile('my-page.html', 'utf-8')
    .then((data) => {
        res.send(data)
    })
    .catch((err) => {
        console.log(err)
    })
    
}