const fs = require('fs');

const resHandler = (req, res, next) => {
    fs.readFile('my-page.html', 'utf8', (err, data) => {
        res.send(data)
    });
};

// module.exports = {resHandler}

export default { resHandler };