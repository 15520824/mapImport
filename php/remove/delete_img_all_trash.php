<?php
    include_once "../../jsencoding.php";
    
    $currentDir = dirname(dirname(dirname(__FILE__)));
    $files = glob($currentDir.'/img/delete/*'); // get all file names
    foreach($files as $file){ // iterate files
    if(is_file($file))
        unlink($file); // delete file
    }
    echo "ok";
    echo EncodingClass::fromVariable($flags);
?>