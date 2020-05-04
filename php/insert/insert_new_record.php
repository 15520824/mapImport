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

if (isset($_POST["record_testid"])) {
    $data["record_testid"]=$_POST["record_testid"];
}else
{
    echo "Invalid record_testid";
    exit();
}

if (isset($_POST["questionid"])) {
    $data["questionid"]=$_POST["questionid"];
}else
{
    echo "Invalid questionid";
    exit();
}

if (isset($_POST["answerid"])) {
    $data["answerid"]=$_POST["answerid"];
}

if (isset($_POST["content"])) {
    $data["content"]=$_POST["content"];
}

$data["id"] = $connection->insert($prefix.'record', $data);

echo "ok";

echo EncodingClass::fromVariable($data);

?>