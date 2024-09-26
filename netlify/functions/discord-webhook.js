const fetch = require("node-fetch");

exports.handler = async function (event, context) {
    // Parse the form data
    const data = JSON.parse(event.body);

    // Generate a unique application code
    const applicationCode = Math.floor(10000000 + Math.random() * 90000000).toString();

    // Discord webhook URL from the environment variable
    const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;

    // Build the embed for Discord
    const embed = {
        embeds: [
            {
                title: `New Application: ${data.name}`, // Top field with the applicant's name
                description: `**Position Applied:** ${data.position}\n**Email:** ${data.email}`,
                color: 3066993, // Blue-green color
                footer: {
                    text: `Application Code: ${applicationCode}`, // Unique application code in the footer
                },
            },
        ],
    };

    // Send the data to Discord via the webhook
    try {
        const response = await fetch(discordWebhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(embed),
        });

        if (!response.ok) {
            throw new Error(`Failed to send webhook: ${response.status}`);
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Application submitted successfully!" }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
