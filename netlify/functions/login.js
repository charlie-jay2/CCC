// netlify/functions/login.js
exports.handler = async function (event, context) {
    // Check if the method is POST
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ success: false, message: 'Method not allowed' }),
        };
    }

    let body;
    try {
        // Attempt to parse the JSON body
        body = JSON.parse(event.body);
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ success: false, message: 'Invalid JSON' }),
        };
    }

    const { username, password } = body;

    // Fetch environment variables
    const storedUsername = process.env.USER1N;
    const storedPassword = process.env.USER1P;

    // Check if credentials match
    if (username === storedUsername && password === storedPassword) {
        return {
            statusCode: 200,
            body: JSON.stringify({ success: true }),
        };
    } else {
        return {
            statusCode: 401,
            body: JSON.stringify({ success: false, message: "Invalid credentials" }),
        };
    }
};
