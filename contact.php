<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Form data sanitize karo
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = trim($_POST["message"]);

    // Aapki email jahan message jayega
    $to = "sadiqrangrej10@gmail.com";
    $subject = "New Contact Form Submission";

    // Email body banayein
    $email_body = "Aapke website se naya message mila hai:\n\n";
    $email_body .= "Name: $name\n";
    $email_body .= "Email: $email\n\n";
    $email_body .= "Message:\n$message\n";

    // Headers set karo
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Email bhejo
    if (mail($to, $subject, $email_body, $headers)) {
        echo "<h2 style='color:green;'>Message sent successfully!</h2>";
    } else {
        echo "<h2 style='color:red;'>Failed to send message. Please try again later.</h2>";
    }
} else {
    echo "<h2 style='color:orange;'>Invalid request.</h2>";
}
?>
