const fetch = require('node-fetch');

exports.handler = async function (event, context) {
    try {
        const data = JSON.parse(event.body);
        const applicationCode = Math.floor(10000000 + Math.random() * 90000000).toString();

        const embed = {
            embeds: [
                {
                    title: `New Application: ${data.name}`,
                    description: `**Position Applied:** ${data.position}\n**Email:** ${data.email}`,
                    color: 3066993,
                    footer: {
                        text: `Application Code: ${applicationCode}`
                    }
                }
            ]
        };

        const response = await fetch(process.env.DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(embed)
        });

        if (!response.ok) {
            throw new Error(`Failed to send webhook: ${response.status}`);
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Application submitted successfully!' })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
