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

if (isset($_POST["formid"])) {
    $data["formid"]=$_POST["formid"];
}else
{
    echo "Invalid formid";
    exit();
}

if (isset($_POST["questionid"])) {
    $data["questionid"]=$_POST["questionid"];
}else
{
    echo "Invalid questionid";
    exit();
}

if (isset($_POST["numer_order"])) {
    $data["numer_order"]=$_POST["numer_order"];
}

$connection->update($prefix.'link_form_question', $data);

echo "ok";

echo EncodingClass::fromVariable($data);

?>