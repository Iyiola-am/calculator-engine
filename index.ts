import processEquation from './process'

console.log('--Calculator Engine--');
console.log('Enter any BODMAS equation below >>');

process.stdin.on('data', (input: Buffer) => {
    try {
        let result = processEquation(input.toString());
        console.log('>', result);
        console.log('Enter any BODMAS equation below >>');
    } catch(e) {
        console.log('Syntax Error!');
    }
});