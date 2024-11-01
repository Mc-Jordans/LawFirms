<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    // Basic validation
    if (!empty($name) && !empty($email) && !empty($message)) {
        // Process the data (e.g., save to a database, send an email)
        
        // Example: Send an email (you can replace this with your logic)
        $to = "elvisbaidoo346@gmail.com";
        $subject = "Crest law forms";
        $body = "Name: $name\nEmail: $email\nMessage: $message";
        mail($to, $subject, $body);

        echo "success"; // Response to client
    } else {
        echo "error"; // Response to client
    }
} else {
    echo "Invalid request";
}
?>
