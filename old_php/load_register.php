<?php 
include_once "../jsdb.php";
include_once "../jsencoding.php";
include_once "../prefix.php";
include_once "../connection.php";

$connection = DatabaseClass::init($host, $username, $password, $hrdb);
if ($connection == null){
    echo "Can not connect to database!";
    exit();
}
$register = $connection->load($hrprefix."register", "(companyid =".$_POST["companyid"].")", "id");
echo "ok";
echo EncodingClass::fromVariable($register);
?>