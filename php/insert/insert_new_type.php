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

if (isset($_POST["value"])) {
$data["value"]=$_POST["value"];
}

if (isset($_POST["note"])) {
    $data["note"]=$_POST["note"];
}

$data["id"] = $connection->insert($prefix.'type_survey', $data);

echo "ok";

echo EncodingClass::fromVariable($data);

?>