<?php 
include_once "../../jsdb.php";
include_once "../../jsencoding.php";
include_once "../../prefix.php";
include_once "../../connection.php";


$connection = DatabaseClass::init($host, $username, $password, $dbname);
if ($connection == null){
    echo "Can not connect to database!";
    exit();
}

$data = array(
);

if (isset($_POST["id"])) {
    $data["id"]=$_POST["id"];
}else
{
    echo "Invalid id";
    exit();
}

$data = array(
);

$data["userid"]=$_SESSION[$prefix."userid"];

if (isset($_POST["times"])) {
    $data["times"]=$_POST["times"];
}

$connection->update($prefix.'record_test', $data);

echo "ok";

echo EncodingClass::fromVariable($data);

?>