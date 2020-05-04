<?php
    $currentDir = dirname(dirname(dirname(__FILE__)));
    $uploadDirectory = "/img/delete/";

    $errors = []; // Store all foreseen and unforseen errors here
    $fileName = $_POST['upload_name'];
    $fileSize = $_FILES['file']['size'];
    $fileTmpName  = $_FILES['file']['tmp_name'];
    $fileType = $_FILES['file']['type'];
    $fileExtension = strtolower(end(explode('.',$fileName)));

    $uploadPath = $currentDir . $uploadDirectory . basename($fileName); 
    if ($fileSize > 1000000) {
        $errors[] = "This file is more than 5MB. Sorry, it has to be less than or equal to 5MB";
    }
    if (empty($errors)) {
        $didUpload = move_uploaded_file($fileTmpName, $uploadPath);
    if ($didUpload) {
        echo "The file " . basename($fileName) . " has been uploaded";
    } else {
        echo "An error occurred somewhere. Try again or contact the admin";
    }
    } else {
        foreach ($errors as $error) {
            echo $error . "These are the errors" . "\n";
        }
    }
    
?>