<?php
    include_once "../../jsencoding.php";
    
    if (isset($_POST["name"])) {
        $name=$_POST["name"];
    }else
    {
        echo "Invalid name";
        exit();
    }
    $currentDir = dirname(dirname(dirname(__FILE__)));
    if(file_exists($currentDir.$name))
    if(unlink($currentDir.$name)){
        $flags=1;
    }else{
        $flags=0;
    }
    echo "ok";
    echo EncodingClass::fromVariable($flags);
?>