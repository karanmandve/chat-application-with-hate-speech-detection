async function detectHateSpeech(inputString) {
    const url = 'https://fuk.ai/detect-hatespeech/';
    const authToken = '8570fd1340a48e255a84dd852261416e9d946fb50d0daf6820e257b02dba3ca4';

    try {
        const response = await fetch(`${url}?input=${encodeURIComponent(inputString)}`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${authToken}`
            }
        });

        return !(response.status === 200);
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}

module.exports = {detectHateSpeech};

// Example usage:
// const inputText = 'what are you doing?';


// const testInputs =[
//     "Hey, How are you doing?",
//     "I'm good",
//     "you will die soon",
//     "go fuck yourself",
//     "nigga shut the fuck up!",
//     "the weather is really good today",
//     "I'm sorry, but I'm late for work. so I gotta go"
// ]



// detectHateSpeech(input)
//     .then(result => {
//     console.log(`Text: "${input}" - Hate Speech Detected: ${result}`);
//     })
//     .catch(error => {
//     console.error('Error occurred:', error);
//     });
  
