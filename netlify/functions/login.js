// netlify/functions/login.js
exports.handler = async function (event, context) {
    // Parse the request body
    const { username, password } = JSON.parse(event.body);

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
