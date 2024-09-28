const fetch = require('node-fetch');

exports.handler = async function (event, context) {
    try {
        const data = JSON.parse(event.body);
        const applicationCode = Math.floor(10000000 + Math.random() * 90000000).toString();

        const embed = {
            embeds: [
                {
                    title: `Teaching Name: ${data.name}`,
                    description: `**Start Date:** ${data.start}\n**End Date:** ${data.end}\n**Reason for LOA:** ${data.reason}`,
                    color: 3066993,
                    footer: {
                        text: `Application Code: ${applicationCode}`
                    }
                }
            ]
        };

        const response = await fetch(process.env.DISCORD_WEBHOOK_URL3, {
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
            body: JSON.stringify({ message: 'Contact submitted successfully!' })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
