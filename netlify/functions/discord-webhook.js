const fetch = require('node-fetch');
const formidable = require('formidable');
const fs = require('fs');

exports.handler = async function (event, context) {
    return new Promise((resolve, reject) => {
        const form = new formidable.IncomingForm();
        form.parse(event, async (err, fields, files) => {
            if (err) {
                return reject({
                    statusCode: 500,
                    body: JSON.stringify({ error: err.message })
                });
            }

            const applicationCode = Math.floor(10000000 + Math.random() * 90000000).toString();

            const embed = {
                embeds: [
                    {
                        title: `New Application: ${fields.name}`,
                        description: `**Position Applied:** ${fields.position}\n**Email:** ${fields.email}\n**Why they want this role:** ${fields.whyyouwant}\n**Past experience:** ${fields.pastexp}\n**Availability:** ${fields.availability}`,
                        color: 3066993,
                        footer: {
                            text: `Application Code: ${applicationCode}`
                        }
                    }
                ]
            };

            // Check if CV is provided
            if (files.cv && files.cv.size > 0) {
                // Send the CV to your storage or processing system here.
                const cvPath = files.cv.path;
                // (Implement your logic to handle the CV file, e.g., upload to a cloud storage)
            } else {
                // Send a message to Discord if no CV is provided
                embed.embeds.push({
                    description: "No CV provided",
                    color: 15158332 // Red color
                });
            }

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

            resolve({
                statusCode: 200,
                body: JSON.stringify({ message: 'Application submitted successfully!' })
            });
        });
    });
};
