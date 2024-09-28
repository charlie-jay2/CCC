exports.handler = async function (event, context) {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ success: false, message: 'Method not allowed' }),
        };
    }

    let body;
    try {
        body = JSON.parse(event.body);
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ success: false, message: 'Invalid JSON' }),
        };
    }

    const { username, password } = body;
    console.log('Received username:', username);
    console.log('Received password:', password);

    const storedUsername = process.env.USER1N;
    const storedPassword = process.env.USER1P;

    // Debug log the stored credentials
    console.log('Stored username:', storedUsername);
    console.log('Stored password:', storedPassword);

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
