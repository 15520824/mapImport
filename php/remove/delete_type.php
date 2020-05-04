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


if (isset($_POST["id"])) {
    $id=$_POST["id"];
}else
{
    echo "Invalid id";
    exit();
}

$id=$_POST['id'];

$connection->query("DELETE FROM ".$prefix."type_survey WHERE ID=".$id);
echo "ok";

echo EncodingClass::fromVariable($id);

?>