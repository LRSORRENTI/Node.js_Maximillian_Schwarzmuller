const text = 'This is a test, \
 I want to use Deno to store it in a file';

 console.log(text)

const encoder = new TextEncoder();
const data = encoder.encode(text);
await Deno.writeFile("hello1.txt", data);  // overwrite "hello1.txt" or create it
await Deno.writeFile("hello2.txt", data, { create: false });  // only works if "hello2.txt" exists
await Deno.writeFile("hello3.txt", data, { mode: 0o777 });  // set permissions on new file
await Deno.writeFile("hello4.txt", data, { append: true });  // add data to the end of the file

