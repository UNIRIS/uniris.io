<?php

$errorMSG = "";

// NAME
if (empty($_POST["name"])) {
    $errorMSG = "Name is required ";
} else {
    $name = $_POST["name"];
    if (!preg_match("/^[a-zA-Z]{2,40}(?: +[a-zA-Z]{2,40})+$/",$name)) {
        $errorMSG = "Name should contains two words are expected";
    }
}

// EMAIL
if (empty($_POST["email"])) {
    $errorMSG = "Email is required ";
} else {
    $email = $_POST["email"];
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errorMSG = "Invalid email format";
    }
}

// MSG SUBJECT
if (empty($_POST["msg_subject"])) {
    $errorMSG = "Subject is required ";
} else {
    $msg_subject = $_POST["msg_subject"];
    if (!preg_match("/^(\w.+\s).+$/", $msg_subject)) {
        $errorMSG = "Invalid subject format";
    }
}


// MESSAGE
if (empty($_POST["message"])) {
    $errorMSG = "Message is required ";
} else {
    $message = $_POST["message"];
    if (!preg_match("/^(\w.+\s).+$/", $message)) {
        $errorMSG = "Message should contains at least two words";
    }
}

if ($errorMSG != "") {  echo $errorMSG; } 
else {
    
    // add your email address here
    $EmailTo = "hello@uniris.io";
    $Subject = "WebSite : New Register for Interest ";
    
    // prepare email body text
    $Body = "";
    $Body .= "Name: ";
    $Body .= $name;
    $Body .= "\n";
    $Body .= "Email: ";
    $Body .= $email;
    $Body .= "\n";
    $Body .= "Subject: ";
    $Body .= $msg_subject;
    $Body .= "\n";
    $Body .= "Message: ";
    $Body .= $message;
    $Body .= "\n";
    
    // send email
    $success = mail($EmailTo, $Subject, $Body, "From:".$email);
    
    // redirect to success page
    if ($success && $errorMSG == ""){
       echo "success";
    }else{
        if($errorMSG == ""){
            echo "Something went wrong :(";
        } else {
            echo $errorMSG;
        }
    }
}

?>