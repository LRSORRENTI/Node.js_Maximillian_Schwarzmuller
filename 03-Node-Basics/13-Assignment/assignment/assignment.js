const http = require('http')


const server = http.createServer((req, res) => {
    console.log(req)
    const url = req.url; 
    if(url === '/'){
        res.write('<html>')
        res.write('<head><title>Hello World</title></head>')
        res.write('<h3>Hello world from node</h3>')
        res.write('<footer>Im a footer from node</footer>')
        res.write('</html>')
    }
})

server.listen(3000)