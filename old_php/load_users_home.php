<?php 
include_once "../jsdb.php";
include_once "../jsencoding.php";
include_once "../prefix.php";
include_once "../connection.php";

$connection2 = DatabaseClass::init($host, $username, $password, $dbhome);

if ($connection2 == null){
    echo "Can not connect to database!";
    exit();
}

$datahome = $connection2->load($prefixhome."users", "", "id");

echo "ok";
echo EncodingClass::fromVariable($datahome);
?>