const events = [
    { date: 'TBD', name: 'Open Day', description: 'All students must attend.' },

    // Add more events here
];

const eventsContainer = document.getElementById('events-container');
events.forEach(event => {
    const eventDiv = document.createElement('div');
    eventDiv.innerHTML = `<strong>${event.date} - ${event.name}</strong><p>${event.description}</p>`;
    eventsContainer.appendChild(eventDiv);
});

document.getElementById('scroll-up').addEventListener('click', () => {
    eventsContainer.scrollBy(0, -50);
});

document.getElementById('scroll-down').addEventListener('click', () => {
    eventsContainer.scrollBy(0, 50);
});
