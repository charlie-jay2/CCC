document.getElementById("login-form").addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent form submission

    const usernameInput = document.getElementById("username").value;
    const passwordInput = document.getElementById("password").value;

    const response = await fetch("/.netlify/functions/login", {
        method: "POST", // Make sure this is POST
        body: JSON.stringify({
            username: usernameInput,
            password: passwordInput,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });


    const data = await response.json();

    if (data.success) {
        window.location.href = "admin.html";
    } else {
        document.getElementById("error-message").style.display = "block";
        console.error(data.message); // Log the error message for debugging
    }
});
