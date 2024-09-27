const fetch = require('node-fetch');
const FormData = require('form-data');

exports.handler = async function (event, context) {
    try {
        const data = JSON.parse(event.body);
        const applicationCode = Math.floor(10000000 + Math.random() * 90000000).toString();

        // First message with all the application information
        const embed = {
            embeds: [
                {
                    title: `New Application: ${data.name}`,
                    description: `**Discord & Roblox Name:** ${data.name}\n**What is your teaching name:** ${data.tname}\n**What is your teaching code:** ${data.tcode}\n**What position:** ${data.position}\n**What makes you stand out from others:** ${data.standout}\n**Why would you like to work at Churchill Community College:** ${data.whyyoudlike}\n**What do you think you could face in this role?** ${data.face}\n**Past Experience:** ${data.pastexp}\n**Email:** ${data.email}\n**Availability:** ${data.availability}\n**For the availability you chose, what timeframes are you free:** ${data.timeframe}\n**You recognise an ongoing fight, how do you deal with it?** ${data.ongoing}`,
                    color: 3066993,
                    footer: {
                        text: `Application Code: ${applicationCode}`
                    }
                }
            ]
        };

        // Send the first webhook message with application details
        const response1 = await fetch(process.env.DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(embed),
        });

        if (!response1.ok) {
            throw new Error(`Failed to send webhook: ${response1.status}`);
        }

        // Prepare the second message with the file (CV)
        const form = new FormData();
        form.append('file', Buffer.from(data.cv), {
            filename: 'CV.pdf',  // Change the filename based on the actual file type
            contentType: 'application/pdf'  // Adjust if different content type, e.g., for Word docs
        });

        // Send the second message with the CV file as an attachment
        const response2 = await fetch(process.env.DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: form.getHeaders(),
            body: form,
        });

        if (!response2.ok) {
            throw new Error(`Failed to send CV webhook: ${response2.status}`);
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Application and CV submitted successfully!' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
