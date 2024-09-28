document.getElementById("login-form").addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent form submission

    // Get values from input fields
    const usernameInput = document.getElementById("username").value;
    const passwordInput = document.getElementById("password").value;

    // Call the Netlify function
    const response = await fetch("/.netlify/functions/login", {
        method: "POST",
        body: JSON.stringify({
            username: usernameInput,
            password: passwordInput,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();

    // Check if login is successful
    if (data.success) {
        // Redirect to admin.html if credentials are correct
        window.location.href = "admin.html";
    } else {
        // Show error message if credentials are incorrect
        document.getElementById("error-message").style.display = "block";
    }
});
