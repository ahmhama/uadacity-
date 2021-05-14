function handleSubmit(event) {
    event.preventDefault()
    let formText = document.getElementById('url').value
    if (Client.checkForURL(formText)) {

        postData('http://localhost:8081/api', { url: formText })

            .then(function (res) {
                document.getElementById('polarity').innerHTML = 'Polarity: ' + scoreTagMapping[data.score_tag];
                document.getElementById("agreement").innerHTML = `Agreement: ${res.agreement}`;
                document.getElementById("subjectivity").innerHTML = `Subjectivity: ${res.subjectivity}`;
                document.getElementById("confidence").innerHTML = `Confidence: ${res.confidence}`;
                document.getElementById("irony").innerHTML = `Irony: ${res.irony}`;
            })
    } else {
        document.getElementById('error').innerHTML = "invalid URL"
    }
}

const postData = async (url = "", data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log('error', error);
    }
};

const scoreTagMapping = {
    'P+': 'strong positive',
    P: 'positive',
    NEU: 'neutral',
    N: 'negative',
    'N+': 'strong negative',
    NONE: 'without sentiment'
}

export { handleSubmit }
