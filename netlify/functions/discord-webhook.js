const fetch = require('node-fetch');

exports.handler = async function (event, context) {
    try {
        const data = JSON.parse(event.body);
        const applicationCode = Math.floor(10000000 + Math.random() * 90000000).toString();

        const embed = {
            embeds: [
                {
                    title: `New Application: ${data.name}`,
                    description: `**Discord & Roblox Name:** ${data.name}\n**What is your teaching name:**${data.tname}\n**What is your teaching code:**${data.tcode}\n**What position:**${data.position}\n**What makes you stand out from others:**${data.standout}\n**Why would you like to work at Churchill Community College**${data.whyyoudlike}\n**What do you think you could face in this role?**${data.face}\n**Past Experience:**${data.pastexp}\n**Email:**${data.email}\n**Availability:**${data.availability}\n**For the availability you chose. What timeframes are you free**${data.timeframe}\n**You recognise an ongoing fight, how do you deal with it?**${data.ongoing}`,
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
