const wordsArray = require('./words.json');


function safe(inputString) {
    const lowerCaseInput = inputString.toLowerCase();

    for (const word of wordsArray) {
        if (lowerCaseInput.includes(word.toLowerCase())) {
            return false;
        }
    }

    return true;
}

console.log(safe("I'm happy"))
console.log(safe("fuck"))




module.exports = safe;
