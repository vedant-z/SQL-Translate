function onSubmit(event) {
    event.preventDefault();

    document.querySelector('.result').textContent = '';

    const prompt = document.querySelector('#prompt').value;

    if (prompt === '') {
        alert('Please add some text!');
        return;
    }

    generateQueryRequest(prompt);
}

async function generateQueryRequest(prompt) {
    try {
        const response = await fetch('/openai/generatesqlquery', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
            throw new Error('That query could not be generated');
        }

        const data = await response.json();

        const SQLQuery = data.result;

        document.querySelector('.result').textContent = SQLQuery;
    } catch (error) {
        document.querySelector('.result').textContent = error;
    }
}

document.querySelector('#input-form').addEventListener('submit', onSubmit);
