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
    $id=$_POST["id"];
}else
{
    echo "Invalid id";
    exit();
}


if (isset($_POST["surveyid"])) {
    $surveyid=$_POST["surveyid"];
}else
{
    echo "Invalid surveyid";
    exit();
}

$search = $connection->load($prefix.'link_survey_form','formid='.$id);
if (count($search) == 1){
    $connection->query("DELETE FROM ".$prefix."form WHERE id=".$id);
    $connection->query("DELETE FROM ".$prefix."link_survey_form WHERE formid=".$id);
}else
{
    $connection->query("DELETE FROM ".$prefix."link_survey_form WHERE formid=".$id.' AND surveyid='.$surveyid);
}


echo "ok";

echo EncodingClass::fromVariable($id);

?>