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

        return response.status === 200;
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}

// Example usage:
const inputText = 'hey how you doing';
detectHateSpeech(inputText)
    .then(result => {
        console.log('Response:', result);
    });
