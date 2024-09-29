const fetch = require('node-fetch');

exports.handler = async function (event, context) {
    try {
        const data = JSON.parse(event.body);
        const applicationCode = Math.floor(10000000 + Math.random() * 90000000).toString();

        const embed = {
            embeds: [
                {
                    title: `New Application: ${data.name}`,
                    description: `**Discord & Roblox Name:** ${data.name}\n\n**What is your teaching name:** ${data.tname}\n\n**What is your teaching code:** ${data.tcode}\n\n**What position:** ${data.position}\n\n**What makes you stand out from others:** ${data.standout}\n\n**Why would you like to work at Churchill Community College:** ${data.whyyoudlike}\n\n**What do you think you could face in this role?** ${data.face}\n\n**Past Experience:** ${data.pastexp}\n\n**Email:** ${data.email}\n\n**Availability:** ${data.availability}\n\n**For the availability you chose, what timeframes are you free:** ${data.timeframe}\n\n**You recognise an ongoing fight, how do you deal with it?** ${data.ongoing}`,
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
            body: JSON.stringify({ message: 'Application submitted successfully! You will recieve a submission email shortly.' })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
