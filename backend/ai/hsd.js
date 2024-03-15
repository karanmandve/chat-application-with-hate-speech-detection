const fetch =require("node-fetch");
const {google} = require('googleapis');

async function detectHateSpeech(inputString) {
    // const url = 'https://fuk.ai/detect-hatespeech/';
    // const authToken = '8570fd1340a48e255a84dd852261416e9d946fb50d0daf6820e257b02dba3ca4';

    // try {
    //     const response = await fetch(`${url}?input=${encodeURIComponent(inputString)}`, {
    //         method: 'GET',
    //         headers: {
    //             'Authorization': `Token ${authToken}`
    //         }
    //     });

    //     return !(response.status === 200);
    // } catch (error) {
    //     console.error('Error:', error);
    //     return false;
    // }


    // const response = await fetch(
	// 	"https://api-inference.huggingface.co/models/Hate-speech-CNERG/indic-abusive-allInOne-MuRIL",
	// 	{
	// 		headers: { Authorization: "Bearer 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" },
	// 		method: "POST",
	// 		body: JSON.stringify("inputs: "+inputString),
	// 	}
	// );
	// const result = await response.json();
    // if(result[0][0].label == "LABEL_0"){
    //     return false;
    // }
    // else{
    //     return true;
    // }

    API_KEY = 'AIzaSyB9aWLUzdDjK4nuwfdsdWy6nFNQFhWYrjk';
    DISCOVERY_URL =
    'https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1';


    try {
        const client = await google.discoverAPI(DISCOVERY_URL);
    
        const analyzeRequest = {
        comment: {
            text: inputString,
        },
        languages: ["en", "hi-Latn"],
        requestedAttributes: {
            TOXICITY: {},
        },
        };
    
        const response = await client.comments.analyze({
        key: API_KEY,
        resource: analyzeRequest,
        });
    
        // console.log(JSON.stringify(response.data, null, 2));
        console.log(response.data.attributeScores.TOXICITY.summaryScore.value)
        toxicity_no = response.data.attributeScores.TOXICITY.summaryScore.value;
        if (toxicity_no >= 0.1){
            return true
        }else{
            return false
        }

    } catch (err) {
        throw err;
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
  
