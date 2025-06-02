const path = require('path');
const fs = require('fs');
const input = process.argv.slice(2);


const text = input.join(' ').concat('\n');
const timestamp = new Date().toISOString();
const message = `${text} ${timestamp}\n`

if(!message) {
  console.error('Please provide some text to log.');
  process.exit(1);
} 

const filePath = path.join(__dirname, 'log.txt');

fs.appendFile(filePath,message,{encoding: 'utf-8'},()=>{
    console.log('Text logged successfully!');
})
console.log(filePath);

