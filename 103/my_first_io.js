const fs = require('fs');

const fileContents = fs.readFileSync(process.argv[2], 'utf8');
const lines = fileContents.split('\n').length - 1;
console.log(lines);
