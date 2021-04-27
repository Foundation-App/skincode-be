const fetch = require('node-fetch');

const fetchToken = (code) => {

    console.log('CAN YOU SEE THIS - GH UTILS')

    return fetch('/auth/login', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(code)
    })
    .then((res) => res.json())
    .then(({ access_token }) => access_token);
    
}



module.exports = {
    fetchToken
}  