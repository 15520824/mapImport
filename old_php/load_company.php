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
$company = $connection->load($hrprefix."company", "dbname = '".$dbhome."'", "id");
echo "ok";
echo EncodingClass::fromVariable($company);
?>