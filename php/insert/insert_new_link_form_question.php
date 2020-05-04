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

$search = $connection->load($prefix.'link_form_question',"(formid = ".$data["formid"].") AND (questionid = ".$_POST["questionid"].")");
if (count($search) > 0){
    $data["id"]=$search[0]["id"];
    $connection->update($prefix.'link_form_question',$data);
}
else{
    $data["id"] = $connection->insert($prefix.'link_form_question', $data);
}


echo "ok";

echo EncodingClass::fromVariable($data);

?>