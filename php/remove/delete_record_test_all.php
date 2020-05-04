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

$data["id"] = $connection->query("DELETE FROM ".$prefix."record WHERE record_testid=". $data["record_testid"].' AND questionid='.$data["questionid"]);

echo "ok";

echo EncodingClass::fromVariable($data);

?>