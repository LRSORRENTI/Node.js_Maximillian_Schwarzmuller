// Now inside of routes.js we need to 
// import the file system, since we're moving 
// the logic into this file 

const fs = require('fs');

// And now we need to connect app.js to 
// routes.js, we need to send our incoming request 
// to that file

// To do this let's create a new function

// const request = (req, res) => {

// };

// and now we can move all the below code: into that 
// function body: 

// if(url === '/'){
//     res.write('<html>')
//     res.write('<head><title>Enter Message</title></head>')
//     res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
//     res.write('</html>')
//     return res.end();

//     }
//     if(url === '/message' && method === 'POST'){

//         const body = [];
//         req.on('data', (chunk) =>{
//               console.log(chunk)
           
//               body.push(chunk)
//         } )
     
//          req.on('end', () => {
          
//               const parsedBody = Buffer.concat(body).toString();
//                console.log(parsedBody);
//                const parseMessage = parsedBody.split('=')[1];
             
           
//                 //   fs.writeFileSync('message.txt', parseMessage );

//                    // So what's the problem with this 
//                    // with this writeFileSync line? 

//                    // It has to do with the sync keyword
//                    // there also is a writeFile method 
//                    // but we used writeFileSync

//                    // The 'sync' is short for synchronous

//                    // this is a special method, this 
//                    // writeFileSync because it blocks 
//                    // code execution until the message.txt
//                    // file is created 

//                    // Working with files is available in 
//                    // two modes. Synchronous and Asynchronous

//                    // For the particular example we used, it's
//                    // very fast, for a short text message like 
//                    // ours it doesn't take very long 
                   
//                    // But imagine we are working with a large file
//                    // like hundreds of megabytes or even larger, 
//                    // that could take quite a lot longer to work 
//                    // with if we use Sync, Sync will block the 
//                    // code execution, and all the rest of the 
//                    // code will sit idle until that huge file 
//                    // is read, copied or whatever is being done 
//                    // to it

//                    // Even requests sent by other users wouldn't 
//                    // be handled until that operation is done

//                    // We usually don't want this to be the case, 
//                    // so as a solution we use async code, let's refactor 
//                    // what we had above: 

//                 //    fs.writeFileSync('message.txt', parseMessage );

//                 fs.writeFile('message.txt', parseMessage, (err) => {
//                   // when we use writeFile instead of writeFileSync
//                   // we pass in a third argument, which will be 
//                   // another callback function, which will execute 
//                   // when it's done

//                   // So if an error occurs. like missing 
//                   // permissions or some error happens we would 
//                   // get the error here and we can handle it by 
//                   // maybe returning a different kind of response, 
//                   // an error response showing to the user an error 
//                   // occured

//                   // In this example we'll skip the error handling 
//                   // return logic, we will implement error 
//                   // responses later in the course, but for 
//                   // the purpose of learning blocking and non 
//                   // blocking code it's not what we're focused on
//                     res.statusCode = 302;
//                     res.setHeader('Location', '/')
//                     return res.end()
//                     // So we have two event listeners inside of 
//                     // req.end() we have the "end", () =>, and 
//                     // inside there we have writeFile() (err) => 

//                 })                
//          });

//          // This event driven architecture is 
//          // common in node.js
        
    
//     }
//     res.setHeader('Content-Type', 'text/html')
//     res.write('<html>')
//     res.write('<head><title>My First Page With Node</title></head>')
//     res.write('<body><h1>Hello World From Node.js Server</h1></body>')
//     res.write('</html>')
//     res.end();

    const requestHandler = (req, res) => {
        // we also need to re-add url
        // and method like before 
        const url = req.url;
        const method = req.method;

        if(url === '/'){
            res.write('<html>')
            res.write('<head><title>Enter Message</title></head>')
            res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
            res.write('</html>')
            return res.end();
        
            }
            if(url === '/message' && method === 'POST'){
        
                const body = [];
                req.on('data', (chunk) =>{
                      console.log(chunk)
                   
                      body.push(chunk)
                } )
             
                 req.on('end', () => {
                  
                      const parsedBody = Buffer.concat(body).toString();
                       console.log(parsedBody);
                       const parseMessage = parsedBody.split('=')[1];
                     
                   
                        //   fs.writeFileSync('message.txt', parseMessage );
        
                           // So what's the problem with this 
                           // with this writeFileSync line? 
        
                           // It has to do with the sync keyword
                           // there also is a writeFile method 
                           // but we used writeFileSync
        
                           // The 'sync' is short for synchronous
        
                           // this is a special method, this 
                           // writeFileSync because it blocks 
                           // code execution until the message.txt
                           // file is created 
        
                           // Working with files is available in 
                           // two modes. Synchronous and Asynchronous
        
                           // For the particular example we used, it's
                           // very fast, for a short text message like 
                           // ours it doesn't take very long 
                           
                           // But imagine we are working with a large file
                           // like hundreds of megabytes or even larger, 
                           // that could take quite a lot longer to work 
                           // with if we use Sync, Sync will block the 
                           // code execution, and all the rest of the 
                           // code will sit idle until that huge file 
                           // is read, copied or whatever is being done 
                           // to it
        
                           // Even requests sent by other users wouldn't 
                           // be handled until that operation is done
        
                           // We usually don't want this to be the case, 
                           // so as a solution we use async code, let's refactor 
                           // what we had above: 
        
                        //    fs.writeFileSync('message.txt', parseMessage );
        
                        fs.writeFile('message.txt', parseMessage, (err) => {
                          // when we use writeFile instead of writeFileSync
                          // we pass in a third argument, which will be 
                          // another callback function, which will execute 
                          // when it's done
        
                          // So if an error occurs. like missing 
                          // permissions or some error happens we would 
                          // get the error here and we can handle it by 
                          // maybe returning a different kind of response, 
                          // an error response showing to the user an error 
                          // occured
        
                          // In this example we'll skip the error handling 
                          // return logic, we will implement error 
                          // responses later in the course, but for 
                          // the purpose of learning blocking and non 
                          // blocking code it's not what we're focused on
                            res.statusCode = 302;
                            res.setHeader('Location', '/')
                            return res.end()
                            // So we have two event listeners inside of 
                            // req.end() we have the "end", () =>, and 
                            // inside there we have writeFile() (err) => 
        
                        })                
                 });
        
                 // This event driven architecture is 
                 // common in node.js
                
            
            }
            res.setHeader('Content-Type', 'text/html')
            res.write('<html>')
            res.write('<head><title>My First Page With Node</title></head>')
            res.write('<body><h1>Hello World From Node.js Server</h1></body>')
            res.write('</html>')
            res.end();
    };
    
    // Now we need to EXPORT this function, our 
    // requestHandler function

    // one way to do this is with module.exports
    // this module is a global node object, which 
    // has an exports property, and we can assign 
    // our requestHandler function to it

    module.exports = requestHandler;

    // So now after the above line, our requestHandler 
    // function is now stored inside module.exports, 
    // and since this is a global object, we can 
    // access requestHandler from anywhere now using 
    // import, so now go back to app.js and import it