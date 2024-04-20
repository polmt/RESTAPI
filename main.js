async function postData(url = '', data = {}) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('ERROR in network response');
        }
        return response.json();
    } catch (error) {
        console.error('ERROR with the POST request:', error);
        throw error;
    }
}

async function fetchAndDisplayUserInfo() {
    try {
        const response = await fetch('https://reqres.in/api/users/4');
        if (!response.ok) {
            throw new Error('ERROR in network response');
        }
        const data = await response.json();
        await displayUserInfo(data);
    } catch (error) {
        console.error('ERROR with the fetch operation:', error);
    }
}

async function displayUserInfo(userData) {
    try {
        const userInfoDiv = document.getElementById('userInfo');

        const { data: { id, email, first_name, last_name, avatar } } = userData;

        const userInfo = `
            <h2>User Info</h2>
            <pre>${JSON.stringify(userData, null, 2)}</pre>
            <h2>${first_name} ${last_name}</h2>
            <p><img src="${avatar}" alt="Avatar"></p>
        `;

        userInfoDiv.innerHTML = userInfo;

        const postDataResponse = await postData('https://reqres.in/api/users', {
            name: `${first_name} ${last_name}`,
            job: 'leader'
        });
        console.log('POST request successful:', postDataResponse);
    } catch (error) {
        console.error('There was a problem displaying user info or making POST request:', error);
    }
}

fetchAndDisplayUserInfo();
