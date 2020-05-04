<?php 
include_once "../../jsdb.php";
include_once "../../jsencoding.php";
include_once "../../prefix.php";
include_once "../../connection.php";

$prefixlocal = $prefix;
if (isset($_POST["dbname"])) {
    $dbnamehost=$_POST["dbname"];
    $connection = DatabaseClass::init($host, $username, $password, $dbnamehost);
}else
$connection = DatabaseClass::init($host, $username, $password, $dbname);

if (isset($_POST["prefix"])) {
    $prefixlocal=$_POST["prefix"];
}

if ($connection == null){
    echo "Can not connect to database!";
    exit();
}

if (isset($_POST["id"])) {
    $formid=$_POST["id"];
}else
{
    echo "Invalid formid";
    exit();
}

$data = $connection->load($prefixlocal.'link_form_question', "formid=".$formid, "numer_order");

echo "ok";
echo EncodingClass::fromVariable($data);
?>