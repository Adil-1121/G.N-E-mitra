<?php
// Import PHPMailer Classes
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Include PHPMailer Files
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Form Data
    $name    = strip_tags(trim($_POST["name"]));
    $email   = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = trim($_POST["message"]);

    // Receiver Email
    $receiverEmail = "test@gmail.com";

    // Create Mailer Object
    $mail = new PHPMailer(true);

    try {
        // SMTP Configuration
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';   // Gmail SMTP Server
        $mail->SMTPAuth   = true;
        
        // ✅ CHANGE HERE
        $mail->Username   = 'yourgmail@gmail.com';  // अपना Gmail डालो
        $mail->Password   = 'your-app-password';   // Gmail App Password डालो
        
        $mail->SMTPSecure = 'tls';
        $mail->Port       = 587;

        // Sender & Receiver
        $mail->setFrom($mail->Username, 'Website Contact Form');
        $mail->addAddress($receiverEmail);

        // Email Content
        $mail->isHTML(true);
        $mail->Subject = "New Contact Form Submission";
        $mail->Body    = "
            <h3>New message from website</h3>
            <p><strong>Name:</strong> $name</p>
            <p><strong>Email:</strong> $email</p>
            <p><strong>Message:</strong><br>$message</p>
        ";
        $mail->AltBody = "Name: $name\nEmail: $email\nMessage:\n$message";

        // Send Email
        if ($mail->send()) {
            echo "<h2 style='color:green;'>✅ Message sent successfully!</h2>";
        } else {
            echo "<h2 style='color:red;'>❌ Failed to send message. Please try again later.</h2>";
        }

    } catch (Exception $e) {
        echo "<h2 style='color:red;'>Mailer Error: {$mail->ErrorInfo}</h2>";
    }

} else {
    echo "<h2 style='color:orange;'>Invalid request!</h2>";
}
?>
