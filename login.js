// Fetching environment variables (in real-world applications, you should handle this server-side)
const usernameEnv = 'staff';  // Example environment variable
const passwordEnv = 'Church1llC0mmun1tyColl6ge!!';  // Example environment variable

document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form submission

    // Get values from input fields
    const usernameInput = document.getElementById("username").value;
    const passwordInput = document.getElementById("password").value;

    // Compare with environment variables (should be fetched securely in real implementation)
    if (usernameInput === usernameEnv && passwordInput === passwordEnv) {
        // Redirect to staff.html if credentials are correct
        window.location.href = "admin.html";
    } else {
        // Show error message if credentials are incorrect
        document.getElementById("error-message").style.display = "block";
    }
});
